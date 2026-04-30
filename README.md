# 🚀 Team Task Manager

A full-stack web application designed to manage team tasks efficiently.  
It helps teams organize projects, assign tasks, and track progress in a simple and structured way.

---

## 📌 Overview

The **Team Task Manager** allows users to:
- Create and manage projects
- Assign and track tasks
- Monitor progress through a dashboard
- Update task status in real time

This project demonstrates full-stack development using modern web technologies.

---

## ✨ Features

- 🔐 User Authentication (JWT-based Login & Signup)
- 📁 Project Creation & Management
- ✅ Task Assignment and Tracking
- 🔄 Status Updates (Pending → In Progress → Done)
- 📊 Dashboard with task statistics
- 🔍 Clean and responsive user interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- CSS

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL
- Sequelize ORM

---

## 📊 Dashboard Functionality

The dashboard provides:
- Total number of tasks
- Number of completed tasks
- Number of pending tasks
- Task list with status update options

---

## 🔐 Authentication System

- Secure login using JWT (JSON Web Token)
- Token-based authorization for protected routes
- User session handled via localStorage

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager

2️⃣ Backend Setup
cd backendnpm install
Create .env file:
PORT=5000DATABASE_URL=your_postgresql_urlJWT_SECRET=your_secret_key
Run backend:
npm start

3️⃣ Frontend Setup
cd frontendnpm installnpm start

🌐 Deployment


Backend: Railway


Frontend: Vercel / Localhost



📁 Project Structure
TeamTaskManager/│├── backend/│   ├── config/│   ├── models/│   ├── routes/│   └── server.js│├── frontend/│   ├── src/│   └── public/│└── README.md

