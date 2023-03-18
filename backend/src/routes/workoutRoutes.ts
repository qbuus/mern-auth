import express from "express";
import * as workoutController from "../controllers/workouts";

const router = express.Router();

router.get("/api/workouts", workoutController.getWorkouts);

export default router;
