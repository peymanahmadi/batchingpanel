import batchingAdminConn from "../db/batchingAdmin.js";
import batchingTenantConn from "../db/batchingTenant.js";

const createBatching = async (req, res, next) => {
  const {
    customerCodeName,
    commonUserID,
    dateTime,
    commonFormulaID,
    // formulaVersion,
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
    // formulaVersion,
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
  const formulaModel = customerConn.model("Formula");

  try {
    const batching = await batchingModel.find({ dateTime: dueDate });

    const materialConsumptionObj = new Object();
    const batchedFormulaObj = new Object();

    let batchedFormulaArr = [];
    let batchingWeight = 0;

    for (let [index, items] of batching.entries()) {
      batchingWeight += items.weight;
      if (batchedFormulaObj[items.formulaID]) {
        batchedFormulaObj[items.formulaID] =
          batchedFormulaObj[items.formulaID] + items.weight;
      } else {
        batchedFormulaObj[items.formulaID] = items.weight;
      }

      for (let [i, v] of items.ingredients.entries()) {
        if (materialConsumptionObj[v.materialID]) {
          materialConsumptionObj[v.materialID] =
            materialConsumptionObj[v.materialID] + v.weight;
        } else {
          materialConsumptionObj[v.materialID] = v.weight;
        }
      }
    }

    for (let item of Object.entries(batchedFormulaObj)) {
      const batchedFormula = {};
      const formula = await formulaModel.findById(item[0]);
      batchedFormula["name"] = formula.name;
      batchedFormula["weight"] = item[1];
      batchedFormulaArr.push(batchedFormula);
    }

    let matConsumeArray = [];

    for (let item of Object.entries(materialConsumptionObj)) {
      let materialConsumption = {};
      let material = await materialModel.findById(item[0]);
      materialConsumption["name"] = material.name;
      materialConsumption["weight"] = item[1];
      matConsumeArray.push(materialConsumption);
    }

    res.status(200).json({
      matConsumeArray,
      batchingNums: batching.length,
      batchingWeight,
      batching,
      batchedFormulaArr,
    });
  } catch (error) {
    return next(error);
  }
};

export { createBatching, materialConsumption };
