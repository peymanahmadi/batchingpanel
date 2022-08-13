const createFormula = (req, res, next) => {
  res.send("create formula");
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
