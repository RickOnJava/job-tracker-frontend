# 🎯 Student Job Tracker

A full-stack web application that helps students track their job applications with ease. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and deployed using Vercel and Render.

---

## 🔧 Tech Stack

- **Frontend:** React (Vite + Hooks), Redux Toolkit, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT-based secure login/register
- **Deployment:** Vercel (frontend), Render (backend)

---

## 🚀 Live Demo

🌐 Frontend: [https://student-job-tracker-rho.vercel.app/] 

---

## ✨ Features

- 🔐 **User Authentication** (Register / Login)
- 📝 **Add Job Applications**  
  - Fields: Company, Role, Status, Date, Link
- 📋 **List All Applications** with filters
  - Filter by **status** or **date range**
- 🔁 **Update Job Status**
- ❌ **Delete Job Application**
- 📊 **Dashboard Stats**
  - Automatically updates counts of Applied / Interview / Offer / Rejected
- 🎨 Beautiful, responsive UI with animations

---

## 🛠️ Installation (Local)

```bash
# Clone frontend and backend repos
git clone https://github.com/RickOnJava/job-tracker-frontend.git
git clone https://github.com/RickOnJava/job-tracker-backend.git

# Backend setup
cd job-tracker-backend
npm install
create .env file with:
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_secret
  FRONTEND_URL=http://localhost:5173
npm start

# Frontend setup
cd ../job-tracker-frontend
npm install
create .env file with:
  VITE_BACKEND_URL=http://localhost:4000/api
npm run dev
