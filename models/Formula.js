import mongoose from "mongoose";

const formulaSchema = new mongoose.Schema({
  commonFormulaID: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide a formula name"],
    maxLength: 50,
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
});

export default formulaSchema;
