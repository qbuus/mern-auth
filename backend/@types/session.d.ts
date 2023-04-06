import user from "../src/models/user";

declare global {
  module Express {
    interface Request {
      user: any;
    }
  }
}
