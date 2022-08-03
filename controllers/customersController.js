import Customer from "../models/Customer.js";
import mongoose from "mongoose";
import connectDB from "../db/connect.js";

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

const createCustomer = async (req, res) => {
  console.log("Create Customer");
  try {
    let customerdata = req.body;
    const customer = await Customer.create(customerdata);
    console.log(customer);
    const url = process.env.RAW_MONGO_URL.replace(
      "batching",
      `batching_${customerdata.name}`
    );
    console.log(url);
    const conn = mongoose.createConnection(url);
    console.log(conn);
    const userSchema = new mongoose.Schema({ name: String, email: String });
    const UserModel = conn.model("User", userSchema);
    res.status(201).json({ customer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

export { getAllCustomers, createCustomer };
