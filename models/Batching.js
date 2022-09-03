import mongoose from "mongoose";

const batchingSchema = new mongoose.Schema({
  userID: { type: mongoose.Types.ObjectId, ref: "User" },
  formulaID: { type: mongoose.Types.ObjectId, ref: "Formula" },
  formulaVersion: String,
  dateTime: Date,
  ingredients: [
    {
      materialID: { type: mongoose.Types.ObjectId, ref: "Material" },
      weight: Number,
      consumedTime: String,
      status: Boolean,
    },
  ],
  weight: Number,
});

export default batchingSchema;
