import { Request } from "express"
import { pool } from "../../config/db"
import { getDays } from "../../utility/helper"


const creatBooking = async (req: Request) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

    
    const getVehicle = await pool.query(
        "SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id=$1",
        [vehicle_id]
    );

    if (getVehicle.rows[0]===0) {
        return {
            message:'vehicle not found'
        }
    }

    const selectedVehicle = getVehicle.rows[0];

    
   

    

    const days = getDays(rent_start_date, rent_end_date);
    


    const total_price = days * Number(selectedVehicle.daily_rent_price);

  
    const result = await pool.query(
        `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price)
         VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
    );

    

    return {
        ...result.rows[0],
        vehicle: {
            vehicle_name: selectedVehicle.vehicle_name,
            daily_rent_price: selectedVehicle.daily_rent_price
        }
    };
};
const getAllBookings=async()=>{
     const result=await pool.query(`SELECT * from bookings`)
     
     return result
}
const updateBooking=async(req:Request)=>{
    const{status}=req.body
    const {bookingId}=req.params
    // console.log(bookingId);
    
    
    const result=await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,[status,bookingId])
    // console.log(result);
    
    return result
}
export const  bookingService={
    creatBooking,
    getAllBookings,
    updateBooking
}