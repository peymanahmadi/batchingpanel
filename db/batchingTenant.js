import mongoose from "mongoose";
import materialSchema from "../models/Material.js";
import dotenv from "dotenv";
dotenv.config();

const createTenantConnection = (url, dbName) => {
  const conn = mongoose.createConnection(url, { dbName });
  conn.model("Material", materialSchema);
  return conn;
};

export default createTenantConnection;
