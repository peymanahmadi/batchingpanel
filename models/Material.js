import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    commomMaterialID: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide material name"],
      minLength: 2,
      maxLength: 35,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      maxLength: 255,
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default materialSchema;
