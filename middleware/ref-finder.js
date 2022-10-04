import mongoose from "mongoose";

const checkIfThereIsRefToThisObjectInWholeModel = async (
  tableWeWantToDeleteObjFrom,
  ObjectId
) => {
  // find all tables and column that have reference to this table that an object needs to be to deleted from
  let tableColumnsKVP_WithRefToTheProvidedTable = [];
  mongoose.modelNames().forEach((table) => {
    console.log(table);
    const tableSchema = mongoose.model(table).schema.obj;
    for (const columnKvp of Object.entries(tableSchema)) {
      if ("ref" in columnKvp[1]) {
        const refTable = columnKvp[1]["ref"];
        if (
          refTable.toLocaleLowerCase() ===
          tableWeWantToDeleteObjFrom.toLocaleLowerCase()
        ) {
          tableColumnsKVP_WithRefToTheProvidedTable.push({
            [table]: columnKvp[0],
          });
        }
      }
    }
  });

  // from the found tables-columns, check if there is any record in any of these tables-columns that references to given object
  let tableColumnsWithIncludeProvidedObject = [];
  for (const tableColumnKVP of tableColumnsKVP_WithRefToTheProvidedTable) {
    // console.log(tableColumnKVP)
    for (const KVP of Object.entries(tableColumnKVP)) {
      const res = await mongoose.model(KVP[0]).findOne({ [KVP[1]]: ObjectId });
      if (res) {
        tableColumnsWithIncludeProvidedObject.push(tableColumnKVP);
      }
    }
  }

  return tableColumnsWithIncludeProvidedObject;
};

export default checkIfThereIsRefToThisObjectInWholeModel;
