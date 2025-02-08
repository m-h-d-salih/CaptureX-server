import { Request, Response } from "express";
import AppError from "../../middlewares/AppError";
import { S3Client } from "@aws-sdk/client-s3";
import User from "../../models/user/userSchema";
import Media from "../../models/media/mediaSchema";

export const uploadImageVideo=async(req:Request,res:Response)=>{
    const {id}=req.params;
    const description = req.body.description?req.body.description : Date.now().toString();
    if (!req.file) {
      throw new AppError('please provide image',401);
    }
        const s3Client = new S3Client({ region: process.env.AWS_REGION });
      const file = req.file as Express.MulterS3.File;
      const mediaURL = file.location;
      const fileType = file.mimetype.startsWith("image") ? "image" : "video";
      const user = await User.findById(id);
  
      if (!user) {
        throw new AppError('user not found', 404);
      }
      const newMedia = await Media.create({
        url: mediaURL,
        type: fileType,
        description,
      });
  
      user.media.push(newMedia._id);
      await user.save();
  
      res.status(200).json({
        message: "Media uploaded successfully",
        data: newMedia,
      });
    }
export const getAllImageVideo=async(req:Request,res:Response)=>{
    const {id}=req.params;
   if(!id){
    throw new AppError('please provide user id');
   }
   const  media=await User.findById({_id:id}).populate({
    path:'media',
    match: { isDeleted: false }
   }) 
  
      res.status(200).json({
        message: "Media uploaded successfully",
        data: media,
      });
    }