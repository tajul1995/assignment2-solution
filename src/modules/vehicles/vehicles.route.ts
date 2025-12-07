import {  Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../midalware/auth";
const router=Router()
// admin
router.post('/',auth("admin") ,vehiclesController.creatVechiles)

router.get('/',vehiclesController.getVechiles)
router.get('/:vehicleId',vehiclesController.getSingleVehicles)
router.put('/:vehicleId',auth("admin"),vehiclesController.updateVehicles)
router.delete('/:vehicleId',auth("admin"), vehiclesController.deletedVehicles)

export const vehiclesRouter=router