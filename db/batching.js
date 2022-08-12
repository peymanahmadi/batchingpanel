import mongoose from "mongoose";
import UserSchema from "../models/User.js";
import customerSchema from "../models/Customer.js";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.MONGO_URL);
const conn = mongoose.createConnection(process.env.MONGO_URL);
conn.model("User", UserSchema);
conn.model("Customer", customerSchema);

export default conn;
