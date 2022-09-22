import mongoose from "mongoose";

const formulaToleranceSchema = new mongoose.Schema({
  formulaID: { type: mongoose.Types.ObjectId, ref: "Formula" },
  dateTime: Date,
  tolerance: Number,
});

export default formulaToleranceSchema;
