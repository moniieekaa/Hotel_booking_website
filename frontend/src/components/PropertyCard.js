"use client"
import { useNavigate } from "react-router-dom"

const PropertyCard = ({ property }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/property/${property._id}`)
  }

  return (
    <div className="property-card" onClick={handleClick}>
      <img src={property.images[0] || "/placeholder.svg"} alt={property.title} className="property-image" />
      <div className="property-content">
        <div className="property-location">
          {property.location.city}, {property.location.country}
        </div>
        <h3 className="property-title">{property.title}</h3>
        <div className="property-details">
          <div className="property-specs">
            {property.bedrooms} bed • {property.bathrooms} bath • {property.maxGuests} guests
          </div>
          {property.rating > 0 && (
            <div className="property-rating">
              ⭐ {property.rating.toFixed(1)} ({property.reviewCount})
            </div>
          )}
        </div>
        <div className="property-price">
          ₹{property.price}
          <span className="price-period">/night</span>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
