import express from "express";
import * as userController from "../controllers/user";

const router = express.Router();

router.post("/login", userController.login);

router.post("/signup", userController.signup);

export default router;
