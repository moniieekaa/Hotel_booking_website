"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await axios.get("/api/bookings/my-bookings")
      setBookings(response.data)
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return
    setDeletingId(id)
    try {
      await axios.delete(`/api/bookings/${id}`)
      setBookings(bookings.filter((b) => b._id !== id))
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete booking")
    } finally {
      setDeletingId(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#28a745"
      case "pending":
        return "#ffc107"
      case "cancelled":
        return "#dc3545"
      case "completed":
        return "#6c757d"
      default:
        return "#333"
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <h1 style={{ marginBottom: "32px" }}>My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center" style={{ padding: "60px 20px" }}>
          <h3>No bookings yet</h3>
          <p style={{ color: "#666", marginBottom: "24px" }}>Start exploring and book your first stay!</p>
          <a href="/" className="btn btn-primary">
            Browse Properties
          </a>
        </div>
      ) : (
        <div className="grid grid-2">
          {bookings.map((booking) => (
            <div key={booking._id} className="card">
              <img
                src={booking.listing.images[0] || "/placeholder.svg"}
                alt={booking.listing.title}
                className="card-image"
              />
              <div className="card-content">
                <h3 className="card-title">{booking.listing.title}</h3>
                <div className="card-text" style={{ marginBottom: "16px" }}>
                  {booking.listing.location.city}, {booking.listing.location.country}
                </div>

                <div style={{ display: "grid", gap: "8px", marginBottom: "16px" }}>
                  <div>
                    <strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Guests:</strong> {booking.guests}
                  </div>
                  <div>
                    <strong>Total:</strong> ₹{booking.totalPrice}
                  </div>
                </div>

                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "white",
                    backgroundColor: getStatusColor(booking.status),
                    marginRight: 12,
                  }}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </div>
                <button
                  className="btn btn-danger"
                  style={{ marginTop: 12, fontSize: 14, padding: "6px 18px" }}
                  onClick={() => handleDelete(booking._id)}
                  disabled={deletingId === booking._id}
                >
                  {deletingId === booking._id ? "Cancelling..." : "Cancel Booking"}
                </button>

                {booking.specialRequests && (
                  <div style={{ marginTop: "12px", fontSize: "14px", color: "#666" }}>
                    <strong>Special Requests:</strong> {booking.specialRequests}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings
