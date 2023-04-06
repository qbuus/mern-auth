import { RequestHandler } from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import workoutModel from "../models/workout";

export const getWorkouts: RequestHandler = async (
  req,
  res,
  next
) => {
  const user_id = req.user._id;

  try {
    const allWorkouts = await workoutModel
      .find({ user_id })
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
      throw createHttpError(400, "no such workout");
    }

    const findWorkoutById = await workoutModel.findById({
      _id: id,
    });

    if (!findWorkoutById) {
      throw createHttpError(
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

  let empty = [];

  if (!title) {
    empty.push("title");
  }
  if (!load) {
    empty.push("load");
  }
  if (!reps) {
    empty.push("reps");
  }
  if (empty.length > 0) {
    return res.status(400).json({
      error: "Fill in all the required fields",
      empty,
    });
  }

  try {
    if (!title || !reps || !load) {
      throw createHttpError(
        400,
        "Must have all the required informations"
      );
    }

    const user_id = req.user._id;

    const newWorkout = await workoutModel.create({
      title: title,
      reps: reps,
      load: load,
      user_id,
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
      throw createHttpError(400, "no such workout");
    }

    const workout = await workoutModel
      .findOne({
        _id: id,
      })
      .exec();

    if (!workout) {
      throw createHttpError(400, "no workout found");
    }

    await workoutModel.deleteOne({ _id: workout });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    next(error);
  }
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
      throw createHttpError(400, "id not valid");
    }

    const workout = await workoutModel.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!workout) {
      throw createHttpError(400, "no workout found");
    }

    res.status(200).json(workout);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
