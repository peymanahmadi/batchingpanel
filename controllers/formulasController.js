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
    available,
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
    available,
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

const getFormulaByID = async (req, res, next) => {
  const { customerCodeName, formulaID } = req.body;

  const conn = createTenantConnection(customerCodeName);
  const formulaModel = conn.model("Formula");
  const formulationModel = conn.model("Formulation");
  try {
    const formula = await formulaModel.findOne({ _id: formulaID });
    const formulation = await formulationModel.find({ formulaID });
    res.status(200).json({ formula, formulation });
  } catch (error) {
    return next(error);
  }
};

const updateFormula = async (req, res, next) => {
  const {
    customerCodeName,
    formulaID,
    commonFormulaID,
    name,
    description,
    version,
    userID,
    available,
    formulaBatchSize,
    ingredients,
  } = req.body;

  if (!commonFormulaID || !name) {
    const error = new BadRequestError("Please provide all required values");
    return next(error);
  }

  const conn = createTenantConnection(customerCodeName);
  const formulaModel = conn.model("Formula");
  const formulationModel = conn.model("Formulation");

  const formula = await formulaModel.findOne({ _id: formulaID });

  if (!formula) {
    const error = new NotFoundError(`No formula with id: ${formulaID}`);
    return next(error);
  }

  try {
    const session = await conn.startSession();
    session.startTransaction();

    const updatedFormula = await formulaModel.findOneAndUpdate(
      { _id: formulaID },
      { commonFormulaID, name, description, version, available },
      { new: true, runValidators: true, session }
    );

    const updatedFormulation = await formulationModel.findOneAndUpdate(
      { formulaID },
      { formulaBatchSize, ingredients },
      { new: true, runValidators: true, session }
    );

    session.commitTransaction();

    res.status(200).json({ updatedFormula, updatedFormulation });
  } catch (error) {
    return next(error);
  }
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
    const session = await conn.startSession();
    session.startTransaction();

    await formulaModel.findOneAndDelete({ _id: formulaID }, { session });

    const formulation = await formulationModel.findOne({ formulaID });

    if (formulation) {
      await formulationModel.findOneAndDelete({ formulaID }, { session });
    }

    session.commitTransaction();
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
