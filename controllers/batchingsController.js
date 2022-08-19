import batchingAdminConn from "../db/batchingAdmin.js";
import batchingTenantConn from "../db/batchingTenant.js";

const createBatching = async (req, res, next) => {
  const {
    customerID,
    commonUserID,
    dateTime,
    commonFormulaID,
    formulaVersion,
    ingredients,
    weight,
  } = req.body;

  const customerModel = batchingAdminConn.model("Customer");
  const userModel = batchingAdminConn.model("User");

  const cID = await customerModel.findById(customerID, "codeName");
  const uID = await userModel.findOne({ commonUserID });

  const customerConn = batchingTenantConn(cID.codeName);
  const formulaModel = customerConn.model("Formula");
  const materialModel = customerConn.model("Material");
  const batchingModel = customerConn.model("Batching");

  const fID = await formulaModel.findOne({ commonFormulaID });
  // const mID = await materialModel.findOne({ commonMaterialID: 1 });
  // console.log(mID);
  //   const mID = await materialModel.findOne({ commonUserID });

  for (let key of ingredients) {
    let material = await materialModel.findOne({
      commonMaterialID: key.commonMaterialID,
    });
    console.log("materialID: ", material._id);
    ingredients[0].materialID = material._id;
  }

  console.log(ingredients);

  const newBatching = new batchingModel({
    commonUserID: uID._id,
    dateTime,
    commonFormulaID: fID._id,
    formulaVersion,
    ingredients,
    weight,
  });

  try {
    const batching = await newBatching.save();
    res.status(201).json(batching);
  } catch (error) {
    console.log(error);
  }
};

export { createBatching };
