import { Router } from "express";
import { authController } from "./auth.controller";


const router=Router()
router.post('/signup',authController.creatUser)
router.post('/signin',authController.userSignin)

export const authRouter=router