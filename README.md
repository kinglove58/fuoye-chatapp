# FUOYE Chat App

A real-time chat application built for students, featuring modern web technologies and real-time messaging capabilities.

## 🚀 Features

- **Real-time Messaging** - Instant message delivery using Socket.io
- **User Authentication** - Secure login and registration with JWT
- **File Upload** - Image sharing via Cloudinary integration
- **Modern UI** - Beautiful interface built with React, Tailwind CSS, and DaisyUI
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Secure** - Password hashing with bcryptjs and cookie-based sessions

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **Zustand** - State management
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **React Router** - Navigation and routing
- **React Hot Toast** - Notification system
- **Lucide React** - Icon library

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **Socket.io** - WebSocket server for real-time features
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cloudinary** - Cloud-based image storage
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kinglove58/fuoye-chatapp.git
   cd fuoye-chatapp
   ```

2. **Install dependencies**
   ```bash
   npm run build
   ```
   This will install dependencies for both frontend and backend.

3. **Environment Variables**

   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # JWT
   JWT_SECRET=your_jwt_secret_key

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Server
   PORT=5000
   NODE_ENV=development

   # Frontend URL (for CORS)
   CLIENT_URL=http://localhost:5173
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Production Mode

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
fuoye-chatapp/
├── backend/
│   ├── src/
│   │   └── index.js         # Backend entry point
│   ├── package.json
│   └── .env                 # Environment variables (create this)
├── frontend/
│   ├── src/                 # React source files
│   ├── public/              # Static assets
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind. config.js
├── package.json             # Root package.json for scripts
├── LICENSE
└── README.md
```

## 📝 Available Scripts

### Root Directory
- `npm run build` - Install all dependencies and build frontend
- `npm start` - Start the backend server in production mode

### Backend Directory
- `npm run dev` - Start backend in development mode with nodemon
- `npm start` - Start backend in production mode

### Frontend Directory
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**kinglove58**
- GitHub: [@kinglove58](https://github.com/kinglove58)

## 🙏 Acknowledgments

- Built for FUOYE students
- Special thanks to all contributors and users of this application

---

Made with ❤️ for FUOYE students
