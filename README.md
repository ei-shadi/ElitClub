<div align="center">
  <h1>
    <a href="https://eliteclub-sports.netlify.app/" target="_blank" rel="noopener noreferrer">
      🏆 EliteClub
    </a>
  </h1>
  <p><strong>All-in-one Sports Club Management System (SCMS) for a single club.</strong></p>
  <p>Manage memberships, court bookings, announcements, payments, and more with role-based access and Firebase authentication.</p>
</div>

---

## ✨ Overview

**EliteClub** is a comprehensive Sports Club Management System tailored for a single sports club. It facilitates seamless user registration, court booking, payment tracking, announcements, and admin functionalities with full authentication, authorization, and real-time data operations.

---

## 🚀 Features

✅ Role-based access control (Admin / Member / Guest)  
✅ Firebase Authentication (Login / Register)  
✅ Court & session booking with approval system  
✅ Member management with Firebase user sync  
✅ Coupon system with validation  
✅ Announcement creation and updates  
✅ Stripe-integrated payment tracking  
✅ Realtime feedback with toast & modal alerts  
✅ SEO-optimized routing with Helmet Async  
✅ Responsive design with Tailwind + DaisyUI  

---

## ⚙️ Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/eliteclub.git
cd eliteclub
```

2. Install client and server dependencies:
```bash
npm install          # for frontend (inside root or client folder)
cd server && npm install  # for backend
```

3. Configure environment variables:  
Create a `.env` file in the `/server` folder and add:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
```

4. Place your Firebase Admin SDK file as `firebase-admin-key.json` inside the `/server` folder.

5. Run the development server:
```bash
cd server
node index.js
```

---

## 🌐 Live Site

🎯 **Visit Live**:  
👉 <a href="https://eliteclub-sports.netlify.app/" target="_blank" rel="noopener noreferrer">Open EliteClub Now...</a>

---

## 📦 API Endpoints (Express + MongoDB + Firebase Auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courts` | Get all court data |
| GET | `/users?email=` | Get user info by email |
| GET | `/bookings/pending`, `/bookings/approved`, `/bookings/confirmed` | Get user's bookings by status |
| GET | `/bookings/pending-all`, `/bookings/confirmed-all` | Admin: get all bookings |
| GET | `/announcements` | Get all announcements |
| GET | `/coupons`, `/coupons/validate?code=` | Get and validate coupons |
| POST | `/users`, `/bookings`, `/payments`, `/courts`, `/announcements`, `/coupons` | Create data entries |
| PATCH | `/courts/:id`, `/coupons/:id`, `/announcements/:id`, `/bookings/approve/:id` | Update entries |
| DELETE | `/bookings/:id`, `/courts/:id`, `/coupons/:id`, `/announcements/:id`, `/members/:id` | Delete entries |
| GET | `/payments` | Get payment history for logged-in user |

🔐 **Note:** All sensitive routes are protected using Firebase Bearer Token validation.

---

## 🧪 Tech Stack

| 🧠 Technology | 🔧 Purpose |
|--------------|------------|
| ⚛ React | Frontend Library |
| Tailwind CSS + DaisyUI | Styling & Components |
| Firebase | Authentication & Admin SDK |
| Express.js | Backend Framework |
| MongoDB | NoSQL Database |
| React Router | Client-side Routing |
| React Icons | Icons |
| React Helmet Async | SEO Metadata |
| React Toast & SweetAlert2 | Notifications & Popups |

---

## 👥 User Roles

- **Admin**: Full access to manage users, bookings, courts, payments, and announcements.  
- **Member**: Can book courts, view announcements, and apply coupons.  
- **Guest**: Can view public pages, register/login.

---