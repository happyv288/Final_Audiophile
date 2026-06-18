// Middleware runs BETWEEN receiving a request and processing it
// "protect" checks if the user has a valid JWT token to access some features on the website
// "protect" check if the logged-in user in an admin

import { NextFunction, Response } from "express";
import  Jwt from "jsonwebtoken";
import { AuthReqest, IJwtPayload } from "../types/indexServer";
import User from "../models/User";

// These middleware functions act like security guards:
// *protect: " Do you have a valid ID card"
// -admin: "Is your ID card an admin pass?"

// ----------- protect middleware ----------
// Checks that the request has a valid JWT token in the authorization header
// Format: "Authorization: Bearer eyjh55udstfytcjtvkyctcj"

export const protect = async (
  req: AuthReqest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let token: string | undefined;

  // check if the authorization header exists and start with "Bearer"

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // extract the token: "Bearer Token" -> "Token"
      token = req.headers.authorization.split(" ")[1];

      // verify the token using our secret key
      // jwt.verify throws an error if the token is expired or invalid

      const decoded = Jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as IJwtPayload;

      // Find the user in the database using the ID stored in the token
      const user = await User.findById(decoded.id).select("'password"); // ".select(-password" means ---- give me everything Except the password

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      // Attarch the user to the request object
      // Now any route using " protect" can access req.user
      req.user = user;

      next(); // Move to the next middleware or route handler
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Not authorized - invalid token" });
      return;
    }
  }
  // if no token found at all, reject the request
  if (!token) {
    res.status(401).json({ message: "Not authorized - no token provided" });
    return;
  }
};

// ------ admin middleware -----
// Must be used after "protect" - it relies on req.user being set
// check if the logged-in user has admin privileges
export const admin = (
  req: AuthReqest,
  res: Response,
  next: NextFunction,
): void => {
  // req.user was set by the "protect" middleware above
  if (req.user && req.user.isAdmin) {
    next(); // user is amin - aalow access
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};
