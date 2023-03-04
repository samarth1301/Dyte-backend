import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());

import adminRoutes from "./routers/Admin";
import facultyRoutes from "./routers/Faculty";
import slotRoutes from "./routers/Slots";
import courseRoutes from "./routers/Course";
import studentRoutes from "./routers/Student";
import { AuthenticationError } from "./config/utils/errorhandler";
import { studentMiddleware } from "./middleware";
import { studentRegister, studentTimetable } from "./controllers/Student";

// app.use("/booking", bookingRouter);
// app.use("/station", stationRouter);
// app.use("/vehicle", vehicleRouter);
// app.use("/user", userRouter);
app.use('/faculty',facultyRoutes);
app.use('/slot',slotRoutes);
app.use('/course',courseRoutes);
app.use("/admin",adminRoutes);
app.use("/student",studentRoutes);
app.post("/register",studentMiddleware,studentRegister);
app.get("/timetable",studentMiddleware,studentTimetable);

export default app;
