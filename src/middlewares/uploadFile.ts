import {  Request, Response } from 'express';
import { S3 } from '@aws-sdk/client-s3';
import multer, { FileFilterCallback } from 'multer';
import multerS3 from "multer-s3";
import path from "path";

const s3 = new S3({
  region: process.env.AWS_REGION as string,
  endpoint: process.env.AWS_ENDPOINT as string,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});
const s3Storage = multerS3({
    s3: s3, 
    bucket: process.env.S3_BUCKET_NAME as string, 
    metadata: (req, file, cb) => {
        cb(null, {fieldname: file.fieldname})
    },
    key: (req, file, cb) => {
         const fileName = `${Date.now()}_${file.originalname}`;
        cb(null, fileName);
    }
});

function sanitizeFile(
  file: Express.Multer.File,
  cb: FileFilterCallback
): void {
  
  const fileExts = [".png", ".jpg", ".jpeg", ".gif", ".pdf"];

  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  const isAllowedMimeType = file.mimetype.startsWith("image/")|| file.mimetype === "application/pdf";

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true);
  } else {
    cb(new Error("File type not allowed!"));
  }
}

const uploadImage = multer({

  storage: s3Storage, 
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) => {
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

export default uploadImage;