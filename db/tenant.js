import mongoose from "mongoose";
import materialSchema from "../models/Material.js";
import dotenv from "dotenv";
dotenv.config();

const createTenantConnection = (url) => {
  const conn = mongoose.createConnection(url);
  conn.model("Material", materialSchema);
  return conn;
};

export default createTenantConnection;
