import dotenv from "dotenv";
dotenv.config();
import { BadRequestError } from "../errors/index.js";
import createTenantConnection from "../db/batchingTenant.js";

const createConnection = (customerCodeName) => {
  let db;
  return db
    ? db
    : createTenantConnection(
        process.env.TENANT_MONGO_URI,
        `batching_${customerCodeName}`
      );
};

const createFormula = async (req, res, next) => {
  const {
    customerCodeName,
    commonFormulaID,
    name,
    description,
    creatorID,
    formulaBatchSize,
    ingredients,
  } = req.body;

  const conn = createConnection(customerCodeName);
  const formulaModel = conn.model("Formula");
  const formulationModel = conn.model("Formulation");

  const newFormula = new formulaModel({
    commonFormulaID,
    name,
    description,
  });

  const newFormulation = new formulationModel({
    creatorID,
    formulaBatchSize,
    ingredients,
  });
  try {
    const session = await conn.startSession();
    session.startTransaction();

    const formula = await newFormula.save({ session });

    newFormulation.formulaID = formula._id;

    const formulation = await newFormulation.save({ session });

    session.commitTransaction();

    res.status(201).json({ formula, formulation });
  } catch (error) {
    return next(error);
  }
};

const getAllFormulas = (req, res, next) => {
  res.send("get all formulas");
};

const getFormulaByID = (req, res, next) => {
  res.send("get formula by id");
};

const updateFormula = (req, res, next) => {
  res.send("update formula");
};

const deleteFormula = (req, res, next) => {
  res.send("delete formula");
};

export {
  createFormula,
  getAllFormulas,
  getFormulaByID,
  updateFormula,
  deleteFormula,
};