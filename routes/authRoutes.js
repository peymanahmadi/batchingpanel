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
  deleteUser,
  blockUser,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

routes.route("/register").post(authenticateUser, register);
routes.route("/login").post(login);
routes.route("/update-user").patch(authenticateUser, updateUser);
routes.route("/users").post(authenticateUser, getUsersByCustomerID);
routes.route("/verify-email").post(verifyEmail);
routes.route("/reset-password").post(resetPassword);
routes.route("/forgot-password").post(forgotPassword);
routes.route("/delete-user").post(authenticateUser, deleteUser);
routes.route("/block-user").post(authenticateUser, blockUser);

export default routes;
