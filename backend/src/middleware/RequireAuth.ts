import dotenv from "dotenv";
dotenv.config();
import { env } from "../validate/validation";
import { verify } from "jsonwebtoken";
import UserModel from "../models/user";
import { NextFunction, Response, Request } from "express";

const Secret = env.SECRET;

export const RequireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = verify(token, Secret) as any;

    req.user = await UserModel.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};
