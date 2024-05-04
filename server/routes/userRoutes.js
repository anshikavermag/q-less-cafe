import express from 'express';
import {
    login,
    protect,
    signup,
    updatePassword,
} from '../controllers/authController.js';
import { deleteMe, updateMe } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);

userRouter.patch('/update-password', protect, updatePassword);
userRouter.patch('/update-me', protect, updateMe);

userRouter.delete('/delete-me', protect, deleteMe);

export default userRouter;
