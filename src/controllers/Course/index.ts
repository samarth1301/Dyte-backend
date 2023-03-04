import { Request, Response } from "express";
import { Op, where } from "sequelize";
import { sequelize } from "../../config/db";
import errorHandler, {
    BadRequestError,
    NotFoundError,
  } from "../../config/utils/errorhandler";
import Course, { CourseInput } from "../../models/Course";
import Faculty, { FacultyInput } from "../../models/Faculty";
import Slots from "../../models/Slots";
export const createCourse = async (req: Request, res: Response) => {
    try {
        req.body.faculties = req.body.faculty_ids; 
        req.body.allowed_slots = req.body.slot_ids;
      const payload = req.body as CourseInput
     
      const course = await Course.create(payload);
      // course?.faculties.map(async(e)=>{
      //   Faculty.findByPk(e).then(faculty=>{
      //     faculty?.course?.push(String(course.id));
      //     Faculty.update({
      //       course: faculty?.course
      //     },{
      //       where:{
      //         id: faculty?.id
      //       }
      //     })
      //   })
      // })
      return res.status(201).send(course);
    } catch (e) {
      console.log(e);
      return errorHandler(e, req, res);
    }
  };
  export const getCourse =async (req:Request , res: Response) => {
    try {
        const {courseID} = req.params;
        console.log(courseID);
        let course = await Course.findByPk(courseID);
        if (!course) throw new NotFoundError();
        
          var {faculties,allowed_slots} = course;
 
        const facultiesArray = await Promise.all(faculties?.map(async(e)=> await Faculty.findByPk(e)));
        console.log(facultiesArray);
        const slotsArray = await Promise.all(allowed_slots?.map(async(e)=> await Slots.findByPk(e)));
        const result = await Course.findByPk(courseID);
      
    return res.status(200).send({...result?.dataValues, faculty_ids: facultiesArray, slot_ids: slotsArray});
    } catch (error) {
      return errorHandler(error, req, res);
    }
  }