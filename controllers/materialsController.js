import { BadRequestError } from "../errors/index.js";
import createTenantConnection from "../db/batchingTenant.js";

const getAllMaterials = async (req, res, next) => {
  const { customerCodeName } = req.body;
  const conn = createTenantConnection(customerCodeName);
  try {
    const materials = await conn.model("Material").find({});
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
  res.send("edit material");
};

const deleteMaterial = async (req, res, next) => {
  res.send("delete material");
};

export {
  getAllMaterials,
  getMaterialByID,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
