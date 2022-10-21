import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    commonWarehouseID: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a warehouse name"],
      minLength: 2,
      maxLength: 50,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      maxLength: 200,
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default warehouseSchema;
