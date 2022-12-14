import mongoose from "mongoose";

const batchingSchema = new mongoose.Schema({
  userID: { type: mongoose.Types.ObjectId, ref: "User" },
  formulaID: { type: mongoose.Types.ObjectId, ref: "Formula" },
  formulaVersion: String,
  dateTime: Date,
  ingredients: [
    {
      materialID: { type: mongoose.Types.ObjectId, ref: "Material" },
      warehouseID: { type: mongoose.Types.ObjectId, ref: "Warehouse" },
      weight: Number,
      tolerance: Number,
      consumedTime: String,
      status: Boolean,
    },
  ],
  weight: Number,
});

batchingSchema.pre("save", function () {
  let sum = 0;
  for (let keys of this.ingredients) {
    sum += keys.weight;
  }
  this.weight = sum;
});

export default batchingSchema;
