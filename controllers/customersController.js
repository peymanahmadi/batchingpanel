import mongoose from "mongoose";
// import getCustomerModel from "../models/Customer.js";
import Customer from "../models/Customer.js";
import { BadRequestError } from "../errors/index.js";
import conn from "../db/batching.js";

const getAllCustomers = async (req, res) => {
  console.log("get all customers");
  const customerModel = conn.model("Customer");
  // let customerModel = await getCustomerModel();
  try {
    const customers = await customerModel.find();
    // const customers = await Customer.find();
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

  let customerModel = await getCustomerModel();

  // const nameAlreadyExists = await Customer.findOne({ name });
  const nameAlreadyExists = await customerModel.findOne({ name });
  // const codeNameAlreadyExists = await Customer.findOne({ codeName });
  const codeNameAlreadyExists = await customerModel.findOne({ codeName });
  if (nameAlreadyExists || codeNameAlreadyExists) {
    const error = new BadRequestError("customer name/codeName already exists");
    return next(error);
  }

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   let customerdata = req.body;
  //   // const customer = await Customer.create([customerdata], { session: sess });
  //   const customer = await customerModel.create([customerdata], {
  //     session: sess,
  //   });
  //   const url = process.env.RAW_MONGO_URL.replace(
  //     "batching",
  //     `batching_${customerdata.codeName}`
  //   );
  //   const conn = mongoose.createConnection(url);
  //   sess.commitTransaction();
  //   res.status(201).json({ customer });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ msg: error });
  // }
};

export { getAllCustomers, createCustomer };
