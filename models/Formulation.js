import mongoose from "mongoose";

const formulationSchema = new mongoose.Schema({
  formulaID: {
    type: mongoose.Types.ObjectId,
    ref: "Formula",
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  creatorID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  formulaBatchSize: {
    type: Number,
    default: 2000,
  },
  ingredients: [
    {
      materialID: {
        type: { type: mongoose.Types.ObjectId, ref: "Material" },
      },
      weight: Number,
    },
  ],
  weight: Number,
});

formulationSchema.pre("save", function () {
  let sum = 0;
  for (let keys of this.ingredients) {
    sum += keys.weight;
  }
  this.weight = sum;
});

export default formulationSchema;
