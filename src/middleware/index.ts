import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import errorHandler, {
    BadRequestError,
    NotFoundError,
    AuthenticationError
  } from "../config/utils/errorhandler";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/utils/constants";
  interface JwtPayLoad {
    id: string;
  }
  interface userReq extends Request{
    user: any
  }
export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.header('Authorization');
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            if (token) {
                const decoded = jwt.verify(token,jwtSecret);
                    if(decoded) next();
                    else throw new AuthenticationError();
                }
                else throw new AuthenticationError();
         }
         else throw new AuthenticationError();
        
    } catch (e) {
      console.log(e);
      return errorHandler(e, req, res);
    }
  };

  
export const studentMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.header('Authorization');
        console.log(authHeader);
        
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            // console.log(token);
            if (token) {
                
                const decoded = jwt.verify(token,jwtSecret) as JwtPayLoad;
                    if(decoded){
                        req.body.user = decoded?.id;
                        next();  
                    } 
                    else throw new AuthenticationError();
                }
                else throw new AuthenticationError();
         }
         else throw new AuthenticationError();
        
    } catch (e) {
      console.log(e);
      return errorHandler(e, req, res);
    }
  };

  