import { BadRequestError, NotFoundError } from "../errors/index.js";
import createTenantConnection from "../db/batchingTenant.js";
import checkIfThereIsRefToThisObjectInWholeModel from "../middleware/ref-finder.js";

const getAllMaterials = async (req, res, next) => {
  const { search } = req.query;
  const { customerCodeName } = req.body;
  const conn = createTenantConnection(customerCodeName);
  const queryObject = {};
  // add stuff based on condition
  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }

  try {
    // NO AWAIT
    let result = conn.model("Material").find(queryObject);

    // chain sort condition
    const materials = await result;
    // const materials = await conn.model("Material").find({});
    res
      .status(200)
      .json({ materials, totalMaterials: materials.length, numOfPages: 1 });
  } catch (error) {
    return next(error);
  }
};

const getMaterialByID = async (req, res, next) => {
  res.send("get material by id");
};

const createMaterial = async (req, res, next) => {
  const { customerCodeName, commonMaterialID, name, description, available } =
    req.body;

  if (!commonMaterialID || !name) {
    const error = new BadRequestError("Please provide all required values");
    return next(error);
  }

  const conn = createTenantConnection(customerCodeName);

  const materialModel = conn.model("Material");
  const cmIDAlreadyExists = await materialModel.findOne({ commonMaterialID });
  if (cmIDAlreadyExists) {
    const error = new BadRequestError("Common Material ID already in use");
    return next(error);
  }

  const nameAlreadyExists = await materialModel.findOne({ name });
  if (nameAlreadyExists) {
    const error = new BadRequestError("Name already in use");
    return next(error);
  }

  const newMaterial = new materialModel({
    commonMaterialID,
    name,
    description,
    available,
  });

  try {
    const material = await newMaterial.save();
    res.status(201).json({ material });
  } catch (error) {
    return next(error);
  }
};

const updateMaterial = async (req, res, next) => {
  const {
    customerCodeName,
    materialID,
    commonMaterialID,
    name,
    description,
    available,
  } = req.body;

  if (!commonMaterialID || !name) {
    const error = new BadRequestError("Please provide all required values");
    return next(error);
  }

  const conn = createTenantConnection(customerCodeName);
  const materialModel = conn.model("Material");
  const material = await materialModel.findOne({ _id: materialID });

  if (!material) {
    const error = new NotFoundError(`No material with id: ${materialID}`);
    return next(error);
  }
  try {
    const updatedMaterial = await materialModel.findOneAndUpdate(
      { _id: materialID },
      { commonMaterialID, name, description, available },
      { new: true, runValidators: true }
    );
    res.status(200).json({ updatedMaterial });
  } catch (error) {
    return next(error);
  }
};

const deleteMaterial = async (req, res, next) => {
  const { customerCodeName, materialID } = req.body;

  const conn = createTenantConnection(customerCodeName);
  const materialModel = conn.model("Material");
  const formulationModel = conn.model("Formulation");

  const material = await materialModel.findOne({ _id: materialID });

  if (!material) {
    const error = new NotFoundError(`No material with id: ${materialID}`);
    return next(error);
  }

  try {
    await materialModel.findByIdAndDelete(materialID);
    res.status(200).json({ msg: "Success! Material removed" });
  } catch (error) {
    return next(error);
  }
};

export {
  getAllMaterials,
  getMaterialByID,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
