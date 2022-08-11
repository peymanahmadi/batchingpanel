import express from "express";
const router = express.Router();

import {
  getAllMaterials,
  getMaterialByID,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../controllers/materialsController.js";

router.route("/").get(getAllMaterials).post(createMaterial);
router
  .route("/:id")
  .get(getMaterialByID)
  .patch(updateMaterial)
  .delete(deleteMaterial);

export default router;
