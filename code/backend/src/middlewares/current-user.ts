import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export interface UserPayload {
  id: mongoose.Schema.Types.ObjectId;
  email: string;
  iat?: string; // timestamp of when token is issued
}

// augment express request obj to add in currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

/**
 * Middleware that verify the JWT token and set payload to req.currentuser
 */
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next();
  }
  try {
    const { authorization } = req.headers;
    const [_, token] = authorization.trim().split(" ");
    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    console.log(err);
  }
  next();
};
