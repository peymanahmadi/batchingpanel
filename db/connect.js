import mongoose from "mongoose";

// const connectDB = (url) => {
//   return mongoose.connect(url);
// };

const connectDB = async (url) => {
  return new Promise(async (resolve, reject) => {
    const connection = await mongoose.createConnection(url).asPromise();
    resolve(connection);
  });
};

const connectTenantDB = async (url) => {
  return new Promise(async (resolve, reject) => {
    const connection = await mongoose.createConnection(url).asPromise();
    resolve(connection);
  });
};

export default connectDB;
