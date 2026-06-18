// Handles all products rlated operations
// - Get all products
// - Get products by ID
// Gat products by category
// create product  (admin)
// Update product  (admin)
// Delete product  (admin)
// Uploade product image  (admin)

import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/Product";
import { AuthRequest } from "../types/indexServer";
import { uploadImage } from "../config/cloudinary";

// --------- GET ALL PRODUCTS ---------
// GET /api/products
export const getAllPoducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Fetch all products, newest first
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching products" });
  }
};

// --------- GET PRODUCTS BY ID ------
// GET /api/product
export const getProductById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Validate the ID format first  - MongoDB objectIDs have a specific format
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid products ID format " });
      return;
    }
    const product = await Product.findById(id);

    if (!product) {
      res.status(400).json({ message: "proucts not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching product" });
  }
};

// ------ GET PRODUCTS BY CATEGORY ----
// GET /api/products/category/category

//  Get /api/products/:category
export const getProductByCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validCategories = ["headphones", "speaker", "earphones"];
    const category = (req.params.category as string).toLocaleLowerCase();

    if (!validCategories.includes(category)) {
      res.status(400).json({ message: "Invalid category" });
      return;
    }

    const products = await Product.find({ category:category as "headphones" | "headphones" | "earphones"}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error products by category" });
  }
};

// ----------- CREATE PRODUCTS ---------------
// POST /aoi/admin/products
export const createProduct = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const {
      name,
      category,
      price,
      image,
      description,
      features,
      inTheBox,
      gallery,
      isNew,
    } = req.body;

    // validate required fields
    if (!name || !category || !price || !description) {
      res.status(400).json({ message: "please provide all required fields" });
      return;
    }

    const product = await Product.create({
      name,
      category,
      price: Number(price),
      image,
      description,
      features,
      inTheBox: inTheBox || [],
      gallery: gallery || [],
      isNew: isNew || false,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error", error);
    res.status(500).json({ message: "server error creating product" });
  }
};

// --------- UPDATE PRODUCT (ADMIN) ----
// PUT /api/admin/products/:id
export const updateProduct = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id as string)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const product = await Product.findById(req.params.id as string);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    // Update only provided fields using the nullish coalesing operator (??)
    product.name = req.body.name ?? product.name;
    product.category = req.body.category ?? product.category;
    product.price =
      req.body.price !== undefined ? Number(req.body.price) : product.price;
    product.description = req.body.description ?? product.description;
    product.features = req.body.features ?? product.features;
    product.inTheBox = req.body.inTheBox ?? product.inTheBox;
    product.gallery = req.body.gallery ?? product.gallery;
    product.isNew = req.body.isNew ?? product.isNew;

    // only update image URL if new is provided
    if (req.body.image) {
      product.image = req.body.image;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Update product error", error);
    res.status(500).json({ message: "Server error updating product" });
  }
};

// ----- DELETE PRODUCT (ADMIN) ----
// DELETE /api/adim/products/:id
export const deleteProduct = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id as string)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "produc not found" });
      return;
    }
    await product.deleteOne();
    res.status(204).json({ message: "Product deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error deleting product" });
  }
};

// ------ UPLOAD PRODUCT IMAGE (ADMIN) --
// POST /api/admin/products/upload-image
// Uploads an image to Cloudinary and returns the URL
export const uploadProductImage = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No image file provided" });
      return;
    }

    // Convert buffer to base64 for cloudinary upload
    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const result = await uploadImage(base64, "audiophile/products");

    res.status(201).json({
      url: result.secure_url, // The HTTPS URL of the uploaded image
      publicId: result.public_id, // Needed if we want to delete it later
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ message: "Server error uploading image" });
  }
};
