import { Request, Response } from "express";
import { Op } from "sequelize";
import errorHandler, {
    BadRequestError,
    NotFoundError,
  } from "../../config/utils/errorhandler";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config/utils/constants";
import Student, { StudentInput } from "../../models/Student";
  export const adminLogin = async (req: Request, res: Response) => {
    try {
       const {username,password} = req.body;
       if(username==="admin" && password==="admin"){
            const token  = jwt.sign({username},jwtSecret);
           return res.status(201).send({message:"Login Successfull", token});
       }
       throw new BadRequestError();
      
    } catch (e) {
      console.log(e);
      return errorHandler(e, req, res);
    }
  };

  export const createStudent = async (req: Request, res: Response) => {
    try {
     
      const payload = req.body as StudentInput
     
      const student = await Student.create(payload);
      
      return res.status(201).send({success : true, data : {id : student.id, name: student.name}});
    } catch (e) {
      console.log(e);
      return errorHandler(e, req, res);
    }
  };