import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    commomMaterialID: number,
    name: {
      type: String,
      required: [true, "Please provide material name"],
      minLength: 2,
      maxLength: 30,
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

export default mongoose.model("Material", materialSchema);
