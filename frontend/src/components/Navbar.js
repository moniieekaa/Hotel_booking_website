"use client"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            StayFinder
          </Link>

          <div className="navbar-nav">
            <Link to="/" className="navbar-link">
              Home
            </Link>

            {isAuthenticated ? (
              <div className="navbar-user">
                <Link to="/my-bookings" className="navbar-link">
                  My Bookings
                </Link>
                <Link to="/create-listing" className="navbar-link">
                  Host
                </Link>
                <div className="flex" style={{ alignItems: "center", gap: "12px" }}>
                  <span className="navbar-link">{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline"
                    style={{ padding: "8px 16px", fontSize: "14px" }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="navbar-user">
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
