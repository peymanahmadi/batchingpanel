import mongoose from "mongoose";

const warehouseOperationsSchema = new mongoose.Schema({
  warehouseID: { type: mongoose.Types.ObjectId, ref: "Warehouse" },
  dateTime: Date,
  input: Boolean,
  materialID: { type: mongoose.Types.ObjectId, ref: "Material" },
  weight: Number,
  descriptionID: { type: mongoose.Types.ObjectId, ref: "WarehouseOpsDesc" },
});

export default warehouseOperationsSchema;
