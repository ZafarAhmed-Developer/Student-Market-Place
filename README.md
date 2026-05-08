# 🎓 Uni Market: Student Marketplace Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite)](https://vitejs.dev/)

**Uni Market** is a specialized peer-to-peer e-commerce platform designed exclusively for university students. It enables students to buy and sell used textbooks, electronics, furniture, and dorm essentials within their campus community securely and efficiently.

---

## 🌟 Key Features

### 🔐 Secure Authentication System
- **JWT-Based Authentication**: Secure user sessions with JSON Web Tokens
- **Password Encryption**: Bcrypt hashing for secure password storage
- **Campus Verification**: Student-specific registration with campus information
- **Persistent Sessions**: Auto-login capabilities with localStorage

### 🛒 Comprehensive Product Management
- **Dynamic Product Listings**: Real-time posting with multi-image upload support (up to 5 images)
- **Advanced Browsing**: Smart filtering by categories, condition, price range, and search
- **Interactive Product Details**: High-fidelity product pages with seller contact integration
- **Image Upload**: Multer middleware for secure file handling with validation

### 👤 User Profile & Rating System
- **Seller Profiles**: Viewable ratings, contact information, and sell history
- **Review System**: Users can rate and review sellers (one review per seller)
- **Profile Management**: Update personal information, avatar, and contact details
- **Sell Count Tracking**: Automatic tracking of user's selling activity

### 📱 Responsive Design
- **Mobile-First Approach**: Optimized for all device sizes
- **Modern UI/UX**: Clean, intuitive interface using Tailwind CSS
- **Fast Performance**: Vite-powered development and build process

---

## 🛠️ Tech Stack

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19, Vite 8.x, Tailwind CSS 4.x | Modern UI framework with fast build tool and utility-first CSS |
| **Backend** | Node.js 20.x, Express.js 4.x | Server-side JavaScript runtime and web framework |
| **Database** | MongoDB Atlas, Mongoose 8.x | NoSQL database with ODM for data modeling |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js 2.x | Secure token-based auth and password hashing |
| **File Handling** | Multer 2.x | Middleware for handling multipart/form-data (image uploads) |
| **Development Tools** | ESLint 10.x, React DevTools | Code linting and debugging tools |
| **Icons** | Lucide React 1.x | Beautiful, consistent icon library |
| **Routing** | React Router DOM 7.x | Client-side routing for SPA |

---

## 📂 Project Structure

```
student-marketplace/
├── backend/                          # Express.js Server
│   ├── middleware/
│   │   ├── auth.js                  # JWT authentication middleware
│   │   └── upload.js                # Multer file upload configuration
│   ├── models/
│   │   ├── Product.js               # Product schema with validation
│   │   ├── Review.js                # Seller review schema
│   │   ├── User.js                  # User schema with password hashing
│   │   └── UserSellList.js          # User's sell list tracking
│   ├── routes/
│   │   ├── auth.js                  # Authentication endpoints
│   │   ├── products.js              # Product CRUD operations
│   │   ├── user.js                  # User sell list endpoints
│   │   └── userSellListRoutes.js    # User profiles and reviews
│   ├── uploads/                     # Static file storage for images
│   └── server.js                    # Main server entry point
├── src/                             # React Frontend
│   ├── api.js                       # Centralized API service layer
│   ├── components/
│   │   ├── AuthForms.jsx            # Login/Signup modal components
│   │   ├── Layout.jsx               # Header, Footer, and layout wrapper
│   │   ├── ProductCard.jsx          # Individual product display card
│   │   ├── ProductGrid.jsx          # Product listing grid component
│   │   ├── SearchComponents.jsx     # Search and filter UI components
│   │   └── Utilities.jsx            # Helper components and utilities
│   ├── pages/
│   │   ├── BrowsePage.jsx           # Product browsing with filters
│   │   ├── HomePage.jsx             # Landing page with featured products
│   │   ├── LoginPage.jsx            # Login page (redirects to modal)
│   │   ├── MyListingsPage.jsx       # User's active listings management
│   │   ├── ProductDetailPage.jsx    # Individual product detail view
│   │   ├── ProfilePage.jsx          # User profile and settings
│   │   └── SellPage.jsx             # Product creation form
│   ├── assets/                      # Static assets (logo, images)
│   ├── App.css                      # Global styles
│   ├── App.jsx                      # Main routing and app structure
│   ├── index.css                    # Base CSS styles
│   └── main.jsx                     # React app entry point
├── public/                          # Public static files
├── index.html                       # HTML template
├── package.json                     # Frontend dependencies and scripts
├── vite.config.js                   # Vite configuration
└── eslint.config.js                 # ESLint configuration
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas** account or local MongoDB instance
- **Git** for version control

### 1. Clone the Repository
```bash
git clone <repository-url>
cd student-marketplace
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Create environment file
cp .env.example .env
# Or create .env manually with the following variables
```

### 3. Frontend Setup
```bash
# Return to root directory
cd ..

# Install frontend dependencies
npm install
```

### 4. Environment Configuration
Create `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/student_marketplace?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_characters
JWT_EXPIRE=30d

# File Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png,image/gif,image/webp
```

### 5. Database Setup
1. **MongoDB Atlas** (Recommended):
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a database user with read/write permissions
   - Whitelist your IP address (0.0.0.0/0 for development)
   - Get your connection string and update `MONGO_URI`

2. **Local MongoDB** (Alternative):
   - Install MongoDB locally
   - Start MongoDB service
   - Use `MONGO_URI=mongodb://localhost:27017/student_marketplace`

### 6. Run the Application

#### Development Mode (Recommended)
```bash
# Terminal 1: Start Backend Server
cd backend
npm run dev

# Terminal 2: Start Frontend Development Server
cd ..
npm run dev
```

#### Production Build
```bash
# Build frontend for production
npm run build

# Start production server (backend serves frontend)
cd backend
npm start
```

### 7. Access the Application
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

---

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | `5000` |
| `NODE_ENV` | Environment mode | No | `development` |
| `MONGO_URI` | MongoDB connection string | **Yes** | - |
| `JWT_SECRET` | JWT signing secret (min 32 chars) | **Yes** | - |
| `JWT_EXPIRE` | JWT token expiration time | No | `30d` |
| `MAX_FILE_SIZE` | Maximum upload file size in bytes | No | `10485760` (10MB) |
| `ALLOWED_FILE_TYPES` | Comma-separated allowed MIME types | No | `image/jpeg,image/jpg,image/png,image/gif,image/webp` |

---

## 🗄️ Database Documentation

### MongoDB Connection
The application connects to MongoDB using Mongoose ODM with the following configuration:
- **Connection String**: Stored in `MONGO_URI` environment variable
- **Database Name**: `student_marketplace` (or as specified in connection string)
- **Connection Options**: Automatic retry, write concern majority

### Collections & Schemas

#### 1. Users Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  campus: String,
  phone: String,
  avatar: String (URL path),
  rating: Number (default: 5.0),
  numReviews: Number (default: 0),
  sellCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

**Validation Rules:**
- Email must be unique and valid format
- Password minimum 6 characters (hashed before save)
- Rating between 1.0 and 5.0

**Indexes:**
- Unique index on `email`
- Text index on `name` (for search)

#### 2. Products Collection
```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required, min: 0),
  category: String (required, enum),
  condition: String (enum, default: 'used'),
  images: [String] (URLs),
  seller: ObjectId (ref: 'User', required),
  location: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

**Validation Rules:**
- Category: `books`, `electronics`, `furniture`, `dorm`, `clothing`, `other`
- Condition: `new`, `like-new`, `used`, `fair`
- Price must be non-negative number

**Indexes:**
- Text index on `title` and `description` (full-text search)
- Index on `seller` for query optimization

#### 3. Reviews Collection
```javascript
{
  name: String (required),
  rating: Number (required, 1-5),
  comment: String,
  user: ObjectId (ref: 'User', required),
  seller: ObjectId (ref: 'User', required),
  createdAt: Date,
  updatedAt: Date
}
```

**Validation Rules:**
- Rating between 1 and 5
- Unique compound index on `user` + `seller` (one review per seller)

**Indexes:**
- Compound unique index on `user` and `seller`

#### 4. UserSellLists Collection
```javascript
{
  user: ObjectId (ref: 'User', required),
  product: ObjectId (ref: 'Product', required),
  productName: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

**Relationships:**
- User → Products (one-to-many)
- Product → User (many-to-one)
- User → Reviews (one-to-many as reviewer, one-to-many as seller)
- User → UserSellList (one-to-many)

### CRUD Operations
- **Create**: Product creation updates UserSellList and increments sellCount
- **Read**: Populated queries for seller information and reviews
- **Update**: Product editing with ownership validation
- **Delete**: Cascading delete removes from UserSellList and decrements sellCount

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api`

### Authentication Endpoints

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@university.edu",
  "password": "securepassword",
  "campus": "University of Example",
  "phone": "+1234567890"
}
```

**Response (201):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@university.edu",
  "campus": "University of Example",
  "phone": "+1234567890",
  "avatar": "",
  "sellCount": 0,
  "rating": 5.0,
  "numReviews": 0,
  "token": "jwt_token_here"
}
```

**Validation:**
- Name, email, password required
- Email must be unique
- Password minimum 6 characters

#### POST /auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "john@university.edu",
  "password": "securepassword"
}
```

**Response (200):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@university.edu",
  "campus": "University of Example",
  "phone": "+1234567890",
  "avatar": "/uploads/avatar.jpg",
  "sellCount": 2,
  "rating": 4.5,
  "numReviews": 3,
  "token": "jwt_token_here"
}
```

#### GET /auth/me
Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):** Same as login response

### Product Endpoints

#### GET /products
Get all active products with optional filtering.

**Query Parameters:**
- `category`: Filter by category
- `condition`: Filter by condition
- `search`: Full-text search in title/description
- `minPrice`, `maxPrice`: Price range filter
- `sort`: `price_asc`, `price_desc`, or default `createdAt DESC`

**Response (200):**
```json
[
  {
    "_id": "product_id",
    "title": "Calculus Textbook",
    "description": "Used calculus textbook in good condition",
    "price": 45.99,
    "category": "books",
    "condition": "used",
    "images": ["/uploads/image1.jpg"],
    "seller": {
      "_id": "seller_id",
      "name": "Jane Smith",
      "campus": "State University",
      "phone": "+1987654321",
      "avatar": "/uploads/avatar.jpg",
      "rating": 4.8,
      "numReviews": 12
    },
    "location": "Campus Library",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### GET /products/:id
Get detailed information for a specific product.

**Response (200):** Single product object with populated seller

#### POST /products
Create a new product listing.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Form Data:**
- `title`: String (required)
- `description`: String (required)
- `price`: Number (required)
- `category`: String (required)
- `condition`: String (optional)
- `location`: String (optional)
- `images`: File[] (max 5, optional)

**Response (201):** Created product object

#### PUT /products/:id
Update an existing product (seller only).

**Headers:** Same as POST
**Body:** Same as POST (only provided fields updated)

**Response (200):** Updated product object

#### DELETE /products/:id
Delete a product listing (seller only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Listing deleted successfully"
}
```

#### GET /products/user/my-listings
Get all listings for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):** Array of user's products

### User Profile Endpoints

#### GET /users/:id
Get public user profile information.

**Response (200):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "avatar": "/uploads/avatar.jpg",
  "campus": "University",
  "phone": "+1234567890",
  "rating": 4.5,
  "numReviews": 10,
  "sellCount": 5,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### POST /users/:id/reviews
Create a review for a seller.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Great seller, item as described!"
}
```

**Response (201):**
```json
{
  "message": "Review added successfully"
}
```

#### GET /users/:id/reviews
Get all reviews for a seller.

**Response (200):**
```json
[
  {
    "_id": "review_id",
    "name": "Buyer Name",
    "rating": 5,
    "comment": "Excellent transaction!",
    "user": "buyer_id",
    "seller": "seller_id",
    "createdAt": "2024-01-20T15:30:00Z"
  }
]
```

#### DELETE /users/reviews/:id
Delete a review (reviewer only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Review deleted successfully"
}
```

#### PUT /users/profile
Update user profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Form Data:**
- `name`: String
- `email`: String
- `campus`: String
- `phone`: String
- `password`: String (optional, for password change)
- `avatar`: File (optional)

**Response (200):** Updated user object

### User Sell List Endpoints

#### GET /user-sell-list/:userId
Get sell list for a specific user.

**Response (200):**
```json
[
  {
    "_id": "sell_list_id",
    "user": "user_id",
    "product": {
      "_id": "product_id",
      "title": "Product Title",
      "price": 29.99,
      "images": ["/uploads/image.jpg"],
      "category": "electronics"
    },
    "productName": "Product Title",
    "createdAt": "2024-01-15T10:00:00Z"
  }
]
```

#### GET /user-sell-list/my/list
Get authenticated user's sell list.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):** Same as above

---

## 🔐 Authentication Flow

### Registration Process
1. **Client**: User submits registration form with name, email, password, campus, phone
2. **Server**: Validates required fields and email uniqueness
3. **Database**: Creates new User document, password automatically hashed via pre-save hook
4. **Server**: Generates JWT token and returns user data + token
5. **Client**: Stores user data and token in localStorage

### Login Process
1. **Client**: User submits email and password
2. **Server**: Finds user by email, compares hashed password
3. **Server**: Generates new JWT token on successful authentication
4. **Client**: Stores updated user data and token

### JWT Token Handling
- **Storage**: Tokens stored in localStorage as part of user object
- **Expiration**: 30 days by default
- **Validation**: All protected routes verify token via `protect` middleware
- **Refresh**: Automatic on each login (no refresh token system)

### Password Security
- **Hashing**: bcrypt with salt rounds of 10
- **Storage**: Only hashed passwords stored in database
- **Validation**: Minimum 6 characters on registration

### Protected Routes
All routes requiring authentication use the `protect` middleware:
- Product creation, update, deletion
- User profile updates
- Review creation/deletion
- My listings access

---

## 🎨 Frontend Documentation

### Component Architecture

#### Layout Components
- **AppLayout**: Main wrapper with Header, Footer, and auth modal
- **Header**: Navigation bar with logo, search, categories, auth buttons
- **Footer**: Site footer with links and social media

#### Authentication Components
- **AuthForms**: Modal-based login/signup forms
- **LoginForm**: Email/password login with validation
- **SignupForm**: Registration form with campus/phone fields

#### Product Components
- **ProductCard**: Individual product display with image, price, seller info
- **ProductGrid**: Responsive grid layout for product listings
- **ProductDetailPage**: Full product view with seller contact

#### Utility Components
- **SearchComponents**: Filter and search UI elements
- **Utilities**: Helper components for loading states, errors

### Page Structure

#### Public Pages
- **HomePage**: Hero section + featured products grid
- **BrowsePage**: Product browsing with filters and search
- **ProductDetailPage**: Individual product view with contact options

#### Protected Pages
- **SellPage**: Product creation form with image upload
- **MyListingsPage**: User's active listings management
- **ProfilePage**: User profile view and edit functionality

### State Management
- **Local State**: React useState for component-level state
- **User Authentication**: localStorage for persistent login
- **API Integration**: Centralized api.js for all HTTP requests

### Routing System
- **React Router DOM v7**: Client-side routing
- **Protected Routes**: Authentication checks in components
- **Modal Routing**: Auth forms as modals over existing pages

### Form Handling
- **Controlled Components**: React state for form inputs
- **Validation**: Client-side validation with error display
- **File Uploads**: FormData for multipart submissions
- **Image Preview**: Client-side image preview before upload

### API Integration
- **Centralized API**: All requests through api.js functions
- **Error Handling**: Try/catch blocks with user-friendly messages
- **Authentication**: Automatic token inclusion in headers
- **Loading States**: UI feedback during API calls

### Responsive Design
- **Mobile-First**: Tailwind CSS responsive utilities
- **Breakpoint System**: sm/md/lg breakpoints for different screen sizes
- **Touch-Friendly**: Appropriate button sizes and spacing
- **Performance**: Optimized images and lazy loading

---

## ⚙️ Backend Documentation

### Server Architecture

#### Express Configuration
```javascript
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
```

#### Middleware Stack
1. **CORS**: Cross-origin resource sharing configuration
2. **JSON Parser**: Body parsing for JSON requests
3. **URL Encoder**: Form data parsing
4. **Static Files**: Image serving from uploads directory

#### Route Organization
- **Auth Routes**: `/api/auth/*` - User authentication
- **Product Routes**: `/api/products/*` - Product CRUD operations
- **User Routes**: `/api/users/*` - Profiles and reviews
- **UserSellList Routes**: `/api/user-sell-list/*` - Sell list management

### Authentication Middleware
```javascript
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
```

### File Upload Middleware
- **Multer Configuration**: Disk storage with unique filenames
- **File Filtering**: Image types only (jpeg, jpg, png, gif, webp)
- **Size Limits**: 10MB maximum file size
- **Storage Path**: `/backend/uploads/` directory

### Error Handling
- **Global Error Handler**: Catches unhandled errors
- **Validation Errors**: Mongoose validation with custom messages
- **File Upload Errors**: Multer error handling
- **Database Errors**: MongoDB connection and query error handling

### Database Interaction Flow
1. **Connection**: Mongoose connects on server start
2. **Models**: Schema definitions with validation and middleware
3. **Queries**: Populated queries for related data
4. **Transactions**: Atomic operations for complex updates

---

## ✨ Feature Documentation

### 1. User Authentication
**Description**: Complete user registration and login system with JWT tokens.

**Frontend Components**:
- Modal-based auth forms
- Persistent login state
- Automatic redirects after authentication

**Backend Implementation**:
- Password hashing with bcrypt
- JWT token generation and validation
- Protected route middleware

**Security Features**:
- Password encryption
- Token-based authentication
- Secure password reset (future enhancement)

### 2. Product Listing & Management
**Description**: Full CRUD operations for product listings with image upload.

**Key Features**:
- Multi-image upload (up to 5 images)
- Category and condition selection
- Price and location specification
- Real-time listing updates

**Validation**:
- Required fields: title, description, price, category
- Image format and size validation
- Ownership verification for edits/deletes

### 3. Product Browsing & Search
**Description**: Advanced product discovery with multiple filter options.

**Filter Options**:
- Category filtering
- Condition filtering
- Price range filtering
- Full-text search
- Sorting by price or date

**Performance**:
- Database indexing for fast queries
- Pagination support (future enhancement)
- Efficient image loading

### 4. User Profiles & Reviews
**Description**: Seller profiles with rating and review system.

**Features**:
- Public profile pages
- Seller ratings (1-5 stars)
- Review comments
- Contact information display

**Business Logic**:
- One review per buyer-seller pair
- Automatic rating calculation
- Review deletion by reviewer only

### 5. My Listings Management
**Description**: Dashboard for users to manage their active listings.

**Capabilities**:
- View all personal listings
- Edit existing products
- Delete listings
- Track sell count

**UI Features**:
- Grid layout with product cards
- Quick edit/delete actions
- Status indicators

### 6. Image Upload System
**Description**: Secure file upload with validation and storage.

**Technical Details**:
- Multer middleware for handling multipart data
- File type validation (images only)
- Unique filename generation
- Static file serving

**Storage**:
- Local file system storage
- URL generation for frontend access
- Automatic cleanup on product deletion

---

## 🔒 Security Documentation

### Password Security
- **Hashing Algorithm**: bcrypt with salt rounds of 10
- **Storage**: Only hashed passwords in database
- **Minimum Length**: 6 characters enforced
- **No Plain Text**: Passwords never logged or transmitted in plain text

### JWT Authentication
- **Token Storage**: Client-side localStorage
- **Expiration**: 30 days default
- **Secret Key**: Environment variable (minimum 32 characters)
- **Verification**: Server-side token validation on protected routes

### API Security
- **CORS Configuration**: Restricted origins in production
- **Input Validation**: Server-side validation on all inputs
- **SQL Injection Protection**: MongoDB/Mongoose parameterized queries
- **XSS Protection**: React's automatic escaping

### File Upload Security
- **File Type Validation**: Only image MIME types allowed
- **File Size Limits**: 10MB maximum per file
- **Filename Sanitization**: Unique server-generated filenames
- **Path Security**: Files stored outside web root

### Environment Security
- **Secret Management**: All secrets in environment variables
- **No Hardcoded Values**: Configuration externalized
- **Production Checks**: NODE_ENV validation

### Best Practices Implemented
- **Helmet.js**: Security headers (future enhancement)
- **Rate Limiting**: API rate limiting (future enhancement)
- **Input Sanitization**: All user inputs sanitized
- **Error Handling**: No sensitive information in error messages

---

## 🚀 Deployment Guide

### Frontend Deployment

#### Vercel (Recommended)
1. **Connect Repository**: Link GitHub repo to Vercel
2. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. **Environment Variables**: Set production API URL
4. **Deploy**: Automatic deployments on push to main

#### Netlify
1. **Connect Repository**: Import from Git
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment Variables**: Configure API base URL
4. **Deploy**: Automatic CI/CD

### Backend Deployment

#### Railway
1. **Connect Repository**: Link GitHub repo
2. **Environment Variables**: Set all required env vars
3. **Database**: Use Railway's MongoDB or connect to Atlas
4. **Deploy**: Automatic deployments

#### Heroku
1. **Create App**: `heroku create your-app-name`
2. **Environment**: Set config vars in Heroku dashboard
3. **Database**: Use MongoDB Atlas (Heroku MongoDB deprecated)
4. **Deploy**: `git push heroku main`

#### DigitalOcean App Platform
1. **Create App**: Connect repository
2. **Resource Type**: Web Service
3. **Environment Variables**: Configure all secrets
4. **Database**: Connect to MongoDB Atlas
5. **Deploy**: Automatic scaling and deployment

### MongoDB Atlas Setup
1. **Create Cluster**: Free tier or paid cluster
2. **Database User**: Create user with read/write permissions
3. **Network Access**: Whitelist deployment IP or 0.0.0.0/0
4. **Connection String**: Update MONGO_URI with credentials

### Production Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority
JWT_SECRET=your_production_jwt_secret_minimum_32_chars
JWT_EXPIRE=7d
```

### Build Process
```bash
# Frontend production build
npm run build

# Backend production start
npm start
```

### Domain Configuration
1. **Custom Domain**: Configure in deployment platform
2. **SSL Certificate**: Automatic HTTPS provisioning
3. **CORS Origins**: Update allowed origins for production domain

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongoServerError: bad auth Authentication failed`
```
Solution: Check MONGO_URI credentials and user permissions in Atlas
```

**Error**: `MongooseError: Operation timed out`
```
Solution: Check network connectivity and whitelist IP in Atlas
```

**Error**: `MongoNetworkError: connect ECONNREFUSED`
```
Solution: Ensure MongoDB service is running (local) or Atlas cluster is active
```

### CORS Issues

**Error**: `Access to XMLHttpRequest blocked by CORS policy`
```
Solution: Check CORS configuration in server.js, ensure correct origin URLs
```

**Error**: `CORS preflight request failed`
```
Solution: Add proper headers handling for preflight requests
```

### JWT Authentication Issues

**Error**: `Not authorized, token failed`
```
Solution: Check JWT_SECRET consistency between client/server, verify token format
```

**Error**: `Not authorized, no token`
```
Solution: Ensure Authorization header is sent with Bearer token
```

### File Upload Issues

**Error**: `Only image files are allowed`
```
Solution: Check file MIME type, ensure proper file extension
```

**Error**: `File too large`
```
Solution: Reduce file size or increase MAX_FILE_SIZE limit
```

### npm Dependency Issues

**Error**: `npm ERR! code ENOTFOUND`
```
Solution: Check internet connection, clear npm cache: npm cache clean --force
```

**Error**: `npm ERR! code E404`
```
Solution: Verify package names and versions in package.json
```

### Vite Development Issues

**Error**: `Port 5173 is already in use`
```
Solution: Kill process on port or use different port: npm run dev -- --port 3000
```

**Error**: `Failed to resolve module`
```
Solution: Clear Vite cache: rm -rf node_modules/.vite
```

### API Connection Issues

**Error**: `Failed to fetch` / `Network Error`
```
Solution: Check backend server is running, verify API_BASE URL in api.js
```

**Error**: `404 Not Found`
```
Solution: Verify endpoint URLs and HTTP methods
```

### Build Issues

**Error**: `Build failed with exit code 1`
```
Solution: Check for TypeScript/ESLint errors, ensure all dependencies installed
```

**Error**: `Module not found`
```
Solution: Clear node_modules and reinstall: rm -rf node_modules && npm install
```

---

## 🚀 Future Improvements

### High Priority
- [ ] **Real-time Chat System**: WebSocket-based messaging between buyers/sellers
- [ ] **Wishlist/Favorites**: Save items for later viewing
- [ ] **Push Notifications**: Browser notifications for messages and offers
- [ ] **Advanced Search**: Fuzzy search, location-based, category sub-filters

### Medium Priority
- [ ] **Admin Dashboard**: Moderation tools for campus administrators
- [ ] **Product Categories**: Expand categories with subcategories
- [ ] **Bulk Upload**: CSV import for multiple product listings
- [ ] **Analytics Dashboard**: User activity and sales analytics

### Low Priority
- [ ] **Mobile App**: React Native companion app
- [ ] **Email Notifications**: SMTP integration for important updates
- [ ] **Payment Integration**: Stripe/PayPal for secure transactions
- [ ] **Review Photos**: Allow images in product reviews

### Technical Improvements
- [ ] **API Rate Limiting**: Prevent abuse with express-rate-limit
- [ ] **Caching Layer**: Redis for frequently accessed data
- [ ] **File Storage**: Cloud storage (AWS S3, Cloudinary) instead of local
- [ ] **Testing Suite**: Unit and integration tests with Jest
- [ ] **CI/CD Pipeline**: Automated testing and deployment
- [ ] **Monitoring**: Error tracking and performance monitoring

### Scalability Enhancements
- [ ] **Database Sharding**: Horizontal scaling for large user base
- [ ] **CDN Integration**: Faster image loading globally
- [ ] **Microservices**: Split monolithic backend into services
- [ ] **Load Balancing**: Multiple server instances

---

## 🤝 Contribution Guide

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** changes: `git commit -m 'Add some feature'`
4. **Push** to branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

### Branch Naming Convention
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical fixes
- `docs/` - Documentation updates

### Code Standards
- **ESLint**: Follow configured linting rules
- **Prettier**: Consistent code formatting
- **Commits**: Clear, descriptive commit messages
- **Tests**: Write tests for new features

### Pull Request Process
1. **Description**: Clear description of changes
2. **Testing**: Ensure all tests pass
3. **Review**: Request review from maintainers
4. **Merge**: Squash and merge approved PRs

### Development Setup
```bash
# Clone your fork
git clone https://github.com/your-username/student-marketplace.git
cd student-marketplace

# Install dependencies
npm install
cd backend && npm install && cd ..

# Create feature branch
git checkout -b feature/amazing-feature

# Start development
npm run dev  # Frontend
cd backend && npm run dev  # Backend
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Permissions:**
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

**Limitations:**
- ❌ Liability
- ❌ Warranty

**Conditions:**
- 📝 License and copyright notice

---

## 📞 Support & Contact

**Developer**: Zafar Ahmed
- **Email**: zafarahmedbaloch@gmail.com
- **LinkedIn**: [Zafar Ahmed](https://www.linkedin.com/in/zafar-ahmed-a50a7a340)
- **Instagram**: [@zafar73304](https://www.instagram.com/zafar73304)
- **WhatsApp**: [+92 307 124 4873](https://wa.me/923071244873)

**Issues & Bug Reports**: [GitHub Issues](https://github.com/your-repo/issues)

---

**Built with ❤️ for the Student Community**
