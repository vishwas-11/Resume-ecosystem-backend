# Real-Time Resume Ecosystem - Backend API

This repository contains the source code for the backend API of the Real-Time Resume Ecosystem. This powerful, centralized service is designed to manage user authentication and dynamically build professional resumes by integrating with various sub-platforms like hackathon portals, online course websites, and internship platforms.
This MVP was built as a monolithic service, with plans to evolve into a full microservices architecture.

**Live API Base URL:** https://resume-ecosystem-backend.onrender.com

---

## Features

- ***Secure User Authentication:*** JWT-based authentication for user registration and login.
- ***Dynamic Resume Management:*** Core service for creating and storing resume data.
- ***Real-Time Updates:*** Secure endpoints to add projects, work experience, and skills on the fly.
- ***Scalable Foundation:*** Built with a production-ready setup, ready for frontend integration.
- ***Live Deployment:*** Deployed and accessible globally via Render.

---

# Technology Stack

- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose ODM
- Authentication: JSON Web Tokens (JWT), bcrypt.js for password hashing
- Deployment: Render, Git & GitHub
- Utilities: dotenv for environment variables, cors for cross-origin requests

---

## 🚀 Getting Started Locally

Follow the steps below to run the project locally.

### ✅ Prerequisites

- Node.js (v18+ recommended)  
- MongoDB (Local or Atlas Cluster)  
- Postman / Insomnia (optional for testing)

---

### 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/resume-ecosystem-backend.git
cd resume-ecosystem-backend

# Install dependencies
npm install
```

---

### 🔐 Configure Environment Variables

Create a .env file in the project root and add:

```bash
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
JWT_SECRET=yourSuperSecretStringGoesHere
PORT=5000
```

---

### ▶️ Start the Server

```bash
npm start
```
Your API will now be available at http://localhost:5000

---

### 📚 API Endpoints

🔑 Authentication — /api/auth

| Method | Endpoint    | Description                                    | Access |
|--------|-------------|-----------------------------------------------|--------|
| POST   | `/register` | Register a new user & generate an empty resume | Public |
| POST   | `/login`    | Login & receive JWT token                      | Public |


/register Request Body Example:


```bash
{
  "name": "Vishwas Charan",
  "email": "vishwas@example.com",
  "password": "password123"
}
```

/login Response Example:

```bash
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 📄 Resumes — /api/resumes

All endpoints require JWT Token in the Authorization header as Bearer <token>

| Method | Endpoint      | Description                 | Access  |
| ------ | ------------- | --------------------------- | ------- |
| GET    | `/me`         | Fetch current user's resume | Private |
| POST   | `/experience` | Add work experience         | Private |
| POST   | `/project`    | Add project entry           | Private |
| POST   | `/skill`      | Add a skill                 | Private |


/project Request Example:

```bash
{
  "title": "Real-Time Resume API",
  "description": "Developed the backend for a dynamic resume ecosystem.",
  "url": "https://github.com/YOUR_USERNAME/resume-ecosystem-backend"
}
```

