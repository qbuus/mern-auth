import { RequestHandler } from "express";
import mongoose from "mongoose";

export const getWorkouts: RequestHandler = (req, res, next) => {
  res.json({ message: "all workouts" });
  next();
};
