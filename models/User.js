import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    commonUserID: Number,
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
      minLength: 3,
      maxLength: 20,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
      minLength: 3,
      maxLength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minLength: 6,
      select: false,
    },
    jobTitle: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    customerIDs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Customer",
        required: [true, "Please provide a customer id"],
      },
    ],
    recentActivityTime: date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
