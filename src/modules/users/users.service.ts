import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import { Request } from "express";
interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    phone: string;
    role?: 'admin' | 'customer';  
}
const creatUser=async(payload:CreateUserInput)=>{
     const{name,email,password,phone,role}=payload
       const hashPassword=await bcrypt.hash(password as string,10)
      
    const result=await pool.query(`INSERT INTO users(name, email,password,phone,role) VALUES($1, $2, $3, $4, $5) RETURNING *`,[name,email.toLowerCase() ,hashPassword,phone,role])
    return result
}
const getUser=async()=>{
     const result=await pool.query(`SELECT * from users`)
     return result
}

const updateUser=async(req:Request)=>{
    const{name,password,phone,role}=req.body
    const{userId}=req.params
    const result=await pool.query(`UPDATE users SET name=$1  , password=$2 , phone=$3 , role=$4 WHERE id=$5 RETURNING *`,[name,password,phone,role,userId])
    return result
}


export const userService={
    creatUser,
    getUser,
    updateUser
}