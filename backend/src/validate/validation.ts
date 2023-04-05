import { cleanEnv, port, str } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: port(),
  MONGO_STRING: str(),
  SECRET: str(),
});
