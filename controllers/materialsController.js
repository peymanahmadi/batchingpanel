const getAllMaterials = async (req, res, next) => {
  res.send("get all materials");
};

const getMaterialByID = async (req, res, next) => {
  res.send("get material by id");
};

const createMaterial = async (req, res, next) => {
  res.send("create material");
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
