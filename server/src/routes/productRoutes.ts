// public product API endpoints (everyone can view products)

import express from "express";
import {
  getAllPoducts,
  getProductById,
  getProductByCategory,
} from "../controllers/productController";

const router = express.Router();

// Get /api/products -> get all products
router.get("/", getAllPoducts);

// GET /api/products/category/:category -> get by category
// IMPRTANT: This route must come BEFORE "/:id" otherwise Express treats "category" as a product ID
router.get("/category/:category", getProductByCategory);

// GET /api/products/:id -> get one product
router.get("/:id", getProductById);

export default router;
