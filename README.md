
<div align="center">
  <h1>
    <a href="https://eliteclub-sports.netlify.app/" target="_blank" rel="noopener noreferrer">
      🏃‍♂️‍➡️ <strong>EliteClub</strong>
    </a>
  </h1>
  <p><strong>All-in-one Sports Club Management System (EliteClub) for a single club.</strong></p>
  <p>Manage memberships, court bookings, announcements, payments, and more with role-based access and Firebase authentication.</p>
</div>

---

<h2 align="center">✨ Overview</h2>

**EliteClub** is a comprehensive Sports Club Management System tailored for a single sports club. It facilitates seamless user registration, court booking, payment tracking, announcements, and admin functionalities with full authentication, authorization, and real-time data operations.

---

<h2 align="center">🚀 Features</h2>

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

<h2 align="center">⚙️ Installation & Setup</h2>

1. **Clone the repository:**
```bash
git clone https://github.com/ei-shadi/eliteclub.git
cd eliteclub
```

2. **Install frontend and backend dependencies:**
```bash
npm install          # inside root or /client folder
cd server && npm install
```

3. **Configure environment variables:**  
Create a `.env` file inside `/server` folder with:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
```

4. **Add Firebase Admin SDK:**  
Place your Firebase Admin SDK file as `firebase-admin-key.json` in the `/server` folder.

5. **Run the backend development server:**
```bash
cd server
node index.js
```

---

<h2 align="center">🌐 Live Site</h2>

🎯 **Visit Live**  
👉 <a href="https://eliteclub-sports.netlify.app/" target="_blank" rel="noopener noreferrer">Open EliteClub Now...</a>

---

<h2 align="center">📦 API Endpoints (Express + MongoDB + Firebase Auth)</h2>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courts` | Get all court data |
| GET | `/users?email=` | Get user info by email |
| GET | `/bookings/pending`, `/bookings/approved`, `/bookings/confirmed` | Get user bookings by status |
| GET | `/bookings/pending-all`, `/bookings/confirmed-all` | Admin: get all bookings |
| GET | `/announcements` | Get all announcements |
| GET | `/coupons`, `/coupons/validate?code=` | Get and validate coupons |
| POST | `/users`, `/bookings`, `/payments`, `/courts`, `/announcements`, `/coupons` | Create entries |
| PATCH | `/courts/:id`, `/coupons/:id`, `/announcements/:id`, `/bookings/approve/:id` | Update entries |
| DELETE | `/bookings/:id`, `/courts/:id`, `/coupons/:id`, `/announcements/:id`, `/members/:id` | Delete entries |
| GET | `/payments` | Get user payment history |

🔐 **Note:** Protected routes require Firebase Bearer Token authentication.

---
<h2 align="center">🤖 Tech Stack</h2>

| 🛠️ Technology | 💡 Purpose |
|---------------|------------|
| ⚛ **React** | Frontend UI |
| 🎨 **Tailwind CSS** + 🌼 **DaisyUI** | Styling & Components |
| 🔐 **Firebase** | Auth & Admin SDK |
| 🚂 **Express.js** | Backend Framework |
| 🍃 **MongoDB** | Database |
| 🧭 **React Router** | Client Routing |
| 🧰 **TanStack Query** | Data Fetching & Caching |
| 💳 **Stripe** | Payment Integration |
| 🎯 **React Icons** | Icons |
| 🧠 **React Helmet Async** | SEO Meta |
| 🔔 **React Toast** & 💬 **SweetAlert2** | Notifications |


---

<h2 align="center">👥 User Roles</h2>

- **Admin**: Full access to manage users, bookings, courts, payments, and announcements.  
- **Member**: Can book courts, view announcements, and apply coupons.  
- **Guest**: Can view public pages, register/login.

---
