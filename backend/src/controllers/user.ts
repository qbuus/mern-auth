import dotenv from "dotenv";
dotenv.config();
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from "../models/user";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { env } from "../validate/validation";
import mongoose from "mongoose";

interface UserId {
  _id: mongoose.Types.ObjectId;
}

const tokenCreate = (_id: UserId) => {
  return sign({ _id }, env.SECRET, { expiresIn: "3d" });
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
      throw createHttpError(
        400,
        "missing some required parameters"
      );
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

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  loginType,
  unknown
> = async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email || !password) {
      throw createHttpError(400, "invalid parameters");
    }

    const existingUser = await userModel
      .findOne({ email: email })
      .select("+password")
      .exec();

    if (!existingUser) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordMatch) {
      throw createHttpError(401, "bad password");
    }

    const token = tokenCreate(existingUser._id);

    res.status(201).json({ email, token });
  } catch (error) {
    next(error);
  }
};
