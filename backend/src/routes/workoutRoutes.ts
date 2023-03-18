import express from "express";
import * as workoutController from "../controllers/workouts";

const router = express.Router();

router.get("/api/workouts", workoutController.getWorkouts);

router.get(
  "/api/workouts/:id",
  workoutController.getSingleWorkouts
);

router.post("/api/workouts", workoutController.postWorkouts);

router.delete(
  "/api/workouts/:id",
  workoutController.deleteWorkouts
);

router.patch(
  "/api/workouts/:id",
  workoutController.updateWorkouts
);

export default router;
