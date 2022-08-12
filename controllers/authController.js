import mongoose from "mongoose";
import connectDB from "../db/connect.js";
import User from "../models/User.js";
// import getUserModel from "../models/User.js";
import Customer from "../models/Customer.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import conn from "../db/batching.js";

const register = async (req, res, next) => {
  const {
    commonUserID,
    firstName,
    lastName,
    email,
    password,
    jobTitle,
    customerIDs,
  } = req.body;

  if (!firstName || !lastName || !email || !password || !customerIDs) {
    const error = new BadRequestError("please provide all required values");
    return next(error);
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    const error = new BadRequestError("Email already in use");
    return next(error);
  }

  if (customerIDs.length == 0) {
    const error = new BadRequestError(`CustomerID(s) not found`);
    return next(error);
  }

  const newUser = new User({
    commonUserID,
    firstName,
    lastName,
    email,
    password,
    jobTitle,
    customerIDs,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newUser.save({ session });

    for (let ids of customerIDs) {
      let customer = await Customer.findById(ids);
      customer.adminIDs.push(newUser);
      await customer.save({ session });
    }
    session.commitTransaction();

    res.status(201).json({
      newUser: {
        commonUserID: newUser.commonUserID,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        jobTitle: newUser.jobTitle,
        customerIDs: newUser.customerIDs,
      },
    });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  console.log("login");
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new BadRequestError("Please provide all required values");
    return next(error);
  }

  const userModel = conn.model("User");

  const user = await userModel
    .findOne({ email })
    .select("+password")
    .populate("customerIDs");

  if (!user) {
    const error = new UnAuthenticatedError("Invalid Credentials");
    return next(error);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    const error = new UnAuthenticatedError("Invalid Credentials");
    return next(error);
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(200).json({ user, token });
};

export { register, login };
