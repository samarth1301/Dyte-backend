import { Router } from "express";
import { adminLogin, createStudent } from "../../controllers/Admin";
import { createCourse } from "../../controllers/Course";
import {createFaculty, getFacultyProfile} from "../../controllers/Faculty";
import { createSlot } from "../../controllers/Slot";
import { adminMiddleware } from "../../middleware";
const router = Router();

router.post("/login", adminLogin);

router.post("/faculty",adminMiddleware, createFaculty);
router.post("/course",adminMiddleware, createCourse);
router.post("/slot",adminMiddleware, createSlot);
router.post("/student",adminMiddleware,createStudent);
export default router;