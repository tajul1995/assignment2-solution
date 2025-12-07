import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import { config } from "../../config";
import jwt from "jsonwebtoken"
interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    phone: string;
    role?: 'admin' | 'customer';  
}
const userSignUp=async(payload:CreateUserInput)=>{
     const{name,email,password,phone,role}=payload
       const hashPassword=await bcrypt.hash(password as string,10)
      
    const result=await pool.query(`INSERT INTO users(name, email,password,phone,role) VALUES($1, $2, $3, $4, $5) RETURNING id,name,email,phone,role`,[name,email.toLowerCase() ,hashPassword,phone,role])
    
    return result
}
const userSignin=async(email:string,password:string)=>{
    const result= await pool.query(`SELECT id,name,email,phone,role FROM users WHERE email=$1`,[email])
    if(result.rows.length ===0){
        return null
    }
    const user= result.rows[0]
    
    if(password.length < 6){
        return {
            message:'more than 6 character reqiured'
        }
    }
    const secret=config.jwt_secret
    console.log(secret);
    
    const token=jwt.sign({name:user.name,email:user.email,role:user.role},secret as string,{
        expiresIn:"20d"
    })
    return {
        token,
        user
    }
}

export const authService={
    userSignUp,
    userSignin
}