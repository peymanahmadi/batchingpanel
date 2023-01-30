import crypto from "crypto";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "../utils/index.js";
import conn from "../db/batchingAdmin.js";

const userModel = conn.model("User");
const customerModel = conn.model("Customer");

const register = async (req, res, next) => {
  const {
    customerID,
    firstName,
    lastName,
    email,
    password,
    jobTitle,
    available,
    userType,
  } = req.body;

  if (!firstName || !lastName || !email || !password || !customerID) {
    const error = new BadRequestError("please provide all required values.");
    return next(error);
  }

  const emailAlreadyExists = await userModel.findOne({ email });
  if (emailAlreadyExists) {
    const error = new BadRequestError("user already exists.");
    return next(error);
  }

  const customer = await customerModel.findById(customerID);
  if (!customer) {
    const error = new BadRequestError(`customer not found.`);
    return next(error);
  }

  // const isAdmin = await userModel.findOne({ customerID });
  // if (!isAdmin) {
  //   accessLevel.isAdmin = true;
  // }

  // const userAlreadyExists = await userModel.findOne({ email });
  // if (userAlreadyExists) {
  //   const error = new BadRequestError("email already in use");
  //   return next(error);
  // }

  // if (accessLevel.isAdmin) {
  //   for (let keys in accessLevel) {
  //     accessLevel[keys] = true;
  //   }
  // }

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password,
    jobTitle,
    userType,
    available,
    customerID,
    verificationToken,
  });

  try {
    const session = await conn.startSession();
    session.startTransaction();

    await newUser.save({ session });
    customer.users.push(newUser);
    await customer.save({ session });

    session.commitTransaction();

    const origin = "http://localhost:3000";
    // const tempOrigin = req.get('origin');
    // const protocol = req.protocol;
    // const host = req.get('host');
    // const forwardedHost = req.get('x-forwarded-host');
    // const forwardedProtocol = req.get('x-forwarded-proto');

    await sendVerificationEmail({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      verificationToken: newUser.verificationToken,
      origin,
    });

    res.status(201).json({
      newUser: {
        // commonUserID: newUser.commonUserID,
        // firstName: newUser.firstName,
        // lastName: newUser.lastName,
        // email: newUser.email,
        // jobTitle: newUser.jobTitle,
        // customerID: newUser.customerID,
        // accessLevel: newUser.accessLevel,
        // createdBy: newUser.createdBy,
        msg: "success! please check your email to verify your account.",
      },
    });
  } catch (error) {
    return next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  const { verificationToken, email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    const error = new UnAuthenticatedError(
      "Verification Failed - User not found"
    );
    return next(error);
  }

  if (user.verificationToken !== verificationToken) {
    const error = new UnAuthenticatedError("Verification Failed");
    return next(error);
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";

  await user.save();

  res.status(200).json({ msg: "Email Verified" });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new BadRequestError("Please provide all required values");
    return next(error);
  }

  try {
    const user = await userModel
      .findOne({ email })
      .select("+password")
      .populate("customerID");

    if (!user) {
      const error = new UnAuthenticatedError("Invalid Credentials");
      return next(error);
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      const error = new UnAuthenticatedError("Invalid Credentials");
      return next(error);
    }

    if (!user.isVerified) {
      const error = new UnAuthenticatedError("Please verify your email");
      return next(error);
    }
    user.lastLoginAt = Date.now();
    await user.save();

    const token = user.createJWT();
    user.password = undefined;
    res.status(200).json({
      user,
      token,
      customerName: user.customerID.name,
      customerCodeName: user.customerID.codeName,
      customerID: user.customerID._id,
    });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  const {
    userID,
    commonUserID,
    firstName,
    lastName,
    email,
    jobTitle,
    available,
  } = req.body;
  if (!firstName || !lastName || !email || jobTitle) {
    const error = new BadRequestError("please provide all required values");
    return next(error);
  }
  const user = await userModel.findOne({ _id: userID });

  if (!user) {
    const error = new NotFoundError(`No user with id: ${userID}`);
    return next(error);
  }

  let isVerified = true;
  if (email !== user.email) {
    isVerified = false;
  }

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userID },
      {
        commonUserID,
        firstName,
        lastName,
        email,
        jobTitle,
        available,
        isVerified,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({ updatedUser });
  } catch (error) {
    return next(error);
  }
};

const getUsersByCustomerID = async (req, res, next) => {
  const { customerCodeName } = req.body;
  try {
    const users = await userModel.find({ customerCodeName });
    res.status(200).json({ users, totalUsers: users.length, numOfPages: 1 });
  } catch (error) {
    return next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    const error = new BadRequestError("Please provide a valid email");
    return next(error);
  }

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const passwordToken = crypto.randomBytes(70).toString("hex");

      const origin = "http://localhost:3000";
      await sendResetPasswordEmail({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: passwordToken,
        origin,
      });

      const tenMinutes = 1000 * 60 * 10;
      const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

      user.passwordToken = passwordToken;
      user.passwordTokenExpirationDate = passwordTokenExpirationDate;
      await user.save();
    }
    res.status(200).json({ msg: "Please check your email for reset password" });
  } catch (error) {
    return next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    const error = new UnAuthenticatedError("Please provide all values");
    return next(error);
  }

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const currentDate = new Date();
      if (
        user.passwordToken === token &&
        user.passwordTokenExpirationDate > currentDate
      ) {
        user.password = password;
        user.passwordToken = null;
        user.passwordTokenExpirationDate = null;
        await user.save();
      }
    }
    res.status(200).json({ msg: "Reset Password" });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { userID } = req.body;

  const user = await userModel.findById(userID);
  if (!user) {
    const error = new NotFoundError(`No user with id: ${userID}`);
    return next(error);
  }
  try {
    await userModel.findByIdAndDelete(userID);
    res.status(200).json({ msg: "User removed" });
  } catch (error) {
    return next(error);
  }
};

const blockUser = async (req, res, next) => {
  const { userID } = req.body;

  const user = await userModel.findById(userID);
  if (!user) {
    const error = new NotFoundError(`No user with id: ${userID}`);
    return next(error);
  }
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userID },
      {
        available: false,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({ updatedUser });
  } catch (error) {
    return next(error);
  }
};

export {
  register,
  login,
  updateUser,
  getUsersByCustomerID,
  verifyEmail,
  forgotPassword,
  resetPassword,
  deleteUser,
  blockUser,
};
