# 🎓 Student Marketplace: Campus Trade Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)

**Student Marketplace** is a specialized peer-to-peer e-commerce platform designed exclusively for university students. It enables students to buy and sell used textbooks, electronics, furniture, and dorm essentials within their campus community securely and efficiently.

---

## 🌟 Key Features

### 🔐 Secure Authentication
- **JWT-Based Login/Signup**: Secure user sessions using JSON Web Tokens.
- **Campus Verification**: Logic tailored for student-specific registration.
- **Persistent Sessions**: Seamless user experience with auto-login capabilities.

### 🛒 Product Management
- **Dynamic Listing**: Real-time product posting with multi-image upload support.
- **Smart Browsing**: Advanced filtering by categories (Books, Electronics, Furniture, etc.).
- **Interactive Detail View**: High-fidelity product pages with seller contact integration.

### 👤 User Dashboard
- **My Listings**: A centralized hub for users to manage, edit, or remove their active posts.
- **Seller Profiles**: Viewable ratings and contact information for trust-building.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide Icons, React Router 7 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Auth** | JSON Web Tokens (JWT), Bcrypt.js |
| **File Handling** | Multer (Image uploads) |

---

## 🚀 Architecture & Workflow

### 1. Request Lifecycle
User Interaction → React Frontend → API Service Layer → Express Backend → Mongoose ODM → MongoDB

### 2. Authentication Flow
1. User submits credentials via **Auth Modal**.
2. Backend validates/hashes passwords and generates a **JWT**.
3. Frontend stores the **User Object + Token** in `localStorage`.
4. Subsequent requests include the token in the `Authorization` header for protected routes (e.g., Sell, Delete).

### 3. Media Workflow
- Images are uploaded via **Multer** middleware.
- Stored on the server in the `/uploads` directory.
- Served statically to the frontend using dynamic URL resolution.

---

## 📂 Project Structure

```text
std-frontend/
├── backend/                # Express Server Logic
│   ├── middleware/         # Auth & Upload filters
│   ├── models/             # Mongoose Schemas (User, Product)
│   ├── routes/             # API Endpoints
│   ├── uploads/            # Product image storage
│   └── server.js           # Main Entry Point
├── src/                    # React Frontend
│   ├── api.js              # Centralized API Service Layer
│   ├── components/         # Reusable UI Components
│   ├── pages/              # Routed Page Views
│   └── App.jsx             # Main Routing & Layout
└── package.json            # Dependencies & Scripts
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 1. Backend Configuration
Navigate to `backend/` and create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### 2. Running the Project
```bash
# In the std-frontend/ directory (Frontend)
npm install
npm run dev

# In the std-frontend/backend/ directory (Backend)
npm install
npm start
```

---

## 🛣️ Roadmap
- [ ] **Chat System**: Real-time messaging between buyer and seller.
- [ ] **Wishlist**: Save favorite items for later.
- [ ] **Push Notifications**: Instant alerts for new messages or price drops.
- [ ] **Admin Dashboard**: For campus moderators to verify listings.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
**Developed with ❤️ for the Student Community.**
