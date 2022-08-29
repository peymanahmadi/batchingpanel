import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userSchema from "../models/User.js";
import customerSchema from "../models/Customer.js";
import adminSchema from "../models/Admin.js";

const conn = mongoose.createConnection(process.env.MONGO_URI);
conn.model("User", userSchema);
conn.model("Customer", customerSchema);
conn.model("Admin", adminSchema);

export default conn;
