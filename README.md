<div align="center">
  <h1>
    <a href="https://eliteclub-sports.netlify.app/" target="_blank" rel="noopener noreferrer">
      <img src="https://i.ibb.co/ksYRTj6k/Logo.png" alt="EliteClub Logo" width="50" height="50" />
      <strong>EliteClub</strong>
    </a>
  </h1>
  <p><strong>All-in-one Sports Club Management System (EliteClub) for a single club.</strong></p>
  <p>Manage memberships, court bookings, announcements, payments, and more with role-based access and Firebase authentication.</p>
</div>

---

<h2 align="center">📷 Interface Snapshots 🌟</h2>

<div align="center">
  <img src="https://i.ibb.co.com/5XTVKChB/Elite-Club.png" alt="EliteClub Screenshot" width="700" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
</div>

---

<h2 align="center">✨ Project Overview</h2>

**EliteClub** is a comprehensive Sports Club Management System tailored for a single sports club. It facilitates seamless user registration, court booking, payment tracking, announcements, and admin functionalities with full authentication, authorization, and real-time data operations.

---

<h2 align="center">🚀 Features</h2>

* 🛡️ **Role-based Access Control** — Admin / Member / User  
* 🔐 **Firebase Authentication** — Login / Register  
* 🎾 **Court & Session Booking** — With admin approval system  
* 👥 **Member Management** — Firebase user sync  
* 🎟️ **Coupon System** — Smart validation & discounts  
* 📢 **Announcements** — Create and update club news  
* 💳 **Stripe Payments** — Integrated, secure payment tracking  
* ⚡ **Realtime Feedback** — Toasts & modals for instant alerts  
* 🧠 **SEO Optimization** — Dynamic meta tags via Helmet Async  
* 💻 **Responsive Design** — Tailwind CSS + DaisyUI support  

---

<h2 align="center">🤖 Tech Stack</h2>

<table align="center">
  <tr>
    <th>🛠️ Technology</th>
    <th>💡 Purpose</th>
  </tr>
  <tr>
    <td>⚛ <strong>React</strong></td>
    <td>Frontend UI</td>
  </tr>
  <tr>
    <td>🎨 <strong>Tailwind CSS</strong> + 🌼 <strong>DaisyUI</strong></td>
    <td>Styling & Components</td>
  </tr>
  <tr>
    <td>🔐 <strong>Firebase</strong></td>
    <td>Auth & Admin SDK</td>
  </tr>
  <tr>
    <td>🚂 <strong>Express.js</strong></td>
    <td>Backend Framework</td>
  </tr>
  <tr>
    <td>🍃 <strong>MongoDB</strong></td>
    <td>Database</td>
  </tr>
  <tr>
    <td>🧭 <strong>React Router</strong></td>
    <td>Client Routing</td>
  </tr>
  <tr>
    <td>🧰 <strong>TanStack Query</strong></td>
    <td>Data Fetching & Caching</td>
  </tr>
  <tr>
    <td>💳 <strong>Stripe</strong></td>
    <td>Payment Integration</td>
  </tr>
  <tr>
    <td>🎯 <strong>React Icons</strong></td>
    <td>Icons</td>
  </tr>
  <tr>
    <td>🧠 <strong>React Helmet Async</strong></td>
    <td>SEO Meta</td>
  </tr>
  <tr>
    <td>🔔 <strong>React Toast</strong> & 💬 <strong>SweetAlert2</strong></td>
    <td>Notifications</td>
  </tr>
</table>

---

<h2 align="center">👥 User Roles</h2>

- **Admin**: Full access to manage users, bookings, courts, payments, and announcements.  
- **Member**: Can book courts, view announcements, and apply coupons.  
- **Guest**: Can view public pages, register/login.

---

<h2 align="center">🔑 Admin Access</h2>

To check the **Admin Dashboard**, use the credentials below:  
----------------------------------------------------------  
📧 **Admin Email:** `eftajulislam.shaadi@gmail.com`  
🔐 **Admin Password:** `Ban$$Ka05i!`  

---

<h2 align="center">🌐 Live Site</h2>

🎯 **Visit Live**  
👉 <a href="https://eliteclub-sports.netlify.app/" target="_blank" rel="noopener noreferrer">Open EliteClub Now...</a>

---

<h2 align="center">🖥️ EliteClub Server:</h2>

🌟**Server Code:**  
<a href="https://github.com/ei-shadi/EliteClub-Server.git" target="_blank" rel="noopener noreferrer">https://github.com/ei-shadi/eliteclub-server</a>

---

<h2 align="center">⚙️ Installation & Setup</h2>

1. **Clone The Repository For Frontend:**
```bash
git clone https://github.com/ei-shadi/ElitClub.git
cd eliteclub
npm install          # inside root or / client folder
```

2. **Clone The Repository For Backend:**
```bash
git clone https://github.com/ei-shadi/EliteClub-Server.git
cd server 
npm install          # inside root or / server folder
```

3. **Configure environment variables:**  
Create a `.env` file inside `/server` folder with:
```
MONGODB_URI=your_mongodb_uri
```

4. **Add Firebase Admin SDK:**  
Place your Firebase Admin SDK file as `firebase-admin-key.json` in the `/server` folder.

5. **👀 Let's Go Live:**
```bash
cd Eliteclub              ✨Client Side
npm run dev
----------------------
----------------------
cd Eliteclub-Server       ✨Server Side
node index.js
```

---

<div align="center">

<h2>📦 API Endpoints (Express + MongoDB + Firebase Auth)</h2>

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td><code>/courts</code></td>
      <td>Get all court data</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/users?email=</code></td>
      <td>Get user info by email</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/bookings/pending</code>, <code>/bookings/approved</code>, <code>/bookings/confirmed</code></td>
      <td>Get user bookings by status</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/bookings/pending-all</code>, <code>/bookings/confirmed-all</code></td>
      <td>Admin: get all bookings</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/announcements</code></td>
      <td>Get all announcements</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/coupons</code>, <code>/coupons/validate?code=</code></td>
      <td>Get and validate coupons</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/users</code>, <code>/bookings</code>, <code>/payments</code>, <code>/courts</code>, <code>/announcements</code>, <code>/coupons</code></td>
      <td>Create entries</td>
    </tr>
    <tr>
      <td>PATCH</td>
      <td><code>/courts/:id</code>, <code>/coupons/:id</code>, <code>/announcements/:id</code>, <code>/bookings/approve/:id</code></td>
      <td>Update entries</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td><code>/bookings/:id</code>, <code>/courts/:id</code>, <code>/coupons/:id</code>, <code>/announcements/:id</code>, <code>/members/:id</code></td>
      <td>Delete entries</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/payments</code></td>
      <td>Get user payment history</td>
    </tr>
  </tbody>
</table>

<p>🔐 <strong>Note:</strong> Protected routes require Firebase Bearer Token authentication.</p>

</div>
