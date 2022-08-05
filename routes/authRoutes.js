import express from "express";
const routes = express.Router();

import { register, login } from "../controllers/authController.js";

routes.route("/register").post(register);
routes.route("/login").post(login);

export default routes;
