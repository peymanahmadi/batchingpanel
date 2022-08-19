import express from "express";
const router = express.Router();

import {
  getAllCustomers,
  createCustomer,
} from "../controllers/customersController.js";
import {
  createMaterial,
  getAllMaterials,
} from "../controllers/materialsController.js";
import { createFormula } from "../controllers/formulasController.js";
import { createBatching } from "../controllers/batchingsController.js";

router.route("/").get(getAllCustomers).post(createCustomer);

router.route("/materials").post(createMaterial);
router.route("/materials/all").post(getAllMaterials);

router.route("/formulas").post(createFormula);

router.route("/batching").post(createBatching);

export default router;
