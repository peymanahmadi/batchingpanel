import express from "express";
const routes = express.Router();

import { register } from "../controllers/authController.js";

routes.route("/register").post(register);

export default routes;
