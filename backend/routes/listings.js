const express = require("express")
const { body, validationResult } = require("express-validator")
const Listing = require("../models/Listing")
const auth = require("../middleware/auth")

const router = express.Router()

// Get all listings with optional filters
router.get("/", async (req, res) => {
  try {
    const { city, minPrice, maxPrice, propertyType, guests } = req.query
    const filter = { isActive: true }

    // Apply filters
    if (city) {
      filter["location.city"] = { $regex: city, $options: "i" }
    }
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }
    if (propertyType) {
      filter.propertyType = propertyType
    }
    if (guests) {
      filter.maxGuests = { $gte: Number(guests) }
    }

    const listings = await Listing.find(filter).populate("host", "name avatar").sort({ createdAt: -1 })

    res.json(listings)
  } catch (error) {
    console.error("Get listings error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get single listing by ID (with reviews populated)
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate("host", "name avatar phone email")
      .populate("reviews.user", "name")

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" })
    }

    res.json(listing)
  } catch (error) {
    console.error("Get listing error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new listing (protected route)
router.post(
  "/",
  auth,
  [
    body("title").trim().isLength({ min: 5 }).withMessage("Title must be at least 5 characters"),
    body("description").trim().isLength({ min: 20 }).withMessage("Description must be at least 20 characters"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("location.address").trim().notEmpty().withMessage("Address is required"),
    body("location.city").trim().notEmpty().withMessage("City is required"),
    body("location.country").trim().notEmpty().withMessage("Country is required"),
    body("propertyType")
      .isIn(["apartment", "house", "villa", "studio", "loft", "other"])
      .withMessage("Invalid property type"),
    body("bedrooms").isInt({ min: 0 }).withMessage("Bedrooms must be a non-negative integer"),
    body("bathrooms").isInt({ min: 0 }).withMessage("Bathrooms must be a non-negative integer"),
    body("maxGuests").isInt({ min: 1 }).withMessage("Max guests must be at least 1"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const listingData = {
        ...req.body,
        host: req.user._id,
      }

      const listing = new Listing(listingData)
      await listing.save()

      const populatedListing = await Listing.findById(listing._id).populate("host", "name avatar")

      res.status(201).json({
        message: "Listing created successfully",
        listing: populatedListing,
      })
    } catch (error) {
      console.error("Create listing error:", error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Update listing (protected route)
router.put("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" })
    }

    // Check if user is the host of this listing
    if (listing.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this listing" })
    }

    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("host", "name avatar")

    res.json({
      message: "Listing updated successfully",
      listing: updatedListing,
    })
  } catch (error) {
    console.error("Update listing error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete listing (protected route)
router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" })
    }

    // Check if user is the host of this listing
    if (listing.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this listing" })
    }

    await Listing.findByIdAndDelete(req.params.id)

    res.json({ message: "Listing deleted successfully" })
  } catch (error) {
    console.error("Delete listing error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Submit a review for a listing (protected route)
router.post(
  "/:id/reviews",
  auth,
  [
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("comment").trim().isLength({ min: 5 }).withMessage("Comment must be at least 5 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const listing = await Listing.findById(req.params.id)
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" })
      }
      // Prevent duplicate review by same user
      if (listing.reviews.some(r => r.user.toString() === req.user._id.toString())) {
        return res.status(400).json({ message: "You have already reviewed this property." })
      }
      const review = {
        user: req.user._id,
        rating: req.body.rating,
        comment: req.body.comment,
        createdAt: new Date(),
      }
      listing.reviews.push(review)
      // Update average rating and review count
      listing.reviewCount = listing.reviews.length
      listing.rating = listing.reviews.reduce((sum, r) => sum + r.rating, 0) / listing.reviewCount
      await listing.save()
      res.status(201).json({ message: "Review submitted successfully!", review })
    } catch (error) {
      console.error("Submit review error:", error)
      res.status(500).json({ message: "Server error" })
    }
  }
)

module.exports = router
