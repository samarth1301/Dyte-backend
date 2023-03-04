import { Router } from "express";
import { createCourse, getCourse } from "../../controllers/Course";
const router = Router();

router.get("/:courseID",  getCourse);

export default router;