import mongoose from "mongoose";
import materialSchema from "../models/Material.js";
import formulaSchema from "../models/Formula.js";
import formulationSchema from "../models/Formulation.js";
import batchingSchema from "../models/Batching.js";
import warehouseSchema from "../models/Warehouse.js";
import warehouseOperationsSchema from "../models/WarehouseOperations.js";
import warehouseOpsDescSchema from "../models/WarehouseOpsDesc.js";
import dotenv from "dotenv";
dotenv.config();

const createTenantConnection = (dbName) => {
  dbName = `batching_${dbName}`;
  const conn = mongoose.createConnection(process.env.TENANT_MONGO_URI, {
    dbName,
  });
  conn.model("Material", materialSchema);
  conn.model("Formula", formulaSchema);
  conn.model("Formulation", formulationSchema);
  conn.model("Batching", batchingSchema);
  conn.model("Warehouse", warehouseSchema);
  conn.model("WarehouseOperations", warehouseOperationsSchema);
  conn.model("WarehouseOpsDesc", warehouseOpsDescSchema);
  return conn;
};

export default createTenantConnection;
