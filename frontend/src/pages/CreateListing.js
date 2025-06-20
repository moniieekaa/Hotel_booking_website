"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const CreateListing = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: {
      address: "",
      city: "",
      country: "",
    },
    propertyType: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: [],
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"],
  })

  const amenitiesList = [
    "WiFi",
    "Kitchen",
    "Parking",
    "Pool",
    "Air Conditioning",
    "Heating",
    "Washer",
    "Dryer",
    "TV",
    "Workspace",
    "Gym",
    "Beach Access",
    "Fireplace",
    "Balcony",
    "Garden",
    "Hot Tub",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name.includes("location.")) {
      const locationField = name.split(".")[1]
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [locationField]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleAmenityChange = (amenity) => {
    const updatedAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter((a) => a !== amenity)
      : [...formData.amenities, amenity]

    setFormData({
      ...formData,
      amenities: updatedAmenities,
    })
  }

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images]
    updatedImages[index] = value
    setFormData({
      ...formData,
      images: updatedImages,
    })
  }

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    })
  }

  const removeImageField = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      images: updatedImages,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await axios.post("/api/listings", {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        maxGuests: Number(formData.maxGuests),
        images: formData.images.filter((img) => img.trim() !== ""),
      })

      navigate(`/property/${response.data.listing._id}`)
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create listing")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "800px" }}>
      <h1 style={{ marginBottom: "32px" }}>Create New Listing</h1>

      {error && <div className="error-message mb-3">{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "24px" }}>
        {/* Basic Information */}
        <div className="card" style={{ padding: "24px" }}>
          <h3 style={{ marginBottom: "20px" }}>Basic Information</h3>

          <div className="form-group">
            <label className="form-label">Property Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Beautiful apartment in downtown..."
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Describe your property..."
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">Price per night (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="form-input"
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="studio">Studio</option>
                <option value="loft">Loft</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="card" style={{ padding: "24px" }}>
          <h3 style={{ marginBottom: "20px" }}>Location</h3>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="location.address"
              value={formData.location.address}
              onChange={handleInputChange}
              className="form-input"
              placeholder="123 Main Street"
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleInputChange}
                className="form-input"
                placeholder="New York"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                type="text"
                name="location.country"
                value={formData.location.country}
                onChange={handleInputChange}
                className="form-input"
                placeholder="United States"
                required
              />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="card" style={{ padding: "24px" }}>
          <h3 style={{ marginBottom: "20px" }}>Property Details</h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                className="form-input"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                className="form-input"
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Max Guests</label>
              <input
                type="number"
                name="maxGuests"
                value={formData.maxGuests}
                onChange={handleInputChange}
                className="form-input"
                min="1"
                required
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="card" style={{ padding: "24px" }}>
          <h3 style={{ marginBottom: "20px" }}>Amenities</h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
            {amenitiesList.map((amenity) => (
              <label key={amenity} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="card" style={{ padding: "24px" }}>
          <h3 style={{ marginBottom: "20px" }}>Images</h3>

          {formData.images.map((image, index) => (
            <div key={index} style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
              <input
                type="url"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="form-input"
                placeholder="https://example.com/image.jpg"
                style={{ flex: 1 }}
              />
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="btn btn-secondary"
                  style={{ padding: "8px 16px" }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addImageField} className="btn btn-outline" style={{ marginTop: "8px" }}>
            Add Another Image
          </button>
        </div>

        {/* Submit */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}>
          <button type="button" onClick={() => navigate("/")} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateListing
