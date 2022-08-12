import mongoose from "mongoose";
import Material from "../models/Material.js";
import { BadRequestError } from "../errors/index.js";
import createTenantConnection from "../db/tenant.js";

const getAllMaterials = async (req, res, next) => {
  res.send("get all materials");
};

const getMaterialByID = async (req, res, next) => {
  res.send("get material by id");
};

const createMaterial = async (req, res, next) => {
  const { tenant, commonMaterialID, name, description, available } = req.body;
  if (!name) {
    const error = new BadRequestError("Please provide all required values");
    return next(error);
  }

  const conn = createTenantConnection(process.env.RAW_MONGO_URL);
  console.log(conn);
  const materialModel = conn.model("Material");

  // const material = new Material({
  //   commonMaterialID,
  //   name,
  //   description,
  //   available,
  // });
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
