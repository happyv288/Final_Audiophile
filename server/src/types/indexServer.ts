import { Document, Types } from "mongoose";
import { Request } from "express";

// This is the shape of the user document stored in mongoDB
// It extends mongoose's document so we get all mongoDB methods (.save(), ._id, etc)
export interface IUser extends Document {
  _id: Types.ObjectId; // MongoDB auto-genrated unique ID
  name: string; // User's display name
  email: string; // User's email (used for login)
  password: string; // Hashed password (never stored plain text)
  isAdmin: boolean; // True = admin user, false = regular user
  avatar?: string; // Optional profile URL (from cloudinary)
  avatarPublicId?: string; // Cloudinary public ID for deleting old avatars
  phone?: string; // Optional phone number
  address?: string; //  Optional default delivery address
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>; // Method to compare a plain-text password against the hashed stored password.
}

// What we send back to the client after login/register (no password)
export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  avatar?: string;
  phone?: string;
  address?: string;
  token: string; // JWT token for authentication
}

// ------  Product Types --------------
// Shape of an items that come IN the box with a product
export interface IBoxItem {
  quantity: number;
  item: string;
}

// shape of a product document in MongoDB
export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  category: "headphones" | "speakers" | "earphones";
  price: number;
  image: string;
  description: string;
  features: string;
  inTheBox: IBoxItem[];
  gallery: string[];
  isNew: boolean;
  createAt: Date;
}

// ------ Order Types ----
// Billing/shipping info collected at checkout
export interface ICustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: "e-Money" | "Cash on Delivery";
  eMoneyPin?: string;
}

// One items in order (snapshot of product at the time of purchase)
export interface IOrderItem {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// The financial summary of an order
export interface IOrderSummary {
  subTotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
}

// Shape of an order document in MongoDB
export interface IOrder extends Document {
  _id: Types.ObjectId;
  orderId: string;
  userId?: string;
  customerInfo: ICustomerInfo;
  cartItems: IOrderItem[];
  orderSummary: IOrderSummary;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createAt: Date;
}

// ---- Auth / Request Extensions ------
// Express request  extended with our user - usedin protected routes
// when a user is logged in, we attach  their info the request  object
export interface AuthRequest extends Request {
  user?: IUser; // The logged-in user ( populated by the protect middleware)
}

//---- JWT payload ----
// what we store inside the JWT token
export interface IJwtPayload {
  id: string; // users mongodb _id
}
