import { useLocation, Link } from "react-router-dom"
import React, { useState } from "react"
import MockPaymentModal from "../components/MockPaymentModal"

const BookingConfirmation = () => {
  const location = useLocation()
  const booking = location.state?.booking
  const [showPayment, setShowPayment] = useState(false)
  const [paid, setPaid] = useState(false)

  if (!booking) {
    return (
      <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>Booking not found</h2>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    )
  }

  const checkInDate = new Date(booking.checkIn).toLocaleDateString()
  const checkOutDate = new Date(booking.checkOut).toLocaleDateString()

  return (
    <div className="container" style={{ padding: "80px 20px", maxWidth: "600px" }}>
      <MockPaymentModal
        open={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={() => {
          setShowPayment(false)
          setPaid(true)
        }}
      />
      <div className="card" style={{ padding: "40px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "24px" }}>🎉</div>
        <h1 style={{ marginBottom: "16px", color: "#28a745" }}>Booking Confirmed!</h1>
        <p style={{ marginBottom: "32px", color: "#666" }}>Your reservation has been successfully created.</p>

        <div style={{ textAlign: "left", marginBottom: "32px" }}>
          <h3 style={{ marginBottom: "16px" }}>Booking Details</h3>

          <div style={{ marginBottom: "16px" }}>
            <img
              src={booking.listing.images[0] || "/placeholder.svg"}
              alt={booking.listing.title}
              style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
            />
          </div>

          <div style={{ display: "grid", gap: "12px" }}>
            <div>
              <strong>Property:</strong> {booking.listing.title}
            </div>
            <div>
              <strong>Location:</strong> {booking.listing.location.city}, {booking.listing.location.country}
            </div>
            <div>
              <strong>Check-in:</strong> {checkInDate}
            </div>
            <div>
              <strong>Check-out:</strong> {checkOutDate}
            </div>
            <div>
              <strong>Guests:</strong> {booking.guests}
            </div>
            <div>
              <strong>Total Price:</strong> ₹{booking.totalPrice}
            </div>
            <div>
              <strong>Status:</strong>
              <span
                style={{
                  color: booking.status === "confirmed" ? "#28a745" : "#ffc107",
                  fontWeight: "600",
                  marginLeft: "8px",
                }}
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            {paid && (
              <div style={{ color: "#28a745", fontWeight: 600 }}>
                Payment Successful! Thank you for your payment.
              </div>
            )}
          </div>

          {booking.specialRequests && (
            <div style={{ marginTop: "16px" }}>
              <strong>Special Requests:</strong>
              <p style={{ marginTop: "4px", color: "#666" }}>{booking.specialRequests}</p>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: 16 }}>
          {!paid && (
            <button className="btn btn-success" onClick={() => setShowPayment(true)}>
              Pay Now
            </button>
          )}
          <Link to="/my-bookings" className="btn btn-primary">
            View My Bookings
          </Link>
          <Link to="/" className="btn btn-secondary">
            Continue Browsing
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation
