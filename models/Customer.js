import mongoose from "mongoose";
// import connectDB from "../db/connect.js";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minLength: 3,
      maxLength: 30,
      trim: true,
      unique: true,
    },
    codeName: {
      type: String,
      required: [true, "Please provide a code name"],
      minlength: 2,
      maxLength: 20,
      trim: true,
      unique: true,
    },
    logo: String,
    adminIDs: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// const getDb = async () => {
//   return db ? db : await connectDB(process.env.MONGO_URL);
// };

// const getCustomerModel = async () => {
//   const batchingDb = await getDb();
//   return batchingDb.model("Customer", customerSchema);
// };
// let db;
// console.log("connectDB: ", connectDB);
// export default mongoose.model("Customer", customerSchema);

export default customerSchema;

// export default connectDB.model("Customer", customerSchema);

// export default getCustomerModel;
