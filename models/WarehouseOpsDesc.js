import mongoose from "mongoose";

const warehouseOpsDesc = new mongoose.Schema({
  Description: { type: String, maxLength: 50, trim: true },
});

export default warehouseOpsDesc;
