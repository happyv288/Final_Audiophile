import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from "../controllers/userController";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  uploadProductImage,
} from "../controllers/productController";
import upload from "../middleware/uploadMiddleware";
import {
  getAllOrders,
  getDashboardStats,
  updateOrderStatus,
} from "../controllers/orderController";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

// APPLY BOTH protceted and admin middleware to all routes in this fileds
// Every rote below requires the user to be logged in AND be an admon
router.use(protect, admin);

// --------Dashboard-------
// GET /api/admin/stats -> totals, revenue, recent orders etc
router.get("/stats", getDashboardStats);

// -- User MANAGEMENT BY ADMIN ----

// GET /api/admin/users ----  get all your websites users as the admin
router.get("/users", getAllUsers);

// PUT /api/admin/users/id --- update users (toggle admin)
router.put("/users/:id", updateUserRole);

// DELETE /api/admin/users/:id == delete users
router.delete("/users/:id", deleteUser);

// ---- Products Management -----------
// POST /api/adim/products  -> create a product
router.post("/product", createProduct);

// POST /api/adim/products/upload-image -> upload image to cloudinary
// upload.single("image") = Multer processes one file  in the "image" field
router.post(
  "/products/upload-image",
  upload.single("image"),
  uploadProductImage,
);

// PUT /api/admin/products/:id
router.put("/products/:id", updateProduct);

// DELETE /api/admin/products/:id -> remove a product
router.delete("/products/:id", deleteProduct);

// ----------- ORDERS MANAGEMENT ------------
// GET /api/admin/orders/ -> orders
router.get("/orders", getAllOrders);

// PUT /api/admin/orders/:id/status -> update order status
router.put("/orders/:id/status", updateOrderStatus);

export default router;
