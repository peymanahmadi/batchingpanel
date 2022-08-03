import express from "express";
const router = express.Router();

import {
  getAllCustomers,
  createCustomer,
} from "../controllers/customersController.js";

router.route("/").get(getAllCustomers).post(createCustomer);

export default router;
