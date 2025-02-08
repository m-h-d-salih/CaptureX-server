import { Request, Response } from "express";
import AppError from "../../middlewares/AppError";
import User from "../../models/user/userSchema";
import { comparepassword, hashPassword } from "../../utils/bcrypt";
import { generateToken } from "../../utils/jwt";

export const signup=async(req:Request,res:Response)=>{
    const {name,email,password}=req.body;
    const existuser=await User.findOne({email});
    if(existuser)
        throw new AppError(`user already exist`,400);
    const hashedPassword = await hashPassword(password);
    const user=new User({
        name,
        email,
        password:hashedPassword,
    })
    await user.save()
    res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        data:{
            id:user._id,
            name:user.name,
            email:user.email
        } 
      });
}


export const login=async(req:Request,res:Response)=>{
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user)
            {
                throw new AppError(`no user found ,please create an account`,404)
            }
                
        const validateUser=await comparepassword(password,user.password)
        if(!validateUser) return res.status(404).json({success:false,message:`inncorrect username/password `})
        const token=generateToken(user.id)
         res.status(200).json({success:true,message:`user logined successfully`, data:{
            id:user._id,
            name:user.name,
            email:user.email
        } ,token })

}