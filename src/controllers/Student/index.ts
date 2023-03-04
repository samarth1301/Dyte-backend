import { Request, Response } from "express";
import { Op } from "sequelize";
import errorHandler, {
    BadRequestError,
    NotFoundError,
  } from "../../config/utils/errorhandler";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config/utils/constants";
import Student, { StudentInput } from "../../models/Student";
import Course from "../../models/Course";
import Slot from "../../models/Slots";
  export const studentLogin = async (req: Request, res: Response) => {
    try {
       const {id,password} = req.body;
       const student = await Student.findByPk(id);
       if(!student) throw new NotFoundError();
       console.log(student);
       
       if( password===student?.password){
            const token  = jwt.sign({id : student.id},jwtSecret);
           return res.status(201).send({message:"Login Successfull", token});
       }
       throw new Error("Invalid Credentials");
      
    } catch (e) {
      console.log(e);
      return errorHandler(e, req, res);
    }
  };
  export const studentRegister = async (req: Request, res: Response) => {
    try {
        console.log(req.body.user); 

        const course = await Course.findByPk(req.body.course_id);

        // if(req.body.slot_ids?.every( id => (return course?.allowed_slots.indexOf(id)!== -1)))

        let student = await Student.findByPk(req.body.user)
        var tempArr: any[] | undefined = [];
            if(student?.registered_courses && student?.registered_courses?.length>0){
                tempArr = student.registered_courses;
                tempArr.push({course: req.body.course_id, slots: req.body.slot_ids})
            }
            else{
                tempArr = [{course: req.body.course_id, slots: req.body.slot_ids}];
            }

            await Student.update({registered_courses:tempArr},{where:{id:req.body.user}});
            tempArr = [];
            if(student?.registered_courses){

                const result = await Promise.all(student?.registered_courses?.map(async (el)=>{
                    const course = await Course.findByPk(el?.course);
                    const slots= await Promise.all(el?.slots?.map(async(e)=>(
                        await Slot.findByPk(e)
                    )));
                        
                        return ({course, slots});
                }))
                return res.status(201).send({success:true, data: {...student?.dataValues, registered_courses: result}})
            }
            
            throw new BadRequestError();
          
    
     
    } catch (e) {
      console.log(e);
      return errorHandler(e, req, res);
    }
  };

  
  export const studentTimetable = async (req: Request, res: Response) => {
    try {
       
        let student = await Student.findByPk(req.body.user)
            if(student?.registered_courses){

                const result = await Promise.all(student?.registered_courses?.map(async (el)=>{
                    const course = await Course.findByPk(el?.course);
                    const slots= await Promise.all(el?.slots?.map(async(e)=>(
                        await Slot.findByPk(e)
                    )));
                        // tempArr.push({course, slots});
                        return ({course, slots});
                }))
                return res.status(201).send({success:true, data: {...student?.dataValues, registered_courses: result}})
            }
            
            throw new BadRequestError();
          
    
     
    } catch (e) {
      console.log(e);
      return errorHandler(e, req, res);
    }
  };

  