import mongoose from "mongoose";
import materialSchema from "../models/Material.js";
import formulaSchema from "../models/Formula.js";
import formulationSchema from "../models/Formulation.js";
import dotenv from "dotenv";
dotenv.config();

const createTenantConnection = (url, dbName) => {
  const conn = mongoose.createConnection(url, { dbName });
  conn.model("Material", materialSchema);
  conn.model("Formula", formulaSchema);
  conn.model("Formulation", formulationSchema);
  return conn;
};

export default createTenantConnection;
