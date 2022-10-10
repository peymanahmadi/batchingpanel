import express, { Router } from "express";
const routes = express.Router();

import {
  register,
  login,
  updateUser,
  getUsersByCustomerID,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

routes.route("/register").post(authenticateUser, register);
routes.route("/login").post(login);
routes.route("/updateuser").patch(authenticateUser, updateUser);
routes.route("/users").post(authenticateUser, getUsersByCustomerID);
routes.route("/verify-email").post(verifyEmail);
routes.route("/reset-password").post(resetPassword);
routes.route("/forgot-password").post(forgotPassword);

export default routes;
