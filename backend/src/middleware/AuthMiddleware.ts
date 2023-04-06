import dotenv from "dotenv";
dotenv.config();
import { env } from "../validate/validation";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";
import { NextFunction, Response, Request } from "express";

interface JwtPayload {
  _id: string;
}

interface GetUserAuthInfoRequest extends Request {
  user: any;
}

const requireAuth = async (
  req: GetUserAuthInfoRequest,
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
    const { _id } = jwt.verify(token, env.SECRET) as JwtPayload;

    req.user = await UserModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
