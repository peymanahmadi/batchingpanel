import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import conn from "../db/batchingAdmin.js";

const userModel = conn.model("User");
const customerModel = conn.model("Customer");

const register = async (req, res, next) => {
  const {
    commonUserID,
    firstName,
    lastName,
    email,
    password,
    jobTitle,
    customerID,
    accessLevel,
  } = req.body;

  if (!firstName || !lastName || !email || !password || !customerID) {
    const error = new BadRequestError("Please provide all required values");
    return next(error);
  }

  if (commonUserID) {
    const cuIDAlreadyExists = await userModel.findOne({ commonUserID });
    if (cuIDAlreadyExists) {
      const error = new BadRequestError("commonUserID already in use");
      return next(error);
    }
  }

  const userAlreadyExists = await userModel.findOne({ email });
  if (userAlreadyExists) {
    const error = new BadRequestError("email already in use");
    return next(error);
  }

  const customer = await customerModel.findById(customerID);
  if (!customer) {
    const error = new BadRequestError(`customerID not found`);
    return next(error);
  }

  if (accessLevel.isAdmin) {
    for (let keys in accessLevel) {
      accessLevel[keys] = true;
    }
  }

  const newUser = new userModel({
    commonUserID,
    firstName,
    lastName,
    email,
    password,
    jobTitle,
    customerID,
    accessLevel,
  });

  try {
    const session = await conn.startSession();
    session.startTransaction();

    await newUser.save({ session });
    customer.users.push(newUser);
    await customer.save({ session });

    session.commitTransaction();

    res.status(201).json({
      newUser: {
        commonUserID: newUser.commonUserID,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        jobTitle: newUser.jobTitle,
        customerID: newUser.customerID,
        accessLevel: newUser.accessLevel,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new BadRequestError("Please provide all required values");
    return next(error);
  }

  const user = await userModel
    .findOne({ email })
    .select("+password")
    .populate("customerID");

  console.log(user);

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
  res.status(200).json({
    user,
    token,
    customer: user.customerID._id,
    customerID: user.customerID.name,
  });
};

const updateUser = async (req, res, next) => {
  const { firstName, lastName, email, jobTitle, available } = req.body;
  if (!firstName || !lastName || !email || jobTitle) {
    const error = new BadRequestError("please provide all required values");
    return next(error);
  }
  const user = await userModel.findOne({ _id: req.user.userId });
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.jobTitle = jobTitle;
  user.available = available;

  try {
    await user.save();

    const token = user.createJWT();
    res.status(200).json({ user, token });
  } catch (error) {
    return next(error);
  }
};

const getUsersByCustomerID = async (req, res, next) => {
  const cID = req.params;
  try {
    const users = await userModel.find({ cID });
    res.status(200).json({ users, totalUsers: users.length, numOfPages: 1 });
  } catch (error) {
    return next(error);
  }
};

export { register, login, updateUser, getUsersByCustomerID };
