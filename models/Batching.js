import mongoose from "mongoose";

const batchingSchema = new mongoose.Schema({
  commonUserID: { type: mongoose.Types.ObjectId, ref: "User" },
  commonFormulaID: { type: mongoose.Types.ObjectId, ref: "Formula" },
  formulaVersion: Number,
  dateTime: Date,
  ingredients: [
    {
      materialID: { type: mongoose.Types.ObjectId, ref: "Material" },
      commonMaterialID: { type: Number, ref: "Material" },
      weight: Number,
      consumedTime: String,
      status: Boolean,
    },
  ],
  weight: Number,
});

export default batchingSchema;
