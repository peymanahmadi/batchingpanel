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
  getFormulaByID,
  updateFormula,
} from "../controllers/formulasController.js";

// Batchings
import {
  createBatching,
  materialConsumption,
  getDailyBatching,
  materialTolerance,
  formulaTolerance,
} from "../controllers/batchingsController.js";

// Warehouse
import {
  createWarehouse,
  getAllWarehouses,
  updateWarehouse,
  deleteWarehouse,
  createWarehouseOpDesc,
  getAllInventory,
  warehouseOperations,
  getWarehouseOperations,
} from "../controllers/warehousesController.js";

import { getReportMaterialConsumptionByFormulaAndDate } from "../controllers/reportsController.js";

// Customers
router.route("/").get(getAllCustomers).post(createCustomer);

// Materials
router.route("/materials").post(createMaterial);
router.route("/materials").patch(updateMaterial);
router.route("/materials").delete(deleteMaterial);
router.route("/materials/all").post(getAllMaterials);

// Formulas
router.route("/formulas").post(createFormula);
router.route("/formulas").patch(updateFormula);
router.route("/formulas").delete(deleteFormula);
router.route("/formulas/all").post(getAllFormulas);
router.route("/formulas/id").post(getFormulaByID);

// Batchings
router.route("/batching").post(createBatching);
router.route("/batching/materialconsumption").post(materialConsumption);
router.route("/batching/daily").post(getDailyBatching);
router.route("/batching/tolerance").post(materialTolerance);
router.route("/batching/formulatolerance").post(formulaTolerance);

// Warehouses
router.route("/warehouses").post(createWarehouse);
router.route("/warehouses").patch(updateWarehouse);
router.route("/warehouses").delete(deleteWarehouse);
router.route("/warehouses/all").post(getAllWarehouses);
router.route("/warehouses/opdesc").post(createWarehouseOpDesc);
router.route("/warehouses-operations/ops").post(warehouseOperations);
router.route("/inventory/all").post(getAllInventory);
router.route("/warehouses-operations/get").post(getWarehouseOperations);

// Reports
router
  .route("/reports/materialconsumption")
  .post(getReportMaterialConsumptionByFormulaAndDate);

export default router;
