import dotenv from "dotenv";
dotenv.config();
import { BadRequestError } from "../errors/index.js";
import createTenantConnection from "../db/batchingTenant.js";
let db;

const createConnection = (customerCodeName) => {
  return db
    ? db
    : createTenantConnection(
        process.env.TENANT_MONGO_URI,
        `batching_${customerCodeName}`
      );
};

const getAllMaterials = async (req, res, next) => {
  res.send("get all materials");
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

  const conn = createConnection(customerCodeName);

  const materialModel = conn.model("Material");
  const cmIDAlreadyExists = await materialModel.findOne({ commonMaterialID });
  if (cmIDAlreadyExists) {
    const error = new BadRequestError("commonMaterialID already in use");
    return next(error);
  }

  const nameAlreadyExists = await materialModel.findOne({ name });
  if (nameAlreadyExists) {
    const error = new BadRequestError("name already in use");
    return next(error);
  }

  const materialMod = new materialModel({
    commonMaterialID,
    name,
    description,
    available,
  });

  try {
    const material = await materialMod.save();
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
