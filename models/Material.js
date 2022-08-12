import mongoose from "mongoose";
// import connectDB from "../db/connect.js";

// let db;

const materialSchema = new mongoose.Schema(
  {
    commomMaterialID: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide material name"],
      minLength: 2,
      maxLength: 35,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      maxLength: 255,
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// const getDb = async () => {
//   return db ? db : await connectDB(process.env.MONGO_URL);
// };

// const getMaterialModel = async (userCodeName) => {
//   // const url = process.env.MONGO_URL.replace(
//   //   "batching",
//   //   `batching_${userCodeName}`
//   // );
//   const tenantDB = connectDB.useDb(`batching_${userCodeName}`);
//   //   db = db ? db : await connectDB(url);
//   //   let userDb = db.useDb(dbName);
//   //   return userDb;

//   // const batchingDb = await getDb();
//   return tenantDB.model("Material", materialSchema);
// };

// export default mongoose.model("Material", materialSchema);

export default materialSchema;

// export default getMaterialModel;
