import express from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/user.controller.js";
const router = express.Router();

/* User authentication related Routes */
router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

export default router;
