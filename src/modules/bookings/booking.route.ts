import {  Router } from "express";
import { bookingController } from "./booking.controller";
const router=Router()
router.post('/',bookingController.creatBooking)
router.get('/',bookingController.getAllBookings)
router.put('/:bookingId',bookingController.updateBooking)

export const bookingRouter=router