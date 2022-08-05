import Customer from "../models/Customer.js";
import mongoose from "mongoose";
import connectDB from "../db/connect.js";
import { BadRequestError } from "../errors/index.js";

const getAllCustomers = async (req, res) => {
  console.log("Get All Customers");
  try {
    const customers = await Customer.find();
    res.status(200).json({ customers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const createCustomer = async (req, res, next) => {
  const { name, codeName } = req.body;

  if (!name || !codeName) {
    const error = new BadRequestError("Please provide all required values");
    return next(error);
  }

  const nameAlreadyExists = await Customer.findOne({ name });
  const codeNameAlreadyExists = await Customer.findOne({ codeName });
  if (nameAlreadyExists || codeNameAlreadyExists) {
    const error = new BadRequestError("customer name/codeName already exists");
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    let customerdata = req.body;
    const customer = await Customer.create([customerdata], { session: sess });
    const url = process.env.RAW_MONGO_URL.replace(
      "batching",
      `batching_${customerdata.codeName}`
    );
    const conn = mongoose.createConnection(url);
    sess.commitTransaction();
    res.status(201).json({ customer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

export { getAllCustomers, createCustomer };
