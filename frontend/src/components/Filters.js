"use client"

const Filters = ({ filters, onFilterChange }) => {
  const handleInputChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="filters">
      <div className="container">
        <div className="filters-content">
          <div className="filter-group">
            <label className="filter-label">Property Type</label>
            <select
              className="filter-input"
              value={filters.propertyType || ""}
              onChange={(e) => handleInputChange("propertyType", e.target.value)}
            >
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="studio">Studio</option>
              <option value="loft">Loft</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Min Price</label>
            <input
              type="number"
              placeholder="₹0"
              className="filter-input"
              value={filters.minPrice || ""}
              onChange={(e) => handleInputChange("minPrice", e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Max Price</label>
            <input
              type="number"
              placeholder="₹1000"
              className="filter-input"
              value={filters.maxPrice || ""}
              onChange={(e) => handleInputChange("maxPrice", e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Guests</label>
            <select
              className="filter-input"
              value={filters.guests || ""}
              onChange={(e) => handleInputChange("guests", e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters
