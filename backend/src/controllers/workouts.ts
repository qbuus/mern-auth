import { RequestHandler } from "express";
import mongoose from "mongoose";

export const getWorkouts: RequestHandler = (req, res, next) => {
  res.json({ message: "all workouts" });
  next();
};

export const getSingleWorkouts: RequestHandler = (
  req,
  res,
  next
) => {
  res.json({ mesg: "single workout" });
};

export const postWorkouts: RequestHandler = (req, res, next) => {
  res.json({ mesg: "post workout" });
};

export const deleteWorkouts: RequestHandler = (
  req,
  res,
  next
) => {
  res.json({ mesg: "delete workout" });
};

export const updateWorkouts: RequestHandler = (
  req,
  res,
  next
) => {
  res.json({ mesg: "update workout" });
};
