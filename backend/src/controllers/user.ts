import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from "../models/user";
import bcrypt from "bcrypt";

interface SignUpBody {
  email: string;
  password: string;
}

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
    if (!email || !passwordRaw) {
      createHttpError(400, "missing some required parameters");
    }

    const existingEmail = await userModel
      .findOne({
        email: email,
      })
      .exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        "this email address already in use"
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordRaw, salt);

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
> = async (req, res, next) => {
  res.json({ msg: "singup" });
};
