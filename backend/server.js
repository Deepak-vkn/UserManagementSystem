import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import mongoose from 'mongoose';
import path from 'path'; 
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
dotenv.config();

// Define port
const port = process.env.PORT || 5000;

// Create Express app
const app = express();
app.use(cookieParser());
// Connect to MongoDB
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', userRoutes);
app.use('/api/admin',adminRoutes)
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
