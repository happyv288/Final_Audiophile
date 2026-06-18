// The main entry point of our Express,
// This file:
// 1. Create the express application
// 2. Sets up middleware (CORS, JSON parsing, logging)
// 3. Registers all routes
// 4. Connects to MongoDB
// 5. Starts listening for HTTP requestsn

import express from "express";
import connectDB from "./config/db";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import adminRoutes from "./routes/adminRoute";
import orderRoutes from "./routes/orderRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import { timeStamp } from "node:console";

// load environment variables from .env file
// must be called before any code that uses process.env
dotenv.config();

// create the express application
const app = express();

//---- MIDDLEWARE SETUP  -----
// Middlewre are functions that runs on every request before your routes

// CORS: Allow requests from any origin
// Origin: true reflects the request origin, which works with credentials
app.use(
  cors({
    origin: true,
    credentials: true, // Allow cookies and authorization headers
  }),
);

// Parse incoming JSON request bodies
// limit: 10mb allows base64 images upload in the req.body
app.use(express.json({ limit: "10mb" }));

//parse URL-encoded form data (e.g, from HTML forms)
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Simple request logger - logs every incoming request
// Useful debugging in dvelopment
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next(); // Always call next() to continue processing
});

// ------ROUTE REGISTERATION ------
// Tell express which routes to use and what URL prefix they start with

// Authentication routes: /api/auth/register
app.use("/api/auth", authRoutes);

// Product routes: /api/products
app.use("/api/products", productRoutes);

// Order routes; /api/orders,
app.use("/api/orders", orderRoutes);

// Admin routes: api/auth/register
app.use("/api/admin", adminRoutes);

// Health check - a simple endpoint to verify the server is running
// Use by development platforms  (like render) to check server health
app.get("/api/health", (_req, res) => {
  res.json({
    status: "OK",
    message: "Audiophile server is running!",
    timeStamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// 404 HANDLER - catches any request to undefined routes
app.use((_req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Error handler - MUST be the LAST middleware
//Express recognizes it an error handler because it has 4 parameters (err, req, res, next)
app.use(errorHandler);

// ------- START SERVER -----
// Connect to MongoDB first, then start listening for request

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`\n🚀 Server runing on port: ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(` 🔗 Health check: http://localhost:${PORT}/api/health\n`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handles unhandled promises rejections (catches async errors are not caught by try/catch)
process.on("unhandledRejection", (reason: Error) => {
  console.error("unhandled promise Rejection:", reason.message);
  process.exit(1);
});

startServer();

export default app;
