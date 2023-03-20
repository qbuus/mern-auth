import { RequestHandler } from "express";
import mongoose from "mongoose";
import createHttpError, { CreateHttpError } from "http-errors";
import workoutModel from "../models/workout";

export const getWorkouts: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const allWorkouts = await workoutModel
      .find({})
      .sort({ createdAt: -1 });

    res.status(201).json(allWorkouts);
  } catch (error) {
    console.error(error);
    next();
  }
};

export const getSingleWorkouts: RequestHandler = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    const findWorkoutById = await workoutModel.findById({
      _id: id,
    });

    if (!findWorkoutById) {
      createHttpError(
        404,
        "Workout with this id does not exist"
      );
    }
    res.json(findWorkoutById);
  } catch (error) {
    console.error(error);
    next();
  }
};

interface createWorkout {
  title: string;
  reps: number;
  load: number;
}

export const postWorkouts: RequestHandler<
  unknown,
  unknown,
  createWorkout,
  unknown
> = async (req, res, next) => {
  const { title, reps, load } = req.body;

  try {
    if (!title || !reps || !load) {
      createHttpError(
        400,
        "Must have all the required informations"
      );
    }

    const newWorkout = await workoutModel.create({
      title: title,
      reps: reps,
      load: load,
    });
    res.status(201).json(newWorkout);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteWorkouts: RequestHandler = async (
  req,
  res,
  next
) => {
  res.json({ mesg: "delete workout" });
};

export const updateWorkouts: RequestHandler = async (
  req,
  res,
  next
) => {
  res.json({ mesg: "update workout" });
};
