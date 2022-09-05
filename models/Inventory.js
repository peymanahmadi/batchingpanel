import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  warehouseID: { type: mongoose.Types.ObjectId, ref: "Warehouse" },
  materialID: { type: mongoose.Types.ObjectId, ref: "Material" },
  weight: Number,
});

export default inventorySchema;
