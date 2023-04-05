import dotenv from "dotenv";
dotenv.config();
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from "../models/user";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import { env } from "../validate/validation";
import mongoose from "mongoose";

interface UserId {
  _id: mongoose.Types.ObjectId;
}

const tokenCreate = (_id: UserId) => {
  return jwt.sign({ _id }, env.SECRET, { expiresIn: "3d" });
};

type SignUpBody = {
  email: string;
  password: string;
};

type loginType = {
  email: string;
  password: string;
};

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async function (req, res, next) {
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    // validation
    if (!email || !passwordRaw) {
      createHttpError(400, "missing some required parameters");
    }

    const existingEmail = await userModel
      .findOne({
        email,
      })
      .exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        "this email address already in use"
      );
    }

    const hashedPassword = await bcrypt.hash(passwordRaw, 10);

    const newUser = await userModel.create({
      email: email,
      password: hashedPassword,
    });

    // token creation
    const token = tokenCreate(newUser._id);

    res.status(201).json({ email, token });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  loginType,
  unknown
> = async (req, res, next) => {
  res.json({ msg: "login" });
};
