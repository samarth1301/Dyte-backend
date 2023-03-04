import { Request, Response } from "express";
import errorHandler, {
    BadRequestError,
    NotFoundError,
  } from "../../config/utils/errorhandler";
import Faculty, { FacultyInput } from "../../models/Faculty";

export const createFaculty = async (req: Request, res: Response) => {
    try {
      const payload = req.body as FacultyInput
     
      const faculty = await Faculty.create(payload);
      return res.status(200).send({ "success": true,
    "data": {
      "id": faculty.id,
      "name": faculty.name
    }});
    } catch (e) {
      console.log(e);
      return errorHandler(e, req, res);
    }
  };
  export const getFacultyProfile =async (req:Request , res: Response) => {
    try {
        const {facultyID} = req.params;
        const faculty = await Faculty.findByPk(facultyID);
        if (!faculty) throw new NotFoundError();
    return res.status(200).send({ "success": true,
    "data": {
      "id": faculty.id,
      "name": faculty.name
    }});
    } catch (error) {
      console.log(error);
      return errorHandler(error, req, res);
    }
  }