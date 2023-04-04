import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from "../models/user";

type signupType = {
  username?: string;
  password?: string;
  email?: string;
};

type loginType = {
  username?: string;
  password?: string;
};

export const login: RequestHandler<
  unknown,
  unknown,
  signupType,
  unknown
> = async (req, res, next) => {
  res.json({ msg: "login" });
};

export const signup: RequestHandler<
  unknown,
  unknown,
  loginType,
  unknown
> = async (req, res, next) => {
  res.json({ msg: "singup" });
};
