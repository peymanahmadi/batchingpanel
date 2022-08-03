import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minLength: 3,
      maxLength: 30,
      trim: true,
      unique: true,
    },
    codeName: {
      type: String,
      required: [true, "Please provide a code name"],
      minlength: 2,
      maxLength: 20,
      trim: true,
      unique: true,
    },
    logo: String,
    adminIDs: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
