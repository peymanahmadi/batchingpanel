import createTenantConnection from "../db/batchingTenant.js";
import { BadRequestError } from "../errors/index.js";

const createWarehouse = async (req, res, next) => {
  const { customerCodeName, commonWarehouseID, name } = req.body;

  if (!commonWarehouseID || !name) {
    const error = new BadRequestError("Please provide all values");
    return next(error);
  }

  const conn = createTenantConnection(customerCodeName);
  const warehouseModel = conn.model("Warehouse");

  const cmIDAlreadyExists = await warehouseModel.findOne({ commonWarehouseID });
  if (cmIDAlreadyExists) {
    const error = new BadRequestError("commonWarehouseID already in use");
    return next(error);
  }

  const nameAlreadyExists = await warehouseModel.findOne({ name });
  if (nameAlreadyExists) {
    const error = new BadRequestError("name already in use");
    return next(error);
  }

  const newWarehouse = new warehouseModel({
    commonWarehouseID,
    name,
  });

  try {
    const warehouse = await newWarehouse.save();
    res.status(201).json({ warehouse });
  } catch (error) {
    return next(error);
  }
};

const readWarehouse = async (req, res, next) => {
  res.send("read warehouse");
};

const updateWarehouse = async (req, res, next) => {
  res.send("update warehouse");
};

const deleteWarehouse = async (req, res, next) => {
  res.send("delete warehouse");
};

const createWarehouseOpDesc = async (req, res, next) => {
  const { customerCodeName, description } = req.body;

  if (!description) {
    const error = new BadRequestError("Please provide a valid description");
    return next(error);
  }

  const conn = createTenantConnection(customerCodeName);
  const warehouseOpDescModel = conn.model("WarehouseOpDesc");

  const newWarehouseOpDesc = new warehouseOpDescModel({
    description,
  });

  try {
    const warehouseOpDesc = await newWarehouseOpDesc.save();
    res.status(201).json({ warehouseOpDesc });
  } catch (error) {
    return next(error);
  }
};

const getAllInventory = async (req, res, next) => {
  const { customerCodeName } = req.body;

  const conn = createTenantConnection(customerCodeName);
  const inventoryModel = conn.model("Inventory");
  const materialModel = conn.model("Material");
  const warehouseModel = conn.model("Warehouse");

  try {
    const inventory = await inventoryModel.find({});

    const allInventoriesArr = [];
    let materialListArr = [];
    let warehousesList = {};
    for (let [index, items] of inventory.entries()) {
      if (!warehousesList[items.warehouseID]) {
        let materialList = {};
        materialListArr = [];
        materialList["materialID"] = items.materialID;
        const material = await materialModel.findById(items.materialID);
        materialList["name"] = material.name;
        materialList["weight"] = items.weight;
        materialListArr.push(materialList);
        warehousesList[items.warehouseID] = materialListArr;
      } else {
        let materialList = {};
        materialListArr = warehousesList[items.warehouseID];
        materialList["materialID"] = items.materialID;
        const material = await materialModel.findById(items.materialID);
        materialList["name"] = material.name;
        materialList["weight"] = items.weight;
        materialListArr.push(materialList);
        warehousesList[items.warehouseID] = materialListArr;
      }
    }

    let allInventories = [];

    for (const item of Object.entries(warehousesList)) {
      let wList = {};
      let warehouse = await warehouseModel.findById(item[0]);
      wList["name"] = warehouse.name;
      wList["inventory"] = [];
      for (let i of item[1]) {
        let mObj = {};
        mObj["name"] = i.name;
        mObj["weight"] = i.weight;
        wList["inventory"].push(mObj);
      }
      allInventories.push(wList);
    }

    res.status(200).json({ allInventories });
  } catch (error) {
    return next(error);
  }
};

const transactionInventory = async (req, res, next) => {
  const {
    customerCodeName,
    warehouseID,
    inbound,
    materialID,
    weight,
    descriptionID,
  } = req.body;

  if (!warehouseID || !materialID || !weight || !descriptionID) {
    const error = new BadRequestError("Please provide all values");
    return next(error);
  }

  const conn = createTenantConnection(customerCodeName);
  const materialModel = conn.model("Material");
  const warehouseModel = conn.model("Warehouse");
  const warehouseOperationsModel = conn.model("WarehouseOperations");
  const warehouseOpDescModel = conn.model("WarehouseOpDesc");
  const inventoryModel = conn.model("Inventory");

  const isWarehouseExists = await warehouseModel.findById(warehouseID);
  if (!isWarehouseExists) {
    const error = new BadRequestError("Please provide a valid warehouse");
    return next(error);
  }

  const isMaterialExists = await materialModel.findById(materialID);
  if (!isMaterialExists) {
    const error = new BadRequestError("Please provide a valid material");
    return next(error);
  }

  const isWarehouseOpDescExists = await warehouseOpDescModel.findById(
    descriptionID
  );
  if (!isWarehouseOpDescExists) {
    const error = new BadRequestError("Please provide a valid description");
    return next(error);
  }

  const newWarehouseOperations = new warehouseOperationsModel({
    warehouseID,
    inbound,
    materialID,
    weight,
    descriptionID,
  });

  try {
    const session = await conn.startSession();
    session.startTransaction();

    const warehouseOperation = await newWarehouseOperations.save({ session });

    let material = await inventoryModel.findOne({ warehouseID, materialID });
    if (!material) {
      const newInventory = new inventoryModel({
        warehouseID,
        materialID,
        weight: 0,
      });
      material = await newInventory.save({ session });
    }
    let newValue = inbound
      ? material.weight + weight
      : material.weight - weight;
    const update = { weight: newValue };

    const newAmount = await inventoryModel.findByIdAndUpdate(
      material._id,
      update,
      { new: true, session }
    );

    session.commitTransaction();

    const inventory = await inventoryModel.find({});

    res.status(201).json({ warehouseOperation, inventory });
  } catch (error) {
    return next(error);
  }
};

export {
  createWarehouse,
  readWarehouse,
  updateWarehouse,
  deleteWarehouse,
  createWarehouseOpDesc,
  getAllInventory,
  transactionInventory,
};
