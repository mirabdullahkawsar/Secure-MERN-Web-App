# Secure MERN Web App

A full-stack secure web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). This project focuses on implementing real-world **security features** like AES encryption, password hashing, and data integrity checks using HMAC.

---

## 🚀 Features

### 🔐 Authentication
- Register/Login system
- Password hashing with **bcrypt** and salting
- User email and name **AES-encrypted** in the database

### ✍️ Secure Posting
- Authenticated users can post encrypted messages
- Posts are stored securely with AES + MAC (Message Authentication Code)
- MAC verification to ensure **data integrity**

### 🛡️ Data Protection
- AES-256-CBC encryption algorithm
- HMAC-SHA256 for MAC-based tamper detection
- All personal and post data is **unreadable in MongoDB**

### 🌐 Tech Stack
- **Frontend:** React (with React Router)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (local or Atlas)
- **Encryption:** crypto module (Node.js)
- **Security:** bcryptjs for hashing, dotenv for env vars

---

## 🛠️ Setup Instructions

### 📁 Clone the repo
```bash
git clone https://github.com/your-username/secure-mern-web-app.git
cd secure-mern-web-app
```

### 🔧 Setup backend
```bash
cd server
npm install
```
Create a `.env` file in `server/` with:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/securewebdb
```
Then start the backend:
```bash
node server.js
```

### 💻 Setup frontend
```bash
cd ../client
npm install
npm start
```

App will be live at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Test API with Postman
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register a new user |
| `/api/auth/login` | POST | Login and get decrypted name |
| `/api/posts` | POST | Create encrypted post |
| `/api/posts` | GET | View decrypted posts |

### 🔐 POST `/api/posts`
**Request Body:**
```json
{
  "content": "This is a secure message from Postman",
  "author": "Test User"
}
```
**Response:**
```json
{
  "message": "Post created"
}
```

### 📄 GET `/api/posts`
**Response:**
```json
[
  {
    "content": "This is a secure message from Postman",
    "author": "Test User"
  }
]
```


---

## 📂 Folder Structure
```
secure-mern-web-app/
├── server/
│   ├── routes/, models/, utils/
│   └── server.js
├── client/
│   ├── src/
│   │   └── pages/, App.js
```

---

## 👨‍💻 Author
**Mir Abdullah Kawsar**  
CSE447 - Secure Web Systems

---

## 📜 License
This project is for educational purposes only.
© 2025 Mir Abdullah Kawsar. All rights reserved.

