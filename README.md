# 🚀 User Authentication API

## 🌟 Overview
Welcome to the **User Authentication API**! This is a powerful Node.js and MongoDB-based authentication system that lets users register, log in, and manage their profiles with ease. It also includes features like KYC verification and post creation. JWT is used for secure authentication. 🔐

## ✨ Features
- ✅ User Registration & Login (JWT Authentication) 🔑
- ✅ One-to-One relationship: Each user has **one** KYC record 🆔
- ✅ One-to-Many relationship: Each user can have **multiple** posts 📝
- ✅ Protected Routes using JWT Middleware 🛡️
- ✅ User Deletion (Removes related KYC and Posts) 🗑️

## 🛠️ Technologies Used
- 🟢 **Node.js**
- 🚀 **Express.js**
- 🗄️ **MongoDB (Mongoose ORM)**
- 🔑 **JWT (JSON Web Token) for Authentication**

## 📥 Installation

1. **Clone the repository**:
   ```sh
   https://github.com/Chioma-Okeke/user-auth-kyc-post.git
   cd user-auth-kyc-post

   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Create a `.env` file and add the following**:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Start the server**:
   ```sh
   npm start
   ```
   🎉 Your API is now running!

## 🔗 API Endpoints

### 🔐 Authentication
- **Register User**: `POST /api/auth/register` 📝
- **Login User**: `POST /api/auth/login` 🔑

### 🆔 KYC Management (One-to-One)
- **Create KYC**: `POST /api/kyc` ✅

### 📝 Post Management (One-to-Many)
- **Create Post**: `POST /api/post` 🖊️

### 👤 User Management
- **Delete User**: `DELETE /api/user/:id` 🗑️

## 🚀 Usage
- Use **Postman** or any API testing tool to test the endpoints.
- Register a user, log in to get a token, and include it in the headers (`Authorization: Bearer <token>`) to access protected routes. 🔒

