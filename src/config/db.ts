import {Pool} from "pg"
import { config } from "."
 export const pool=new Pool({
    connectionString:`${config.connecting_str}`
})
const initDb=async()=>{
   await pool.query(`
         CREATE TABLE IF NOT EXISTS users(
         id SERIAL PRIMARY KEY,
         customer_id SERIAL UNIQUE,
         name VARCHAR(200) NOT NULL,
         email VARCHAR(150) UNIQUE NOT NULL,
         password TEXT CHECK (LENGTH(password) >= 6),
         phone VARCHAR(30) NOT NULL,
         role VARCHAR(20) NOT NULL DEFAULT 'customer' CHECK (role IN ('admin','customer')),
         created_at TIMESTAMP DEFAULT NOW())`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles(
    id SERIAL PRIMARY KEY,
    vehicle_id SERIAL UNIQUE,
    vehicle_name VARCHAR(200) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK(type IN ('car', 'bike', 'van', 'suv')),
    registration_number VARCHAR(150) NOT NULL UNIQUE,
    daily_rent_price NUMERIC(12,2) NOT NULL CHECK(daily_rent_price > 0),
    availability_status VARCHAR(20) NOT NULL DEFAULT 'available',
    CHECK (availability_status IN ('available','booked')),
    created_at TIMESTAMP DEFAULT NOW()) `);
        
         
    await pool.query(`
      
      CREATE TABLE IF NOT EXISTS bookings(
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
    rent_start_date DATE NOT NULL CHECK (rent_start_date >= CURRENT_DATE),
    rent_end_date DATE NOT NULL CHECK (rent_end_date >= rent_start_date),
    total_price NUMERIC(12,2) NOT NULL CHECK (total_price >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'active'
   CHECK (status IN ('active','cancelled','returned')),  
    created_at TIMESTAMP DEFAULT NOW())`)}

      
      
      
      
      

           
       

        
    export default initDb    
        
        
        
        
        
        
        
        
        
        
        
        
        
        
       
         
         
         
         
        
        
