import {  Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../midalware/auth";
const router=Router()
// admin
router.post('/', vehiclesController.creatVechiles)

router.get('/',vehiclesController.getVechiles)
router.get('/:vehicleId',vehiclesController.getSingleVehicles)
router.put('/:vehicleId',vehiclesController.updateVehicles)
router.delete('/:vehicleId', vehiclesController.deletedVehicles)

export const vehiclesRouter=router