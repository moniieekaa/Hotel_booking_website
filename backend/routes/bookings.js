const express = require("express")
const { body, validationResult } = require("express-validator")
const Booking = require("../models/Booking")
const Listing = require("../models/Listing")
const auth = require("../middleware/auth")

const router = express.Router()

// Get user's bookings
router.get("/my-bookings", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.user._id })
      .populate("listing", "title images location price")
      .sort({ createdAt: -1 })

    res.json(bookings)
  } catch (error) {
    console.error("Get bookings error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new booking
router.post(
  "/",
  auth,
  [
    body("listing").isMongoId().withMessage("Invalid listing ID"),
    body("checkIn").isISO8601().withMessage("Invalid check-in date"),
    body("checkOut").isISO8601().withMessage("Invalid check-out date"),
    body("guests").isInt({ min: 1 }).withMessage("Guests must be at least 1"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { listing: listingId, checkIn, checkOut, guests, specialRequests } = req.body

      // Validate dates
      const checkInDate = new Date(checkIn)
      const checkOutDate = new Date(checkOut)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (checkInDate < today) {
        return res.status(400).json({ message: "Check-in date cannot be in the past" })
      }

      if (checkInDate >= checkOutDate) {
        return res.status(400).json({ message: "Check-out date must be after check-in date" })
      }

      // Find the listing
      const listing = await Listing.findById(listingId)
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" })
      }

      // Check if listing can accommodate the number of guests
      if (guests > listing.maxGuests) {
        return res.status(400).json({
          message: `This property can only accommodate ${listing.maxGuests} guests`,
        })
      }

      // Check for conflicting bookings
      const conflictingBooking = await Booking.findOne({
        listing: listingId,
        status: { $in: ["pending", "confirmed"] },
        $or: [
          {
            checkIn: { $lte: checkInDate },
            checkOut: { $gt: checkInDate },
          },
          {
            checkIn: { $lt: checkOutDate },
            checkOut: { $gte: checkOutDate },
          },
          {
            checkIn: { $gte: checkInDate },
            checkOut: { $lte: checkOutDate },
          },
        ],
      })

      if (conflictingBooking) {
        return res.status(400).json({ message: "These dates are not available" })
      }

      // Calculate total price
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
      const totalPrice = nights * listing.price

      // Create booking
      const booking = new Booking({
        listing: listingId,
        guest: req.user._id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        totalPrice,
        specialRequests: specialRequests || "",
        status: "confirmed", // Set status to confirmed by default
      })

      await booking.save()

      const populatedBooking = await Booking.findById(booking._id)
        .populate("listing", "title images location price")
        .populate("guest", "name email")

      res.status(201).json({
        message: "Booking created successfully",
        booking: populatedBooking,
      })
    } catch (error) {
      console.error("Create booking error:", error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Update booking status
router.patch("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body
    const validStatuses = ["pending", "confirmed", "cancelled", "completed"]

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    const booking = await Booking.findById(req.params.id).populate("listing", "host")

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    // Check if user is authorized to update this booking
    const isGuest = booking.guest.toString() === req.user._id.toString()
    const isHost = booking.listing.host.toString() === req.user._id.toString()

    if (!isGuest && !isHost) {
      return res.status(403).json({ message: "Not authorized to update this booking" })
    }

    booking.status = status
    await booking.save()

    const updatedBooking = await Booking.findById(booking._id)
      .populate("listing", "title images location price")
      .populate("guest", "name email")

    res.json({
      message: "Booking status updated successfully",
      booking: updatedBooking,
    })
  } catch (error) {
    console.error("Update booking status error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete a booking (only by the guest who made it)
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    if (booking.guest.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this booking' })
    }
    await Booking.findByIdAndDelete(req.params.id)
    res.json({ message: 'Booking deleted successfully' })
  } catch (error) {
    console.error('Delete booking error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
