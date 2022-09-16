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
    users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    available: {
      type: Boolean,
      default: true,
    },
    countdown: {
      type: Number,
      required: [true, "Please provide countdown counter value"],
      min: 1,
      max: 365,
      default: 365,
    },
  },
  { timestamps: true }
);

export default customerSchema;
