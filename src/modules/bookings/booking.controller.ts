import { Request, Response } from "express"
import { bookingService } from "./booking.service"
import { pool } from "../../config/db"

const creatBooking=async(req:Request,res:Response)=>{
    

    try {
        
        const result=await bookingService.creatBooking(req)
        res.status(201).json({
            success:true,
            message:"Vehicle created successfully",
            data:result.rows[0]
        })
    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:"wrong input for creat vehicles",
            data:error.message
        })
        
    }

}
const getAllBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.getAllBookings(); 

        if (result.rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No booking found",
                data: []
            });
        }

        
        const bookingsDetails = [];

        for (const booking of result.rows) {
            const customer = await pool.query(
                "SELECT name, email FROM users WHERE id=$1",
                [booking.customer_id]
            );

            const vehicle = await pool.query(
                "SELECT vehicle_name, registration_number FROM vehicles WHERE id=$1",
                [booking.vehicle_id]
            );

            bookingsDetails.push({
                ...booking,
                customer: customer.rows[0] ,
                vehicle: vehicle.rows[0] 
            });
        }

        return res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: bookingsDetails
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Error fetching bookings",
            error: error.message
        });
    }
};
const updateBooking=async(req:Request,res:Response)=>{
    const{name,password,phone,role}=req.body
    const{userId}=req.params
    
    
    try {
        
        const result=await bookingService.updateBooking(req)

         if(result.rows.length ===0){
            res.status(404).json({
            success:false,
            message:'invalied input'
        })
         

        }
        const bookingsDetails = [];
         for (const booking of result.rows) {
            

            const vehicle = await pool.query(
                "SELECT availability_status FROM vehicles WHERE id=$1",
                [booking.vehicle_id]
            );

            bookingsDetails.push({
                ...booking,
                 
                vehicle: vehicle.rows[0] 
            });

        }
        
        
        return res.status(200).json({
            success: true,
            message: "Booking marked as returned. Vehicle is now available",
            data:{...bookingsDetails}
        });
        
    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:"wrong input for update user",
            data:error.message
        })
        
    }
}
export const bookingController={
    creatBooking,
    getAllBookings,
    updateBooking
}