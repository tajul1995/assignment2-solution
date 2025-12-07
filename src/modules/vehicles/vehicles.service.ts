import { Request } from "express";
import { pool } from "../../config/db"


const creatVechiles=async(payload:Record<string,unknown>)=>{
     const {vehicle_name,type,registration_number,daily_rent_price,availability_status}=payload
      
    const result=await pool.query(`INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,[vehicle_name,type,registration_number,daily_rent_price,availability_status])
    return result
}
const getVehicles=async()=>{
     const result=await pool.query(`SELECT * from vehicles`)
     return result
}

const getSingleVehicles=async(req:Request)=>{
    const{vehicleId}=req.params
    const result= await pool.query(`SELECT * FROM vehicles WHERE id = $1`,[vehicleId])
    return result
}
const updateVehicles=async(req:Request)=>{
     const {vehicle_name,type,registration_number,daily_rent_price,availability_status}=req.body
   
    // console.log("body",req.body);
    
     const{vehicleId}=req.params
    //  console.log(vehicleId);
     
     
    const result=await pool.query(`UPDATE vehicles SET vehicle_name=$1, type=$2 , registration_number=$3 , daily_rent_price=$4, availability_status=$5  WHERE id=$6 RETURNING *`,[vehicle_name,type,registration_number,daily_rent_price,availability_status,vehicleId])
    return result
}
const deleteVehicles=async(req:Request)=>{
     const{vehicleId}=req.params
      const result= await pool.query(`DELETE FROM vehicles WHERE id = $1`,[vehicleId])
      return result
}
export const vehiclesService={
    creatVechiles,
    getVehicles,
    updateVehicles,
    getSingleVehicles,
    deleteVehicles
}