// Defines the products data stucture in mongodb
// products are the core of our store - headphones,, speakers, earphones

import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/indexServer";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      // "enum" restricts the value to only these options
      // if you try to save a product with category "tables", it will fail
      enum: {
        values: ["headphones", "speakers", "earphones"],
        message: "categoy must be headphones, speakers, or earphones",
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"], // prices must be >= 0
    },

    // Main product image - stored as a URL (hosted on cloudinary)
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    features: {
      type: String,
      required: [true, "product features are required"],
    },

    // Array of objects - each item in the box

    inTheBox: [
      {
        quantity: {
          type: Number,
          required: true,
        },

        item: {
          type: String,
          required: true,
        },
      },
    ],

    // Array of additional image URLs for the product gallery
    gallery: [{ type: String }],

    // Whether to show the "N product" badge on the product
    isNewArrival: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
