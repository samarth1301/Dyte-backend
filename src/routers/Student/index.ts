import { Router } from "express";
import {createFaculty, getFacultyProfile} from "../../controllers/Faculty";
import { studentLogin, studentRegister } from "../../controllers/Student";
import { studentMiddleware } from "../../middleware";

const router = Router();

router.post("/login",studentLogin);
export default router;