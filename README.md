# V2text

V2text is a real-time chat web application that enables users to communicate instantly, manage profiles, and share media securely. Built with a modern tech stack, it supports authentication, file uploads, emoji messaging, and more.

## Live Link

[https://v2text.onrender.com](https://v2text.onrender.com)

## Features

- **User Authentication:** Secure registration and login using JWT and password hashing.
- **Real-Time Messaging:** Instant chat powered by Socket.IO.
- **Profile Management:** Update user details and avatars.
- **Media Sharing:** Upload images and files using Cloudinary and Multer.
- **Emoji Support:** Send emojis in chat messages.
- **Responsive UI:** Built with React.js and Tailwind CSS for a seamless experience on all devices.
- **Watch History:** Track recent conversations (if implemented).
- **Error Handling:** User-friendly error messages and validations.

## Technologies Used

- **Frontend:** React.js, Redux, Tailwind CSS, Socket.IO Client
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Socket.IO, Cloudinary, Multer, bcryptjs

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database (local or Atlas)
- Cloudinary account for media uploads

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shudhansu04/V2text.git
   cd V2text
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables in `backend/.env`:**
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   ```

### Running the Application

- **Start the backend server:**
  ```bash
  cd backend
  npm run dev
  ```

- **Start the frontend development server:**
  ```bash
  cd ../frontend
  npm run dev
  ```

- **Access the app:**  
  Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) in your browser.

## Folder Structure

```
V2text/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── middlewares/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── customHooks/
│   │   └── App.jsx
│   └── public/
└── README.md
```

## License

This project is licensed under the ISC License.
