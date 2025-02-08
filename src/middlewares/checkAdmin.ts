import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "./AppError";
import Admin from "../models/admin/adminSchema";

const JWT_SECRET = process.env.TOKEN_SECRET || "your_jwt_secret";

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authorization token is required.", 401);
    }
    
    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };
    const { _id:id } = decoded;
        if (!id) {
            throw new AppError("Invalid token. Admin ID not found.", 401);
        }
        const admin = await Admin.findById(id);
        if (!admin) {
            throw new AppError("Access denied. Admin privileges required.", 403);
        }

        next();
    } catch (error: any) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};
