import dotenv from 'dotenv'
import Path from 'path'


dotenv.config({path:Path.join(process.cwd(),'.env')})
export const config={
    connecting_str:process.env.CONNECTING_STR,
    port:process.env.PORT,
    jwt_secret:process.env.JWT_SECRET
}
