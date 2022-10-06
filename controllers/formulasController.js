import { BadRequestError } from "../errors/index.js";
import createTenantConnection from "../db/batchingTenant.js";

const createFormula = async (req, res, next) => {
  const {
    customerCodeName,
    commonFormulaID,
    name,
    description,
    version,
    userID,
    formulaBatchSize,
    ingredients,
  } = req.body;

  const conn = createTenantConnection(customerCodeName);
  const formulaModel = conn.model("Formula");
  const formulationModel = conn.model("Formulation");

  const newFormula = new formulaModel({
    commonFormulaID,
    version,
    name,
    description,
  });

  const newFormulation = new formulationModel({
    version,
    userID,
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

const deleteFormula = async (req, res, next) => {
  const { customerCodeName, formulaID } = req.body;
  console.log(req.body);

  const conn = createTenantConnection(customerCodeName);
  const formulaModel = conn.model("Formula");
  const formulationModel = conn.model("Formulation");

  const formula = await formulaModel.findOne({ _id: formulaID });

  if (!formula) {
    const error = new NotFoundError(`No formula with id: ${formulaID}`);
    return next(error);
  }

  try {
    await formulaModel.findByIdAndDelete(formulaID);
    res.status(200).json({ msg: "Success! Formula removed" });
  } catch (error) {
    return next(error);
  }
};

export {
  createFormula,
  getAllFormulas,
  getFormulaByID,
  updateFormula,
  deleteFormula,
};
