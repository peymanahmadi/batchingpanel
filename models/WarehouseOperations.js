import mongoose from "mongoose";

const warehouseOperationsSchema = new mongoose.Schema({
  warehouseID: { type: mongoose.Types.ObjectId, ref: "Warehouse" },
  dateTime: {
    type: Date,
    default: Date.now(),
  },
  inbound: Boolean,
  materialID: { type: mongoose.Types.ObjectId, ref: "Material" },
  weight: Number,
  descriptionID: { type: mongoose.Types.ObjectId, ref: "WarehouseOpDesc" },
});

export default warehouseOperationsSchema;
