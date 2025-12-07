import {  Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../midalware/auth";
const router=Router()
router.post('/',bookingController.creatBooking)
router.get('/',bookingController.getAllBookings)
router.put('/:bookingId',bookingController.updateBooking)

export const bookingRouter=router