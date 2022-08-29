import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import conn from "../db/batchingAdmin.js";

const adminModel = conn.model("Admin");

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    const error = new BadRequestError("please provide all required values");
    return next(error);
  }

  const isAdminAlreadyExists = await adminModel.findOne({ email });
  if (isAdminAlreadyExists) {
    const error = new BadRequestError("Email already in use");
    return next(error);
  }

  const newAdmin = new adminModel({
    firstName,
    lastName,
    email,
    password,
  });

  try {
    await newAdmin.save();
    res.status(201).json({ newAdmin });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = new BadRequestError("please provide all required values");
    return next(error);
  }

  const admin = await adminModel.findOne({ email }).select("+password");

  if (!admin) {
    const error = new UnAuthenticatedError("Invalid Credentials");
    return next(error);
  }

  const isPasswordCorrect = await admin.comparePassword(password);
  if (!isPasswordCorrect) {
    const error = new UnAuthenticatedError("Invalid Credentials");
    return next(error);
  }

  const token = admin.createJWT();
  admin.password = undefined;
  res.status(200).json({ admin, token });
};

export { register, login };
