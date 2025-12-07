import { NextFunction, Request, Response } from "express";
import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { config } from "../config";

const auth=(...roles:string[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const token= req.headers.authorization
            if(!token){
         res.status(401).json({
          success: false,
          message: "Missing or invalid authentication token",
        })
            }
            
            const decoded=jwt.verify(token!,config.jwt_secret as string) as JwtPayload
            // console.log("decoded",decoded);
            req.user=decoded
            if(roles.length && !roles.includes(decoded.role)){
                 res.status(500).json({
                    success:false,
                    message:"unauthorized access"
                })
            }
            next()

        } catch (error:any) {
            res.status(400).json({
                success:false,
                message:'Validation errors, invalid input',
                data:error.message
            })
        }


    }
}
export default auth

