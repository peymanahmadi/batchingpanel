import { BadRequestError } from "../errors/index.js";
import createTenantConnection from "../db/batchingTenant.js";

const createFormula = async (req, res, next) => {
  const {
    customerCodeName,
    commonFormulaID,
    name,
    description,
    // version,
    creatorID,
    formulaBatchSize,
    ingredients,
  } = req.body;

  const conn = createTenantConnection(customerCodeName);
  const formulaModel = conn.model("Formula");
  const formulationModel = conn.model("Formulation");

  const newFormula = new formulaModel({
    commonFormulaID,
    name,
    description,
  });

  const newFormulation = new formulationModel({
    creatorID,
    // version,
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

const getAllFormulas = async (req, res, next) => {
  const { customerCodeName } = req.body;
  const conn = createTenantConnection(customerCodeName);
  try {
    const formulas = await conn.model("Formula").find({});
    res
      .status(200)
      .json({ formulas, totalFormulas: formulas.length, numOfPages: 1 });
  } catch (error) {
    return next(error);
  }
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
