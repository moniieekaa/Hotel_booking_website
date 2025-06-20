"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext"

const PropertyDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    specialRequests: "",
  })
  const [bookingLoading, setBookingLoading] = useState(false)
  const [error, setError] = useState("")

  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" })
  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewError, setReviewError] = useState("")
  const [reviewSuccess, setReviewSuccess] = useState("")

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/listings/${id}`)
        setProperty(response.data)
      } catch (error) {
        console.error("Error fetching property:", error)
        setError("Property not found")
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    })
  }

  const handleReviewChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value })
  }

  const calculateTotalPrice = () => {
    if (!bookingData.checkIn || !bookingData.checkOut || !property) return 0

    const checkIn = new Date(bookingData.checkIn)
    const checkOut = new Date(bookingData.checkOut)
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))

    return nights > 0 ? nights * property.price : 0
  }

  const handleBooking = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    setBookingLoading(true)
    setError("")

    try {
      const response = await axios.post("/api/bookings", {
        listing: property._id,
        ...bookingData,
      })

      navigate("/booking-confirmation", {
        state: { booking: response.data.booking },
      })
    } catch (error) {
      setError(error.response?.data?.message || "Booking failed")
    } finally {
      setBookingLoading(false)
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    setReviewLoading(true)
    setReviewError("")
    setReviewSuccess("")
    try {
      await axios.post(`/api/listings/${property._id}/reviews`, reviewData)
      setReviewSuccess("Review submitted!")
      setReviewData({ rating: 5, comment: "" })
      // Refresh property to show new review
      const response = await axios.get(`/api/listings/${property._id}`)
      setProperty(response.data)
    } catch (error) {
      console.error("Review submission error:", error, error.response)
      setReviewError(error.response?.data?.message || error.message || "Failed to submit review")
    } finally {
      setReviewLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error && !property) {
    return (
      <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>Property Not Found</h2>
        <p>{error}</p>
      </div>
    )
  }

  const totalPrice = calculateTotalPrice()
  const nights =
    bookingData.checkIn && bookingData.checkOut
      ? Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24))
      : 0

  return (
    <div className="property-details-page">
      <div className="container">
        {/* Property Header */}
        <div className="property-header">
          <h1 className="property-main-title">{property.title}</h1>
          <div className="property-main-location">
            {property.location.address}, {property.location.city}, {property.location.country}
          </div>
          {property.rating > 0 && (
            <div className="property-main-rating">
              <span>⭐ {property.rating.toFixed(1)}</span>
              <span>({property.reviewCount} reviews)</span>
            </div>
          )}
        </div>

        {/* Property Images */}
        <div className="property-images">
          {property.images.slice(0, 5).map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={property.title}
              className={
                index === 0 ? "property-main-image property-image-item" : "property-side-image property-image-item"
              }
            />
          ))}
        </div>

        {/* Property Info and Booking */}
        <div className="property-info">
          <div>
            <div className="property-description">
              <h2>About this place</h2>
              <p>{property.description}</p>
            </div>

            <div className="property-amenities">
              <h3 className="amenities-title">What this place offers</h3>
              <div className="amenities-list">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span>✓</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <h3 style={{ marginBottom: "16px" }}>Property Details</h3>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}
              >
                <div>
                  <strong>Property Type:</strong> {property.propertyType}
                </div>
                <div>
                  <strong>Bedrooms:</strong> {property.bedrooms}
                </div>
                <div>
                  <strong>Bathrooms:</strong> {property.bathrooms}
                </div>
                <div>
                  <strong>Max Guests:</strong> {property.maxGuests}
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: "16px" }}>Host Information</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div>
                  <div style={{ fontWeight: "600", fontSize: "18px" }}>{property.host.name}</div>
                  <div style={{ color: "#666" }}>Host</div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="booking-card">
            <div className="booking-price">
              ₹{property.price} <span style={{ fontSize: "16px", fontWeight: "400" }}>/ night</span>
            </div>

            {error && <div className="error-message mb-2">{error}</div>}

            <form className="booking-form" onSubmit={handleBooking}>
              <div className="date-inputs">
                <div className="form-group">
                  <label className="form-label">Check-in</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={bookingData.checkIn}
                    onChange={handleInputChange}
                    className="form-input"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Check-out</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={bookingData.checkOut}
                    onChange={handleInputChange}
                    className="form-input"
                    min={bookingData.checkIn || new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Guests</label>
                <select
                  name="guests"
                  value={bookingData.guests}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  {[...Array(property.maxGuests)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} guest{i + 1 > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Special Requests (Optional)</label>
                <textarea
                  name="specialRequests"
                  value={bookingData.specialRequests}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Any special requests or notes..."
                  rows="3"
                />
              </div>

              {nights > 0 && (
                <div className="booking-summary">
                  <div className="summary-row">
                    <span>
                      ₹{property.price} x {nights} night{nights > 1 ? "s" : ""}
                    </span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="summary-total">
                    <div className="summary-row">
                      <span>Total</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={bookingLoading || !bookingData.checkIn || !bookingData.checkOut}
              >
                {bookingLoading ? "Booking..." : "Reserve"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "16px", fontSize: "14px", color: "#666" }}>
              You won't be charged yet
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="property-reviews" style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Reviews</h2>
          {property.reviews && property.reviews.length > 0 ? (
            <div style={{ marginBottom: 32 }}>
              {property.reviews.map((review, idx) => (
                <div key={idx} style={{ borderBottom: "1px solid #eee", padding: "12px 0" }}>
                  <div style={{ fontWeight: 500, color: "#3730a3" }}>
                    {review.user?.name || "User"} <span style={{ color: "#f59e42" }}>★ {review.rating}</span>
                  </div>
                  <div style={{ margin: "4px 0 0 0" }}>{review.comment}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{new Date(review.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: "#888", marginBottom: 24 }}>No reviews yet.</div>
          )}

          {isAuthenticated && (
            <form onSubmit={handleReviewSubmit} style={{ maxWidth: 400 }}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontWeight: 500 }}>Your Rating</label>
                <select
                  name="rating"
                  value={reviewData.rating}
                  onChange={handleReviewChange}
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", marginTop: 4 }}
                  required
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontWeight: 500 }}>Your Review</label>
                <textarea
                  name="comment"
                  value={reviewData.comment}
                  onChange={handleReviewChange}
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", marginTop: 4 }}
                  rows={3}
                  required
                />
              </div>
              {reviewError && <div style={{ color: "red", marginBottom: 8 }}>{reviewError}</div>}
              {reviewSuccess && <div style={{ color: "green", marginBottom: 8 }}>{reviewSuccess}</div>}
              <button type="submit" className="btn btn-primary" disabled={reviewLoading}>
                {reviewLoading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}
          {!isAuthenticated && (
            <div style={{ color: "#888", marginTop: 12 }}>
              <em>Login to submit a review.</em>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
