# StayFinder - Airbnb Clone MERN Stack

A full-stack web application similar to Airbnb where users can list and book properties for short-term stays.

## 🚀 Features

### Frontend
- **Homepage** with property cards showing images, location, and pricing
- **Property details page** with image gallery, description, and booking calendar
- **User authentication** with login/register pages and validation
- **Booking system** with date selection and guest management
- **User dashboard** to view bookings
- **Host dashboard** to create and manage listings
- **Search and filters** by location, price, property type, and guests
- **Responsive design** that works on all devices

### Backend
- **RESTful API** with Express.js
- **User authentication** with JWT tokens
- **Property listings** CRUD operations
- **Booking system** with conflict detection
- **Data validation** and error handling
- **MongoDB integration** with Mongoose

### Database
- **Users** collection with authentication and profile data
- **Listings** collection with property details and host information
- **Bookings** collection with reservation data and status tracking

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios for API calls
- CSS3 with modern styling
- React DatePicker

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

**Database:**
- MongoDB

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository
\`\`\`bash
git clone <repository-url>
cd stayfinder-mern
\`\`\`

### 2. Install Dependencies
\`\`\`bash
# Install root dependencies (for concurrent running)
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
\`\`\`

### 3. Environment Setup

Create a `.env` file in the `backend` directory:

\`\`\`env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stayfinder
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
\`\`\`

**⚠️ IMPORTANT: Replace the following:**

1. **MongoDB URL**: Replace `mongodb://localhost:27017/stayfinder` with your MongoDB connection string:
   - For local MongoDB: Keep as is
   - For MongoDB Atlas: Use your Atlas connection string like `mongodb+srv://username:password@cluster.mongodb.net/stayfinder`

2. **JWT Secret**: Replace `your_jwt_secret_key_here_make_it_long_and_secure` with a strong, random secret key

### 4. Seed the Database (Optional)

To populate your database with sample data:

\`\`\`bash
cd backend
node seedData.js
\`\`\`

This will create sample users and property listings for testing.

### 5. Run the Application

From the root directory:

\`\`\`bash
# Run both frontend and backend concurrently
npm run dev
\`\`\`

Or run them separately:

\`\`\`bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
\`\`\`

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔧 Configuration

### Image URLs
The application uses placeholder images by default. To use custom images:

1. **For existing listings**: Update the `images` array in the seed data (`backend/seedData.js`)
2. **For new listings**: Users can add image URLs when creating listings through the host dashboard


## 📱 Usage

### For Guests:
1. **Browse Properties**: View all available properties on the homepage
2. **Search & Filter**: Use the search bar and filters to find specific properties
3. **View Details**: Click on any property to see detailed information
4. **Create Account**: Register for a new account or login
5. **Book Property**: Select dates, number of guests, and confirm booking
6. **Manage Bookings**: View all your bookings in the "My Bookings" section

### For Hosts:
1. **Create Account**: Register and login to your account
2. **Add Listing**: Click "Host" in the navigation to create a new property listing
3. **Manage Properties**: Edit or delete your existing listings
4. **View Bookings**: See booking requests for your properties

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Listings
- `GET /api/listings` - Get all listings (with optional filters)
- `GET /api/listings/:id` - Get single listing
- `POST /api/listings` - Create new listing (protected)
- `PUT /api/listings/:id` - Update listing (protected)
- `DELETE /api/listings/:id` - Delete listing (protected)

### Bookings
- `GET /api/bookings/my-bookings` - Get user's bookings (protected)
- `POST /api/bookings` - Create new booking (protected)
- `PATCH /api/bookings/:id/status` - Update booking status (protected)

## 🎨 Design Features

- **Modern UI/UX** inspired by Airbnb with clean, intuitive design
- **Responsive Layout** that works perfectly on desktop, tablet, and mobile
- **Interactive Elements** with hover effects and smooth transitions
- **Professional Color Scheme** with gradient accents
- **Accessible Design** with proper contrast and semantic HTML

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `build` folder to your hosting service
3. Update API base URL in production

### Backend (Heroku/Railway/DigitalOcean)
1. Set environment variables on your hosting platform
2. Deploy the `backend` folder
3. Ensure MongoDB connection is configured for production

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcryptjs
- **Input Validation** on both client and server side
- **CORS Configuration** for secure cross-origin requests
- **Protected Routes** requiring authentication
- **Data Sanitization** to prevent injection attacks

## 📈 Scaling Considerations

- **Database Indexing** on frequently queried fields
- **Image Storage** using cloud services (AWS S3, Cloudinary)
- **Caching** with Redis for frequently accessed data
- **Load Balancing** for high traffic scenarios
- **CDN Integration** for faster asset delivery
- **Microservices Architecture** for large-scale applications

## 🎯 Unique Features

1. **Smart Booking Conflict Detection**: Prevents double bookings automatically
2. **Advanced Search Filters**: Multi-criteria filtering with real-time results
3. **Host Dashboard**: Comprehensive property management interface
4. **Responsive Image Gallery**: Beautiful property showcase
5. **Real-time Availability**: Dynamic calendar integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running locally or check your Atlas connection string
   - Verify the database URL in your `.env` file

2. **CORS Errors**:
   - Check that the frontend is running on port 3000
   - Verify the proxy setting in `frontend/package.json`

3. **Authentication Issues**:
   - Ensure JWT_SECRET is set in your `.env` file
   - Check that tokens are being stored in localStorage

4. **Image Loading Issues**:
   - Verify image URLs are accessible
   - Check CORS settings for external image sources

For more help, please open an issue in the repository.
