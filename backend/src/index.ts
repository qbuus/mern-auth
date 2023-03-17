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

// env's
const SERVER_PORT = env.PORT || 8000;

// express app
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "welcome to the app" });
});

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
app.listen(SERVER_PORT, () => {
  console.log(`listening to ${SERVER_PORT}`);
});
