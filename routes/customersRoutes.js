import express from "express";
const router = express.Router();

import {
  getAllCustomers,
  createCustomer,
} from "../controllers/customersController.js";

import { createMaterial } from "../controllers/materialsController.js";

router.route("/").get(getAllCustomers).post(createCustomer);

router.route("/materials").post(createMaterial);

export default router;
