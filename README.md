# 🏸 SPORTS CLUB MANAGEMENT SYSTEM(SCMS)

Welcome to **SPORTS CLUB MANAGEMENT SYSTEM**, a comprehensive MERN stack-based application for managing club bookings, court reservations, memberships, announcements, and payment processing in one place.

🔗 **Live Site URL:** []()

👤 **Admin Login**

- **Username:** admin@gmail.com
- **Password:** Admin123

---

## ✨ **Key Features**

- 🔑 **Role-based Authentication & Authorization** for User, Member, and Admin.
- 🏸 **Court Booking System** with slots, dates, and real-time availability.
- 🎟️ **Discount Coupons & Promotions** with dynamic coupon application.
- 💳 **Stripe Payment Integration** with payment history tracking.
- ✅ **Booking Status Management** (Pending, Approved, Confirmed).
- 📢 **Announcements Module** for admins to publish club announcements.
- 📊 **Interactive Dashboards** with charts, statistics, and AOS animations.
- 👥 **User & Member Management** by Admin with approval workflows.
- 🏷️ **Manage Courts & Coupons** – Add, update, delete courts or coupons easily.
- 🔍 **Advanced Search & Filters** on bookings, payments, and users.

---

## 🛠️ **Tech Stack**

- **Frontend:** React.js, Tailwind CSS, React Router, AOS, Recharts
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **Payments:** Stripe Payment Gateway
- **State Management & Data Fetching:** TanStack Query (React Query)
- **Deployment:** Netlify (Frontend), Vercel (Backend API)

---

## 🚀 **Getting Started Locally**

1. **Clone the repository:**

   ```bash
   git clone
   cd
   ```

2. **Install dependencies:**

npm install

3. **Set up environment variables:**

Create a .env file in root with:

VITE_API_URL=your_backend_api_url
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key

4. **Run the development server:**
   npm run dev

📂 Folder Structure Overview
src/
┣ Components/
┣ Pages/
┃ ┣ Dashboard/
┃ ┣ Home/
┣ Routes/
┣ Hooks/
┣ App.jsx
┣ main.jsx

🎯 Future Improvements
-Push notifications for booking status changes
-User reviews & ratings for courts
-Calendar view for bookings
-Admin analytics with advanced filters

👨‍💻 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change or enhance.
