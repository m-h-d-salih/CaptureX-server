import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import errorHandler from './middlewares/errorHandling';
import userRouter from './routes/userRoutes';

const app = express();
dotenv.config();

const port = process.env.PORT  || 4000;
const DB=process.env.DATABASE_URL as string;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(DB);
console.log(`connected to mongodb`)
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user',userRouter);
app.use(
  errorHandler as (
      err: any,
      req: Request,
      res: Response,
      next: NextFunction
    ) => void
  );
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });