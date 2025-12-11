import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";


const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Missing or invalid authentication token",
        });
      }

      
      if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      const decoded = jwt.verify(
        token as string,
        config.jwt_secret as string
      ) as JwtPayload;

    
      (req as any).user = decoded;

      
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      return next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "Validation errors, invalid input",
        data: error.message,
      });
    }
  };
};

export default auth;
