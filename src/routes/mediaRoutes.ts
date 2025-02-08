import express from 'express';
import { createValidator } from 'express-joi-validation';
import { trycatch } from '../middlewares/tryCatch';
import checkAuth from '../middlewares/checkAuth';
import uploadMedia from '../middlewares/uploadFile';
import { uploadImageVideo } from '../controllers/media/mediaController';

const router=express.Router();
const validator=createValidator({passError:true});

router.route('/:id').put(checkAuth,uploadMedia.single('image'),trycatch(uploadImageVideo))
export default router;