import batchingTenantConn from "../db/batchingTenant.js";
import mongoose from "mongoose";

const getReportMaterialConsumptionByFormulaAndDate = async (req, res, next) => {
  const { customerCodeName, formulaID, materialID, dateFrom, dateTo } =
    req.body;
  const conn = batchingTenantConn(customerCodeName);
  const batchingModel = conn.model("Batching");
  try {
    // const materialConsumption = await batchingModel.find({
    //   formulaID,
    //   dateTime: { $gte: dateFrom },
    // });
    const materialConsumption = await batchingModel.aggregate([
      {
        $match: {
          formulaID: mongoose.Types.ObjectId(formulaID),
          "ingredients.materialID": mongoose.Types.ObjectId(materialID),
          dateTime: { $gte: new Date(dateFrom) },
        },
      },
      {
        $group: {
          _id: null,
          sum: { $sum: "$weight" },
        },
      },
    ]);
    res.status(200).json({ materialConsumption });
  } catch (error) {
    return next(error);
  }
};

export { getReportMaterialConsumptionByFormulaAndDate };
