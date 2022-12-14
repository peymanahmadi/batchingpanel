import { BadRequestError, NotFoundError } from "../errors/index.js";
import createTenantConnection from "../db/batchingTenant.js";

const getAllWarehouses = async (req, res, next) => {
  const { customerCodeName } = req.body;

  const conn = createTenantConnection(customerCodeName);
  const warehouseModel = conn.model("Warehouse");

  try {
    const warehouses = await warehouseModel.find({});
    res
      .status(200)
      .json({ warehouses, totalWarehouses: warehouses.length, numOfPages: 1 });
  } catch (error) {
    return next(error);
  }
};

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

const updateWarehouse = async (req, res, next) => {
  const {
    customerCodeName,
    warehouseID,
    commonWarehouseID,
    name,
    description,
    available,
  } = req.body;

  if (!commonWarehouseID || !name) {
    const error = new BadRequestError("Please provide all required values");
    return next(error);
  }

  const conn = createTenantConnection(customerCodeName);
  const warehouseModel = conn.model("Warehouse");
  const warehouse = await warehouseModel.findOne({ _id: warehouseID });

  if (!warehouse) {
    const error = new NotFoundError(`No warehouse with id: ${warehouseID}`);
    return next(error);
  }
  try {
    const updatedWarehouse = await warehouseModel.findOneAndUpdate(
      { _id: warehouseID },
      { commonWarehouseID, name, description, available },
      { new: true, runValidators: true }
    );
    res.status(200).json({ updatedWarehouse });
  } catch (error) {
    return next(error);
  }
};

const deleteWarehouse = async (req, res, next) => {
  const { customerCodeName, warehouseID } = req.body;

  const conn = createTenantConnection(customerCodeName);
  const warehouseModel = conn.model("Warehouse");
  // const formulationModel = conn.model("Formulation");

  const warehouse = await warehouseModel.findOne({ _id: warehouseID });

  if (!warehouse) {
    const error = new NotFoundError(`No warehouse with id: ${warehouseID}`);
    return next(error);
  }

  try {
    await warehouseModel.findByIdAndDelete(warehouseID);
    res.status(200).json({ msg: "Success! Warehouse removed" });
  } catch (error) {
    return next(error);
  }
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
  const { customerCodeName, warehouseID } = req.body;

  const conn = createTenantConnection(customerCodeName);
  const inventoryModel = conn.model("Inventory");
  const materialModel = conn.model("Material");
  const warehouseModel = conn.model("Warehouse");

  try {
    const inventory = await inventoryModel.find({ warehouseID });

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
        materialList["description"] = material.description;
        materialList["available"] = material.available;
        materialList["weight"] = items.weight;
        materialListArr.push(materialList);
        warehousesList[items.warehouseID] = materialListArr;
      } else {
        let materialList = {};
        materialListArr = warehousesList[items.warehouseID];
        materialList["materialID"] = items.materialID;
        const material = await materialModel.findById(items.materialID);
        materialList["name"] = material.name;
        materialList["description"] = material.description;
        materialList["available"] = material.available;
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
        mObj["description"] = i.description;
        mObj["available"] = i.available;
        mObj["weight"] = i.weight;
        wList["inventory"].push(mObj);
      }
      allInventories.push(wList);
    }

    let ing = [];
    if (allInventories.length > 0) {
      ing = allInventories[0].inventory;
    }

    res.status(200).json({ allInventories, ing });
  } catch (error) {
    return next(error);
  }
};

const warehouseOperations = async (req, res, next) => {
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

const getWarehouseOperations = async (req, res, next) => {
  const { customerCodeName } = req.body;

  const conn = createTenantConnection(customerCodeName);
  const warehouseOperationsModel = conn.model("WarehouseOperations");

  try {
    const warehouseOperations = await warehouseOperationsModel
      .find({})
      .populate("materialID", "name")
      .populate("descriptionID", "description");

    res.status(200).json({
      warehouseOperations,
      totalWarehouseOperations: warehouseOperations.length,
      numOfPages: 1,
    });
  } catch (error) {
    return next(error);
  }
};

export {
  createWarehouse,
  getAllWarehouses,
  updateWarehouse,
  deleteWarehouse,
  createWarehouseOpDesc,
  getAllInventory,
  warehouseOperations,
  getWarehouseOperations,
};
