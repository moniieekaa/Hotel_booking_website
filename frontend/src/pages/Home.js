"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import PropertyCard from "../components/PropertyCard"
import SearchBar from "../components/SearchBar"
import Filters from "../components/Filters"

const Home = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({})
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchProperties()
  }, [filters, searchTerm])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (searchTerm) params.append("city", searchTerm)
      if (filters.propertyType) params.append("propertyType", filters.propertyType)
      if (filters.minPrice) params.append("minPrice", filters.minPrice)
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice)
      if (filters.guests) params.append("guests", filters.guests)

      const response = await axios.get(`/api/listings?${params.toString()}`)
      setProperties(response.data)
    } catch (error) {
      console.error("Error fetching properties:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Find Your Perfect Stay</h1>
          <p className="hero-subtitle">Discover amazing places to stay around the world</p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Filters */}
      <Filters filters={filters} onFilterChange={handleFilterChange} />

      {/* Properties Section */}
      <section className="properties-section">
        <div className="container">
          <h2 className="section-title">{searchTerm ? `Properties in ${searchTerm}` : "Featured Properties"}</h2>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-3">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p>No properties found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
