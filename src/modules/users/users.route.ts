import {  Router } from "express";

import { userController } from "./users.controller";
import auth from "../../midalware/auth";

const router=Router()
router.post('/',userController.creatUser)
router.get('/', auth("admin"),userController.getUsers)

router.put('/:userId',userController.updateUser)
export const userRouter=router