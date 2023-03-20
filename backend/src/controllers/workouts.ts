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
    if (!mongoose.isValidObjectId(id)) {
      createHttpError(400, "no such workout");
    }

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
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      createHttpError(400, "no such workout");
    }

    const workout = await workoutModel.findOneAndDelete({
      _id: id,
    });

    if (!workout) {
      createHttpError(400, "no workout found");
    }

    res.status(200).json(workout);
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.json({ mesg: "delete workout" });
};

interface workout {
  id: string;
}

interface update {
  title: string;
  reps: number;
  load: number;
}

export const updateWorkouts: RequestHandler<
  workout,
  unknown,
  update,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      createHttpError(400, "id not valid");
    }

    const workout = await workoutModel.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!workout) {
      createHttpError(400, "no workout found");
    }

    res.status(200).json(workout);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
