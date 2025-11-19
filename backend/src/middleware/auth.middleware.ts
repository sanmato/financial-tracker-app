// backend/src/middleware/auth.middleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User.model";

//Extend 'Request' type from express to include 'user' property

export interface AuthenticatedRequest extends Request {
  user?: IUser; // 'user property be optional at the start
}

// Middleware to protect routes
export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  const authHeader = req.headers.authorization;
  //1. Verify if token exists and is Bearer token

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      //2. Get token, remove 'Bearer ' prefix
      token = authHeader.split(" ")[1];
      //3. Verify token with secret key
      const secret = process.env.JWT_SECRET;
      if (!secret)
        throw new Error("JWT_SECRET is not defined in environment variables");

      const decoded = jwt.verify(token, secret) as { userId: string };
      //4. If is valid, obtain user from DB and attach to req object
      req.user = await User.findOne({ _id: decoded.userId }).select(
        "-password"
      );
      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }
      next();
    } catch (error) {
      console.error("Error in auth middleware:", error);
      res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
};
