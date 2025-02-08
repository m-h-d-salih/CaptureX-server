import express from 'express';
import { createValidator } from 'express-joi-validation';
import { trycatch } from '../middlewares/tryCatch';
import { login, signup } from '../controllers/user/authController';
import { loginValidation, registerValidation } from '../middlewares/validation/auth';

const router=express.Router();
const validator=createValidator({passError:true});
router.post('/signup',validator.body(registerValidation),trycatch(signup))
router.post('/login',validator.body(loginValidation),trycatch(login))
// router.put('/upload/:id',checkAuth,uploadImage.single('image'),trycatch(uploadProfileImage))
// router.put('/uploadResume/:id',checkAuth,uploadImage.single('file'),trycatch(uploadResume))
export default router;