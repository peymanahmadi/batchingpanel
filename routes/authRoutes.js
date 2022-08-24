import express, { Router } from "express";
const routes = express.Router();

import { register, login, updateUser } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

routes.route("/register").post(register);
routes.route("/login").post(login);
routes.route("/updateuser").patch(authenticateUser, updateUser);

export default routes;
