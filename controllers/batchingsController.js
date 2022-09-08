import conn from "../db/batchingAdmin.js";
import batchingAdminConn from "../db/batchingAdmin.js";
import batchingTenantConn from "../db/batchingTenant.js";

// After the batching process finished at the factory,
// the automation software send batching data through a json file
// It consists of all the information about the process such as
// formula, mateirals, their batched weight, etc
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
  const warehouseModel = customerConn.model("Warehouse");
  const batchingModel = customerConn.model("Batching");
  const warehouseOperationsModel = customerConn.model("WarehouseOperations");
  const inventoryModel = customerConn.model("Inventory");

  const fID = await formulaModel.findOne({ commonFormulaID });

  // look for materialID and warehouseID for each raw materials in ingredients
  // clearly, we add materialID and warehouseID for each raw materials in batching step
  for (let [index, key] of ingredients.entries()) {
    let material = await materialModel.findOne({
      commonMaterialID: key.commonMaterialID,
    });
    ingredients[index].materialID = material._id;
    let warehouse = await warehouseModel.findOne({
      commonWarehouseID: key.commonWarehouseID,
    });
    ingredients[index].warehouseID = warehouse._id;
  }

  const newBatching = new batchingModel({
    userID: uID._id,
    dateTime,
    formulaID: fID._id,
    formulaVersion,
    ingredients,
    weight,
  });

  // Here, we have to create a session to save batching data
  // as well as warehouse operations
  try {
    const session = await conn.startSession();
    session.startTransaction();

    const batching = await newBatching.save({ session });

    // const newWarehouse = [];
    for (let [index, items] of ingredients.entries()) {
      console.log(items);
      // const nWarehouseOp = {};
      // nWarehouseOp.warehouseID = items.warehouseID;
      // nWarehouseOp.inbound = false;
      // nWarehouseOp.materialID = items.materialID;
      // nWarehouseOp.weight = items.weight;
      let newWarehouseOperations = new warehouseOperationsModel({
        warehouseID: items.warehouseID,
        inbound: false,
        materialID: items.materialID,
        weight: items.weight,
      });

      await newWarehouseOperations.save({ session });
      // newWarehouse.push(nWarehouseOp);
      let material = await inventoryModel.findOne({
        warehouseID: items.warehouseID,
        materialID: items.materialID,
      });
      if (!material) {
        const newInventory = new inventoryModel({
          warehouseID: items.warehouseID,
          materialID: items.materialID,
          weight: 0,
        });
        material = await newInventory.save({ session });
      }
      console.log("material: ", material);
      console.log("material.weight: ", material.weight);
      console.log("items.weight: ", items.weight);

      let newValue = material.weight - items.weight;
      console.log("newValue: ", newValue);
      const update = { weight: newValue };

      const newAmount = await inventoryModel.findByIdAndUpdate(
        material._id,
        update,
        { new: true, session }
      );
      console.log("newAmount: ", newAmount);
      console.log("=======");
      console.log("=======");
      console.log("=======");
    }
    // console.log(newWarehouse);

    session.commitTransaction();
    // res.status(201).json(items);
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

      // for (let [i, v] of items.ingredients.entries()) {
      //   if (materialConsumptionObj[v.materialID]) {
      //     materialConsumptionObj[v.materialID] =
      //       materialConsumptionObj[v.materialID] + v.weight;
      //   } else {
      //     materialConsumptionObj[v.materialID] = v.weight;
      //   }
      // }

      for (let [i, v] of items.ingredients.entries()) {
        if (materialConsumptionObj[v.materialID]) {
          if (materialConsumptionObj[v.materialID].weight) {
            materialConsumptionObj[v.materialID].weight =
              materialConsumptionObj[v.materialID].weight + v.weight;

            materialConsumptionObj[v.materialID].tolerance =
              materialConsumptionObj[v.materialID].tolerance + v.tolerance;
          } else {
            materialConsumptionObj[v.materialID].tolerance = v.tolerance;
          }
        } else {
          materialConsumptionObj[v.materialID] = {};
          materialConsumptionObj[v.materialID].weight = v.weight;
          materialConsumptionObj[v.materialID].tolerance = v.tolerance;
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
      materialConsumption["weight"] = item[1].weight;
      materialConsumption["tolerance"] = item[1].tolerance;
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
