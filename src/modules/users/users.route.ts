import {  Router } from "express";

import { userController } from "./users.controller";
import auth from "../../midalware/auth";

const router=Router()
router.post('/',userController.creatUser)
router.get('/',userController.getUsers)

router.put('/:userId',userController.updateUser)
router.delete('/:userId',userController.deleteSingleUser)

export const userRouter=router