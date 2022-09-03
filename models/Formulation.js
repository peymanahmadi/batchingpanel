import mongoose from "mongoose";

const formulationSchema = new mongoose.Schema({
  formulaID: {
    type: mongoose.Types.ObjectId,
    ref: "Formula",
  },
  version: {
    type: String,
    maxLength: 15,
    trim: true,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  userID: {
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
        type: mongoose.Types.ObjectId,
        ref: "Material",
      },
      weight: Number,
      percentage: Number,
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
