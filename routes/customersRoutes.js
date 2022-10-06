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
  updateMaterial,
  getAllMaterials,
  deleteMaterial,
} from "../controllers/materialsController.js";

// Formulas
import {
  createFormula,
  getAllFormulas,
  deleteFormula,
} from "../controllers/formulasController.js";

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
  getAllWarehouses,
  createWarehouseOpDesc,
  transactionInventory,
  getAllInventory,
} from "../controllers/warehousesController.js";

// Customers
router.route("/").get(getAllCustomers).post(createCustomer);

// Materials
router.route("/materials").post(createMaterial);
router.route("/materials").patch(updateMaterial);
router.route("/materials").delete(deleteMaterial);
router.route("/materials/all").post(getAllMaterials);

// Formulas
router.route("/formulas").post(createFormula);
router.route("/formulas").delete(deleteFormula);
router.route("/formulas/all").post(getAllFormulas);

// Batchings
router.route("/batching").post(createBatching);
router.route("/batching/materialconsumption").post(materialConsumption);
router.route("/batching/daily").post(getDailyBatching);
router.route("/batching/tolerance").post(materialTolerance);

// Warehouses
router.route("/warehouses").post(createWarehouse);
router.route("/warehouses/all").post(getAllWarehouses);
router.route("/warehouses/opdesc").post(createWarehouseOpDesc);
router.route("/inventory").post(transactionInventory);
router.route("/inventory/all").post(getAllInventory);

export default router;
