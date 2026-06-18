// Difines all authentication-related API endpoints.
// "Route tells express which controller function to run when a specific URL is hit with a specific HTTP method"
import express from "express";
import {
  getProfile,
  login,
  register,
  updateAvatar,
  updateProfile,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

const router = express.Router();
// public routes - anyone can access thse

// POST /api/auth/register create new account
router.post("/register", register);

// post /api/auth/login sign in and retrive a token
router.post("/login", login);

// protected routes --- must send a valid JWT token in the authorization header
// GET /api/auth/profile - view your own profile
router.get("/profile", protect, getProfile);

// Put /api/auth/profile -- update name, phone, address, or password
router.put("/profile", protect, updateProfile);

// Post /api/auth/avatar v --- upload a new profile picture
router.post("avatar", protect, upload.single("avatar"), updateAvatar); // upload.single("avatar") means Multer will loo around for a field named "avatar" in the form

export default router;
