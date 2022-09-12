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
import {
  createBatching,
  materialConsumption,
  getDailyBatching,
  productionTolerance,
} from "../controllers/batchingsController.js";
import {
  createWarehouse,
  createWarehouseOpDesc,
  transactionInventory,
  getAllInventory,
} from "../controllers/warehousesController.js";

router.route("/").get(getAllCustomers).post(createCustomer);

router.route("/materials").post(createMaterial);
router.route("/materials/all").post(getAllMaterials);

router.route("/formulas").post(createFormula);

router.route("/batching").post(createBatching);
router.route("/batching/materialconsumption").post(materialConsumption);
router.route("/batching/daily").post(getDailyBatching);
router.route("/batching/tolerance").post(productionTolerance);

router.route("/warehouses").post(createWarehouse);
router.route("/warehouses/opdesc").post(createWarehouseOpDesc);

router.route("/inventory").post(transactionInventory);
router.route("/inventory/all").post(getAllInventory);

export default router;
