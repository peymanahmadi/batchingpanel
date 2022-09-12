import mongoose from "mongoose";

const dailyBatchingSchema = new mongoose.Schema({
  numOfBatches: Number,
  weight: Number,
  date: Date,
});

export default dailyBatchingSchema;
