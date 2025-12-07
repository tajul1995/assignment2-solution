import { Request, Response } from "express"
import { authService } from "./auth.service"

const creatUser=async(req:Request,res:Response)=>{
    

    try {
        
        const result=await authService.userSignUp(req.body)
        
        
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
const userSignin=async(req:Request,res:Response)=>{

    const {email,password}=req.body
     try {
          
          const result= await authService.userSignin(email,password)
           console.log(result);
          
          res.status(200).json({
            success:true,
            message:'Login successful',
            data:result
          })
        } catch (error:any) {
          res.status(500).json({
            success:false,
            message:error.message
        })
        }
}
export const authController={
    creatUser,
    userSignin
}