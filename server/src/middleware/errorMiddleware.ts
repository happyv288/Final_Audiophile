// Global error handler for the express application.
// when any route throws an errors, express passes it there
// This gives us a single place to format and send error responses.

// Usage: any async error thrown in a route handler will automatically be caught if you use "next(error" or if you wrap with asyncHandler.

import { Request, Response, NextFunction } from "express";

// Custom error class so we can attach a status code to our errors
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message); // call the parent Error class constructor
    this.statusCode = statusCode;
    this.isOperational = true; // Marks this as a "known" operational error

    // captures the stack trace (helps with debugging)
    Error.captureStackTrace(this, this.constructor);
  }
}

// The main error handler . express recognize it has 4 parameters (err, req, res, next)
export const errorHandler = (
  err: any, // we use "any" here because errors can be mant types
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Make a copy of the error so we dont mutate the original
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";

  // ---------- Handle specific Mongoose errors -------

  // CastError: When mongodb gets an invalid ID format (not a valid objectedId)
  // e.g., /api/products/not-a-real-id
  if (err.name === "CastError") {
    message = "Resource not found - invalid ID";
    statusCode = 404;
  }

  // Duplicate key error: e.g, trying to register with an email already used
  if (err.code === 11000) {
    // Extract the field name from the error (e.g "email")
    const field = Object.keys(err.KeyValue || {})[0];
    message = `Duplicate value: ${field} already exist`;
    statusCode = 400;
  }

  // Mongoose validation error: e.g, missing  rquired ield
  if (err.name === "validationError") {
    // collect all validation error message into one string
    message = Object.values(err.errors).join(", ");
    statusCode = 400;
  }

  // JWT token errors
  if (err.name === "jsonWebTokenError") {
    message = "Invalid token";
    statusCode = 401;
  }

  // if token as expired
  if (err.name === "TokenExpiredError") {
    message = "Token has expired - pllease log in again";
    statusCode = 401;
  }

  // send the error response
  res.status(statusCode).json({
    sucsess: false,
    message,
    // only show the full stack trace in development (not in production)
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

// help to wrap asyc route handlers - catches promises rejections automatically
// without this, unhandled promise rejections crash the server
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
