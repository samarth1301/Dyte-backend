import { Router } from "express";
import {createFaculty, getFacultyProfile} from "../../controllers/Faculty";
const router = Router();

router.get("/:facultyID",  getFacultyProfile);

export default router;