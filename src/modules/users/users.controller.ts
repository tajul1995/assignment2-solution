import { Request, Response } from "express";


import { userService } from "./users.service";
const creatUser=async(req:Request,res:Response)=>{
    

    try {
        
        const result=await userService.creatUser(req.body)
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            data:result.rows[0]
        })
    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:"wrong input for creat user",
            data:error.message
        })
        
    }

}

const getUsers=async(req:Request,res:Response)=>{
    try {
        
        const result=await userService.getUser()
        res.status(201).json({
            success:true,
            message:"Users retrieved successfully",
            data:result.rows
        })
    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:"wrong input for get user",
            data:error.message
        })
        
    }
}

const updateUser=async(req:Request,res:Response)=>{
    const{name,password,phone,role}=req.body
    const{userId}=req.params
    
    
    try {
        
        const result=await userService.updateUser(req)

         if(result.rows.length ===0){
            res.status(404).json({
            success:false,
            message:'invalied input'
        })
        }
        else{
            res.status(201).json({
            success:true,
            message:"update users successfully",
            data:result.rows[0]
        })
    }
        
    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:"wrong input for update user",
            data:error.message
        })
        
    }
}

export  const userController={
    creatUser,
    getUsers,
    updateUser,
}