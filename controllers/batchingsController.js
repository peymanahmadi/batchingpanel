import batchingAdminConn from "../db/batchingAdmin.js";
import batchingTenantConn from "../db/batchingTenant.js";

const createBatching = async (req, res, next) => {
  const {
    customerCodeName,
    commonUserID,
    dateTime,
    commonFormulaID,
    formulaVersion,
    ingredients,
    weight,
  } = req.body;

  const userModel = batchingAdminConn.model("User");

  const uID = await userModel.findOne({ commonUserID });
  const customerConn = batchingTenantConn(customerCodeName);
  const formulaModel = customerConn.model("Formula");
  const materialModel = customerConn.model("Material");
  const batchingModel = customerConn.model("Batching");

  const fID = await formulaModel.findOne({ commonFormulaID });
  console.log(fID);

  for (let key of ingredients) {
    let material = await materialModel.findOne({
      commonMaterialID: key.commonMaterialID,
    });
    console.log("materialID: ", material._id);
    ingredients[0].materialID = material._id;
  }

  const newBatching = new batchingModel({
    userID: uID._id,
    dateTime,
    formulaID: fID._id,
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
