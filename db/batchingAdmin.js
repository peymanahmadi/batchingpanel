import mongoose from "mongoose";
import userSchema from "../models/User.js";
import customerSchema from "../models/Customer.js";
import dotenv from "dotenv";
dotenv.config();

const conn = mongoose.createConnection(process.env.MONGO_URI);
conn.model("User", userSchema);
conn.model("Customer", customerSchema);

export default conn;
