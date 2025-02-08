import  jwt  from "jsonwebtoken";
import dotenv from "dotenv"
import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";
import { json } from "body-parser";

dotenv.config();
const checkAuth=async(req:Request,res:Response,next:NextFunction)=>{
   try{
     const authHeader=req.headers.authorization;
     if (!authHeader || !authHeader.startsWith("Bearer ")) {
       throw new AppError  ( "Access denied. No token provided.",401);
      }
      const token = authHeader.split(" ")[1]; 
      const secret = process.env.TOKEN_SECRET;
      
      if (!secret) {
        throw new AppError("Token secret is not defined in the environment variables.",401);
      }
      const decodedToken = jwt.verify(token, secret) as jwt.JwtPayload;
      (req as any).user = decodedToken;
      next();
  
   } 
   catch(error:any){
    console.error("Error verifying token:", error);
     res.status(401).json({ success: false, message: "Invalid token or unauthorized access." });
   }
}
export default checkAuth;