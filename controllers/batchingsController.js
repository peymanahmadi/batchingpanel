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

  for (let [index, key] of ingredients.entries()) {
    let material = await materialModel.findOne({
      commonMaterialID: key.commonMaterialID,
    });
    ingredients[index].materialID = material._id;
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
    return next(error);
  }
};

const materialConsumption = async (req, res, next) => {
  const { customerCodeName, dueDate } = req.body;

  const customerConn = batchingTenantConn(customerCodeName);
  const batchingModel = customerConn.model("Batching");
  const materialModel = customerConn.model("Material");

  try {
    const batching = await batchingModel.find({ dateTime: dueDate });

    const matconsume = new Object();
    let mat = new Array();

    for (let [index, items] of batching.entries()) {
      for (let [i, v] of items.ingredients.entries()) {
        console.log(v);
        if (matconsume[v.materialID]) {
          matconsume[v.materialID] = matconsume[v.materialID] + v.weight;
        } else {
          matconsume[v.materialID] = v.weight;
        }
      }
    }

    console.log(matconsume);

    let arr = [];

    for (let item of Object.entries(matconsume)) {
      let materialConsumption = {};
      let material = await materialModel.findById(item[0]);
      materialConsumption["name"] = material.name;
      materialConsumption["weight"] = item[1];
      arr.push(materialConsumption);
    }
    console.log(arr);

    res.status(200).json({ arr });
  } catch (error) {
    return next(error);
  }
};

export { createBatching, materialConsumption };
