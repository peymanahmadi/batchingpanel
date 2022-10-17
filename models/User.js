import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    // commonUserID is a registered id in common with automatic batching system software user id installed in the factory.
    commonUserID: Number,
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
      minLength: 3,
      maxLength: 30,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
      minLength: 3,
      maxLength: 30,
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
    available: {
      type: Boolean,
      default: true,
    },
    customerID: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: [true, "Please provide a customer id"],
    },
    lastLoginAt: Date,
    accessLevel: {
      isAdmin: Boolean,
      allowedWarehouse: Boolean,
      allowedFormula: Boolean,
      allowedReports: Boolean,
      allowedManageUsers: Boolean,
    },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: Date,
    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default userSchema;
