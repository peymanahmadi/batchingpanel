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
  } = req.body;

  const userModel = batchingAdminConn.model("User");

  const uID = await userModel.findOne({ commonUserID });
  const customerConn = batchingTenantConn(customerCodeName);
  const formulaModel = customerConn.model("Formula");
  const materialModel = customerConn.model("Material");
  const warehouseModel = customerConn.model("Warehouse");
  const batchingModel = customerConn.model("Batching");
  const dailyBatchingModel = customerConn.model("DailyBatching");
  const warehouseOperationsModel = customerConn.model("WarehouseOperations");
  const inventoryModel = customerConn.model("Inventory");
  const formulaToleranceModel = customerConn.model("FormulaTolerance");
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
  });

  // Here, we have to create a session to save batching data
  // as well as warehouse operations
  try {
    const session = await conn.startSession();
    session.startTransaction();

    const batching = await newBatching.save({ session });

    let dailyBatching = await dailyBatchingModel.findOne({ date: dateTime });
    if (!dailyBatching) {
      const newDailyBatching = new dailyBatchingModel({
        numOfBatches: 0,
        weight: 0,
        date: dateTime,
      });
      dailyBatching = await newDailyBatching.save({ session });
    }
    let nOfBatchs = dailyBatching.numOfBatches + 1;
    let newWeight = batching.weight + dailyBatching.weight;
    const updateDailyBatching = { numOfBatches: nOfBatchs, weight: newWeight };

    const newDBatching = await dailyBatchingModel.findByIdAndUpdate(
      dailyBatching._id,
      updateDailyBatching,
      { new: true, session }
    );

    let percentage = 0;
    let parr = [];

    for (let [index, items] of ingredients.entries()) {
      let newWarehouseOperations = new warehouseOperationsModel({
        warehouseID: items.warehouseID,
        inbound: false,
        materialID: items.materialID,
        weight: items.weight,
      });

      await newWarehouseOperations.save({ session });
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

      let newValue = material.weight - items.weight;
      const update = { weight: newValue };

      const newAmount = await inventoryModel.findByIdAndUpdate(
        material._id,
        update,
        { new: true, session }
      );

      percentage =
        (Math.abs(items.weight - (items.weight + items.tolerance)) /
          (items.weight + items.tolerance)) *
        100;
      parr.push(Number(percentage.toFixed(2)));
      console.log(percentage);
    }
    console.log(parr);
    const formulaToleranceAve = (
      parr.reduce((a, b) => a + b, 0) / parr.length
    ).toFixed(2);

    const formulaTolerance = new formulaToleranceModel({
      formulaID: fID._id,
      dateTime,
      tolerance: formulaToleranceAve,
    });

    await formulaTolerance.save({ session });

    session.commitTransaction();
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

const getDailyBatching = async (req, res, next) => {
  const { customerCodeName } = req.body;

  const customerConn = batchingTenantConn(customerCodeName);
  const dailyBatchingModel = customerConn.model("DailyBatching");

  try {
    const dailyBatching = await dailyBatchingModel.find({});
    res.status(200).json({ dailyBatching });
  } catch (error) {
    return next(error);
  }
};

const materialTolerance = async (req, res, next) => {
  const { customerCodeName } = req.body;

  const customerConn = batchingTenantConn(customerCodeName);
  const batchingModel = customerConn.model("Batching");
  const materialModel = customerConn.model("Material");

  try {
    const batching = await batchingModel.find({});
    let productionTol = {};
    let tolerance = [];
    for (let items of batching) {
      for (let [index, item] of items.ingredients.entries()) {
        if (!productionTol[item.materialID]) {
          tolerance = [];
          tolerance.push(item.tolerance);
          productionTol[item.materialID] = tolerance;
        } else {
          let tol = [];
          tol = productionTol[item.materialID];
          tol.push(item.tolerance);
          productionTol[item.materialID] = tol;
        }
      }
    }

    let materialToleranceArr = [];
    const mIDs = Object.keys(productionTol);
    const tols = Object.values(productionTol);

    for (let i = 0; i < mIDs.length; i++) {
      let productionTolerance = {};
      let mName = await materialModel.findById(mIDs[i]);
      productionTolerance["name"] = mName.name;
      productionTolerance["tolerance"] = tols[i];
      productionTolerance["length"] = tols[i].length;
      materialToleranceArr.push(productionTolerance);
    }

    res.status(200).json({ materialToleranceArr });
  } catch (error) {
    return next(error);
  }
};

export {
  createBatching,
  materialConsumption,
  getDailyBatching,
  materialTolerance,
};
