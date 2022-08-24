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
    customerIDs,
    accessLevel,
  } = req.body;

  if (!firstName || !lastName || !email || !password || !customerIDs) {
    const error = new BadRequestError("please provide all required values");
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
    const error = new BadRequestError("Email already in use");
    return next(error);
  }

  if (customerIDs.length == 0) {
    const error = new BadRequestError(`CustomerID(s) not found`);
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
    customerIDs,
    accessLevel,
  });

  try {
    const session = await conn.startSession();
    session.startTransaction();
    await newUser.save({ session });

    for (let ids of customerIDs) {
      let customer = await customerModel.findById(ids);
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
  res.status(200).json({ user, token, customer: user.customerIDs[0].name });
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

export { register, login, updateUser };
