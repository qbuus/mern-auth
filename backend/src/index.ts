import dotenv from "dotenv";
dotenv.config();
import express, {
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import { env } from "./validate/validation";
import workoutRoutes from "./routes/workoutRoutes";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import { RequireAuth } from "./middleware/RequireAuth";

// env's
const SERVER_PORT = env.PORT || 8010;
const MONGO_CONNECTION = env.MONGO_STRING;

// express app
const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/", userRoutes);
app.use("/", RequireAuth, workoutRoutes);

// error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(401, "Endpoint not found"));
});

app.use(
  (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let status = 500;
    let msg = "an error occured";
    if (isHttpError(error)) {
      status = error.status;
      msg = error.message;
    }
    res.status(status).json({ error: msg });
  }
);

//express listen for requests
mongoose
  .connect(MONGO_CONNECTION)
  .then(() => {
    console.log("mongoose connected");
    app.listen(SERVER_PORT, () => {
      console.log(`listening to ${SERVER_PORT}`);
    });
  })
  .catch(console.error);
