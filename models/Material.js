import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    commonMaterialID: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a material name"],
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
    available: Boolean,
  },
  { timestamps: true }
);

export default materialSchema;
