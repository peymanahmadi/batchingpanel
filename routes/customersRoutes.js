import express from "express";
const router = express.Router();

// Customers
import {
  getAllCustomers,
  createCustomer,
} from "../controllers/customersController.js";

// Materials
import {
  createMaterial,
  getAllMaterials,
} from "../controllers/materialsController.js";

// Formulas
import { createFormula } from "../controllers/formulasController.js";

// Batchings
import {
  createBatching,
  materialConsumption,
  getDailyBatching,
  materialTolerance,
} from "../controllers/batchingsController.js";

// Warehouse
import {
  createWarehouse,
  createWarehouseOpDesc,
  transactionInventory,
  getAllInventory,
} from "../controllers/warehousesController.js";


// Customers
router.route("/").get(getAllCustomers).post(createCustomer);

// Materials
router.route("/materials").post(createMaterial);
router.route("/materials/all").post(getAllMaterials);

// Formulas
router.route("/formulas").post(createFormula);

// Batchings
router.route("/batching").post(createBatching);
router.route("/batching/materialconsumption").post(materialConsumption);
router.route("/batching/daily").post(getDailyBatching);
router.route("/batching/tolerance").post(materialTolerance);

// Warehouses
router.route("/warehouses").post(createWarehouse);
router.route("/warehouses/opdesc").post(createWarehouseOpDesc);
router.route("/inventory").post(transactionInventory);
router.route("/inventory/all").post(getAllInventory);

export default router;
