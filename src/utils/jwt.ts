import jwt from "jsonwebtoken"
import AppError from "../middlewares/AppError";

export const generateToken = (userId: string): string => {
    if (!process.env.TOKEN_SECRET)
        throw new AppError('token secret is not defined in environmentel varibale')
    return jwt.sign({ _id: userId }, process.env.TOKEN_SECRET);
}
