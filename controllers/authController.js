import User from "../models/User.js";
import Customer from "../models/Customer.js";
import { BadRequestError } from "../errors/index.js";
import mongoose from "mongoose";

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

  try {
    const user = await User.create({
      commonUserID,
      firstName,
      lastName,
      email,
      password,
      jobTitle,
      customerIDs,
    });

    res.status(201).json({
      user: {
        commonUserID: user.commonUserID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        jobTitle: user.jobTitle,
        customerIDs: user.customerIDs,
      },
    });
  } catch (err) {
    return next(err);
  }
};

export { register };
