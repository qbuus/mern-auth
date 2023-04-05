import express from "express";
import * as userController from "../controllers/user";

const router = express.Router();

router.post("/api/user/login", userController.login);

router.post("/api/user/signup", userController.signUp);

export default router;
