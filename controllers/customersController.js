import { BadRequestError } from "../errors/index.js";
import conn from "../db/batchingAdmin.js";

const customerModel = conn.model("Customer");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();
    res.status(200).json({ customers });
  } catch (error) {
    return next(error);
  }
};

const createCustomer = async (req, res, next) => {
  const { name, codeName, logo, adminIDs } = req.body;

  if (!name || !codeName) {
    const error = new BadRequestError("Please provide all required values");
    return next(error);
  }

  const nameAlreadyExists = await customerModel.findOne({ name });
  const codeNameAlreadyExists = await customerModel.findOne({ codeName });
  if (nameAlreadyExists || codeNameAlreadyExists) {
    const error = new BadRequestError("customer name/codeName already exists");
    return next(error);
  }

  const newCustomer = new customerModel({
    name,
    codeName,
    logo,
    adminIDs,
  });

  try {
    //   const sess = await mongoose.startSession();
    //   sess.startTransaction();
    // let customerdata = req.body;
    const customer = await newCustomer.save();
    //  const customer = await Customer.create([customerdata], { session: sess });
    //  const customer = await customerModel.create([customerdata], {
    //     session: sess,
    //   });
    //   const url = process.env.RAW_MONGO_URL.replace(
    //     "batching",
    //     `batching_${customerdata.codeName}`
    //   );
    //   const conn = mongoose.createConnection(url);
    //   sess.commitTransaction();
    res.status(201).json({ customer });
  } catch (error) {
    return next(error);
  }
};

export { getAllCustomers, createCustomer };
