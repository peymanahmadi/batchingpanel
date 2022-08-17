import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a warehouse name"],
      minLength: 2,
      maxLength: 50,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default warehouseSchema;
