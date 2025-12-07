import { Request, Response } from "express"
import { vehiclesService } from "./vehicles.service"
import { pool } from "../../config/db"

const creatVechiles=async(req:Request,res:Response)=>{
    

    try {
        
        const result=await vehiclesService.creatVechiles(req.body)
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
const getVechiles=async(req:Request,res:Response)=>{
    try {
        
        const result=await vehiclesService.getVehicles()
        if(result.rows.length===0){
            res.status(200).json({
                "success": true,
                "message": "No vehicles found",
                "data": result.rows
  
            })
             }
        
                res.status(201).json({
            success:true,
            message:"Vehicles retrieved successfully",
            data:result.rows
        })
           
        
    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:"wrong input for get vehicles",
            data:error.message
        })
        
    }
}

const getSingleVehicles=async(req:Request,res:Response)=>{
    try {
        const result= await vehiclesService.getSingleVehicles(req)



        if(result.rows.length ===0){
            res.status(404).json({
            success:false,
            message:'invalied input'
        })
        }
        else{
            res.status(201).json({
        success:true,
        message:"Vehicle retrieved successfully",
        data:result.rows[0]

    })
        }
         

    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:error.message
        })
    }
}
const updateVehicles=async(req:Request,res:Response)=>{
    // const {vehicle_name,type,registration_number,daily_rent_price,availability_status,vehicle_id}=req.body
    try {
        const result= await vehiclesService.updateVehicles(req)
        console.log(result.rows[0]);
        


        if(result.rows.length ===0){
            res.status(404).json({
            success:false,
            message:'invalied input'
        })
        }
        else{
            res.status(201).json({
        success:true,
        message:"Vehicle updated successfully",
        data:result?.rows[0]

    })
        }
    
        
        
         

    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:error.message
        })
    }
}
const deletedVehicles=async(req:Request,res:Response)=>{
    // const {vehicleId}=req.params
    const vehicleId=1
    try {
        const result= await vehiclesService.deleteVehicles(req)

        const findBooking=await pool.query(`SELECT status FROM bookings WHERE id = $1`,[vehicleId])

        console.log(findBooking);
        
        if(result.rowCount ===0){
            res.status(404).json({
            success:false,
            message:'invalied input'
        })
        }
        else{
         res.status(200).json({
        success:true,
        message:"Vehicle deleted successfully",
        

    })
        }
        
            
        
        
            
        
         

    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:error.message
        })
    }
}
export const vehiclesController={
    creatVechiles,
    getVechiles,
    updateVehicles,
    getSingleVehicles,
    deletedVehicles
}