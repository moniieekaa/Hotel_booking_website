const mongoose = require("mongoose")
const dotenv = require("dotenv")
const User = require("./models/User")
const Listing = require("./models/Listing")

dotenv.config()

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Listing.deleteMany({})

    // Create sample users
    const users = await User.create([
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        isHost: true,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        isHost: true,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Mike Johnson",
        email: "mike@example.com",
        password: "password123",
        isHost: false,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    ])

    // Create sample listings
    const listings = await Listing.create([
      {
        title: "Luxury Beachfront Villa in Malibu",
        description:
          "Experience the ultimate luxury in this stunning beachfront villa with panoramic ocean views. Perfect for a romantic getaway or family vacation.",
        price: 675,
        location: {
          address: "123 Pacific Coast Highway",
          city: "Malibu",
          country: "United States",
          coordinates: { lat: 34.0259, lng: -118.7798 },
        },
        images: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Pool", "Beach Access", "Parking", "Kitchen", "Air Conditioning"],
        propertyType: "villa",
        bedrooms: 4,
        bathrooms: 3,
        maxGuests: 8,
        host: users[0]._id,
        rating: 4.8,
        reviewCount: 24,
      },
      {
        title: "Cozy Downtown Apartment",
        description:
          "Modern apartment in the heart of the city. Walking distance to restaurants, shops, and attractions. Perfect for business travelers.",
        price: 600, // was 180, increased by 50%
        location: {
          address: "456 Main Street",
          city: "New York",
          country: "United States",
          coordinates: { lat: 40.7128, lng: -74.006 },
        },
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Kitchen", "Elevator", "Heating", "Workspace"],
        propertyType: "apartment",
        bedrooms: 2,
        bathrooms: 1,
        maxGuests: 4,
        host: users[1]._id,
        rating: 4.5,
        reviewCount: 18,
      },
      {
        title: "Mountain Cabin Retreat",
        description:
          "Escape to this peaceful mountain cabin surrounded by nature. Perfect for hiking, relaxation, and disconnecting from city life.",
        price: 600, // was 270, increased by 50%
        location: {
          address: "789 Mountain View Road",
          city: "Aspen",
          country: "United States",
          coordinates: { lat: 39.1911, lng: -106.8175 },
        },
        images: [
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Fireplace", "Kitchen", "Parking", "Hiking Trails", "Mountain View"],
        propertyType: "house",
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        host: users[0]._id,
        rating: 4.9,
        reviewCount: 31,
      },
      {
        title: "Modern Studio in SoHo",
        description:
          "Stylish studio apartment in trendy SoHo neighborhood. Great for solo travelers or couples exploring the city.",
        price: 600, // was 143, increased by 50%
        location: {
          address: "321 Broadway",
          city: "New York",
          country: "United States",
          coordinates: { lat: 40.7209, lng: -74.0007 },
        },
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Kitchen", "Air Conditioning", "Elevator"],
        propertyType: "studio",
        bedrooms: 0,
        bathrooms: 1,
        maxGuests: 2,
        host: users[1]._id,
        rating: 4.3,
        reviewCount: 12,
      },
      {
        title: "Urban Loft in Downtown LA",
        description:
          "Industrial-chic loft in the arts district. High ceilings, exposed brick, and modern amenities in a vibrant neighborhood.",
        price: 600, // was 240, increased by 50%
        location: {
          address: "987 Arts District Blvd",
          city: "Los Angeles",
          country: "United States",
          coordinates: { lat: 34.0522, lng: -118.2437 },
        },
        images: [
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Kitchen", "Air Conditioning", "Workspace", "Parking", "Gym Access"],
        propertyType: "loft",
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 3,
        host: users[1]._id,
        rating: 4.6,
        reviewCount: 22,
      },
      {
        title: "Grand Palace Hotel",
        description: "Elegant hotel in the city center with luxury amenities and fine dining.",
        price: 675, // was 450, increased by 50%
        location: {
          address: "100 Palace Ave",
          city: "Paris",
          country: "France",
          coordinates: { lat: 48.8566, lng: 2.3522 },
        },
        images: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Spa", "Restaurant", "Bar", "Parking", "Concierge"],
        propertyType: "hotel",
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        host: users[0]._id,
        rating: 4.9,
        reviewCount: 40,
      },
      {
        title: "Budget Inn Room",
        description: "Affordable and comfortable room for solo travelers or couples.",
        price: 600, // was 90, increased by 50%
        location: {
          address: "200 Main Road",
          city: "London",
          country: "United Kingdom",
          coordinates: { lat: 51.5074, lng: -0.1278 },
        },
        images: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Breakfast", "Parking"],
        propertyType: "hotel",
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        host: users[1]._id,
        rating: 4.1,
        reviewCount: 10,
      },
      {
        title: "Lakeview Resort Suite",
        description: "Spacious suite with a beautiful lake view, perfect for families.",
        price: 600, // was 330, increased by 50%
        location: {
          address: "500 Lake Road",
          city: "Zurich",
          country: "Switzerland",
          coordinates: { lat: 47.3769, lng: 8.5417 },
        },
        images: [
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Pool", "Lake View", "Breakfast", "Parking"],
        propertyType: "resort",
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 5,
        host: users[0]._id,
        rating: 4.7,
        reviewCount: 25,
      },
      {
        title: "Tokyo Capsule Hotel",
        description: "Modern capsule hotel for a unique and efficient stay in Tokyo.",
        price: 600, // was 60, increased by 50%
        location: {
          address: "1-1-1 Shibuya",
          city: "Tokyo",
          country: "Japan",
          coordinates: { lat: 35.6895, lng: 139.6917 },
        },
        images: [
          "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Shared Bathroom", "Locker", "Lounge"],
        propertyType: "hotel",
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 1,
        host: users[1]._id,
        rating: 4.2,
        reviewCount: 15,
      },
      {
        title: "Royal Heritage Palace",
        description: "A grand palace hotel with royal suites, lush gardens, and traditional Indian hospitality.",
        price: 1200,
        location: {
          address: "1 Palace Road",
          city: "Jaipur",
          country: "India",
          coordinates: { lat: 26.9124, lng: 75.7873 },
        },
        images: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Pool", "Restaurant", "Spa", "Parking", "Garden"],
        propertyType: "hotel",
        bedrooms: 5,
        bathrooms: 5,
        maxGuests: 10,
        host: users[0]._id,
        rating: 4.9,
        reviewCount: 55,
      },
      {
        title: "Green Valley Resort",
        description: "A peaceful resort surrounded by greenery, perfect for family vacations and relaxation.",
        price: 850,
        location: {
          address: "88 Valley Road",
          city: "Munnar",
          country: "India",
          coordinates: { lat: 10.0889, lng: 77.0595 },
        },
        images: [
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Pool", "Breakfast", "Parking", "Kids Play Area"],
        propertyType: "resort",
        bedrooms: 3,
        bathrooms: 3,
        maxGuests: 6,
        host: users[1]._id,
        rating: 4.7,
        reviewCount: 38,
      },
      {
        title: "City Center Business Hotel",
        description: "Modern hotel in the heart of the city, ideal for business travelers and conferences.",
        price: 950,
        location: {
          address: "500 Business Ave",
          city: "Mumbai",
          country: "India",
          coordinates: { lat: 19.076, lng: 72.8777 },
        },
        images: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Conference Room", "Restaurant", "Parking", "Gym"],
        propertyType: "hotel",
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 4,
        host: users[1]._id,
        rating: 4.5,
        reviewCount: 20,
      },
      {
        title: "Himalayan View Cottage",
        description: "Cozy cottage with breathtaking views of the Himalayas, perfect for a peaceful retreat.",
        price: 700,
        location: {
          address: "Hilltop Lane",
          city: "Manali",
          country: "India",
          coordinates: { lat: 32.2396, lng: 77.1887 },
        },
        images: [
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Fireplace", "Parking", "Mountain View"],
        propertyType: "house",
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 5,
        host: users[0]._id,
        rating: 4.8,
        reviewCount: 29,
      },
      {
        title: "Goa Beachfront Villa",
        description: "Luxury villa right on the beach in Goa, with private pool and sea views.",
        price: 2000,
        location: {
          address: "Sunset Beach",
          city: "Goa",
          country: "India",
          coordinates: { lat: 15.2993, lng: 74.124 },
        },
        images: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Pool", "Beach Access", "Parking", "Kitchen", "Air Conditioning"],
        propertyType: "villa",
        bedrooms: 4,
        bathrooms: 4,
        maxGuests: 8,
        host: users[1]._id,
        rating: 5.0,
        reviewCount: 60,
      },
      {
        title: "Sunrise Cliff Resort",
        description: "A beautiful resort on the cliffs of Varkala with ocean views and yoga retreats.",
        price: 1700,
        location: {
          address: "Cliff Road",
          city: "Varkala",
          country: "India",
          coordinates: { lat: 8.7378, lng: 76.7164 },
        },
        images: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Pool", "Yoga", "Restaurant", "Parking"],
        propertyType: "resort",
        bedrooms: 5,
        bathrooms: 5,
        maxGuests: 10,
        host: users[0]._id,
        rating: 4.9,
        reviewCount: 41,
      },
      {
        title: "Snow Peak Chalet",
        description: "A cozy chalet in Gulmarg with snow activities and mountain views.",
        price: 2100,
        location: {
          address: "Snow Valley",
          city: "Gulmarg",
          country: "India",
          coordinates: { lat: 34.0484, lng: 74.3805 },
        },
        images: [
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Fireplace", "Skiing", "Parking", "Mountain View"],
        propertyType: "house",
        bedrooms: 4,
        bathrooms: 4,
        maxGuests: 8,
        host: users[1]._id,
        rating: 4.8,
        reviewCount: 36,
      },
      {
        title: "City Lights Executive Hotel",
        description: "A modern executive hotel in Bangalore with business amenities and rooftop dining.",
        price: 1350,
        location: {
          address: "MG Road",
          city: "Bangalore",
          country: "India",
          coordinates: { lat: 12.9716, lng: 77.5946 },
        },
        images: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Business Center", "Rooftop Restaurant", "Parking", "Gym"],
        propertyType: "hotel",
        bedrooms: 3,
        bathrooms: 3,
        maxGuests: 6,
        host: users[0]._id,
        rating: 4.6,
        reviewCount: 22,
      },
      {
        title: "Forest Edge Eco Lodge",
        description: "Eco-friendly lodge in Jim Corbett with wildlife safaris and organic food.",
        price: 1250,
        location: {
          address: "Corbett Park",
          city: "Ramnagar",
          country: "India",
          coordinates: { lat: 29.3924, lng: 79.1316 },
        },
        images: [
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Safari", "Organic Food", "Parking", "Garden"],
        propertyType: "resort",
        bedrooms: 4,
        bathrooms: 4,
        maxGuests: 8,
        host: users[1]._id,
        rating: 4.7,
        reviewCount: 28,
      },
      {
        title: "Blue Lagoon Beach House",
        description: "A stylish beach house in Pondicherry with private access to the lagoon and water sports.",
        price: 1850,
        location: {
          address: "Lagoon Road",
          city: "Pondicherry",
          country: "India",
          coordinates: { lat: 11.9139, lng: 79.8145 },
        },
        images: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Water Sports", "Private Beach", "Parking", "Kitchen"],
        propertyType: "house",
        bedrooms: 3,
        bathrooms: 3,
        maxGuests: 7,
        host: users[1]._id,
        rating: 4.9,
        reviewCount: 33,
      },
      {
        title: "Desert Oasis Camp",
        description: "Luxury tented camp in the Thar Desert with camel safaris, cultural shows, and stargazing.",
        price: 650,
        location: {
          address: "Sam Sand Dunes",
          city: "Jaisalmer",
          country: "India",
          coordinates: { lat: 26.9117, lng: 70.9128 },
        },
        images: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Campfire", "Cultural Shows", "Camel Safari", "Parking"],
        propertyType: "camp",
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        host: users[0]._id,
        rating: 4.6,
        reviewCount: 19,
      },
      {
        title: "Tea Estate Bungalow",
        description: "Colonial-era bungalow set amidst lush tea gardens, with guided plantation tours and local cuisine.",
        price: 1200,
        location: {
          address: "Tea Estate Road",
          city: "Darjeeling",
          country: "India",
          coordinates: { lat: 27.036, lng: 88.2627 },
        },
        images: [
          "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Garden", "Tea Tasting", "Fireplace", "Parking"],
        propertyType: "bungalow",
        bedrooms: 3,
        bathrooms: 3,
        maxGuests: 6,
        host: users[1]._id,
        rating: 4.8,
        reviewCount: 27,
      },
      {
        title: "Backwater Houseboat",
        description: "Traditional Kerala houseboat with all modern comforts, cruising the scenic backwaters.",
        price: 1800,
        location: {
          address: "Alleppey Backwaters",
          city: "Alappuzha",
          country: "India",
          coordinates: { lat: 9.4981, lng: 76.3388 },
        },
        images: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Meals Included", "Air Conditioning", "Deck", "Lake View"],
        propertyType: "houseboat",
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 4,
        host: users[0]._id,
        rating: 4.9,
        reviewCount: 33,
      },
      {
        title: "Hilltop Eco Lodge",
        description: "Sustainable eco-lodge in the Western Ghats, with trekking, birdwatching, and organic food.",
        price: 950,
        location: {
          address: "Eco Valley",
          city: "Coorg",
          country: "India",
          coordinates: { lat: 12.3375, lng: 75.8069 },
        },
        images: [
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Organic Food", "Trekking", "Birdwatching", "Parking"],
        propertyType: "lodge",
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 5,
        host: users[1]._id,
        rating: 4.7,
        reviewCount: 21,
      },
      {
        title: "City Lights Boutique Hotel",
        description: "Chic boutique hotel in the heart of Bengaluru, with rooftop bar and contemporary design.",
        price: 1350,
        location: {
          address: "MG Road",
          city: "Bengaluru",
          country: "India",
          coordinates: { lat: 12.9716, lng: 77.5946 },
        },
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        ],
        amenities: ["WiFi", "Rooftop Bar", "Restaurant", "Gym", "Parking"],
        propertyType: "hotel",
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 4,
        host: users[0]._id,
        rating: 4.8,
        reviewCount: 36,
      },
    ])

    console.log("Sample data created successfully!")
    console.log(`Created ${users.length} users and ${listings.length} listings`)

    process.exit(0)
  } catch (error) {
    console.error("Error seeding data:", error)
    process.exit(1)
  }
}

seedData()
