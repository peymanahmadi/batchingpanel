import mongoose from "mongoose";

const warehouseOpDescSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Please provide description"],
    minLength: 2,
    maxLength: 250,
    trim: true,
  },
});

export default warehouseOpDescSchema;
