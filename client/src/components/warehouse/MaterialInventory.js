import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TbFileSpreadsheet } from "react-icons/tb";
import { useAppContext } from "../../context/appContext";
import StatsForm from "../stats/StatsForm";
import Loading from "../shared/Loading";

const MaterialInventory = () => {
  const { t } = useTranslation();
  const {
    isLoadingWarehouseInventory,
    materialInventory,
    getWarehouses,
    warehousesArr,
    getMaterialInventory,
    getAllInventory,
    warehouseInventoryArr,
    availableWarehousesArr,
  } = useAppContext();

  const header = ["Name", "Weight(kg)"];

  useEffect(() => {
    getWarehouses();
  }, []);

  useEffect(() => {
    if (warehousesArr) {
      getAllInventory();
    }
  }, [warehousesArr]);

  return (
    <StatsForm
      handler="material-inventory"
      color="red"
      icon={<TbFileSpreadsheet />}
      title={t("STATS.INVENTORY")}
    >
      {/* <select name="warehouse" id="">
        {warehousesArr.map((warehouse, index) => {
          return (
            <option
              style={{ padding: "1rem" }}
              key={index}
              value={warehouse._id}
            >
              {warehouse.name}
            </option>
          );
        })}
      </select> */}

      {isLoadingWarehouseInventory ? (
        <Loading center />
      ) : (
        <table className="form-table">
          <thead>
            <tr className="table-header">
              {header.map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {warehouseInventoryArr.map((material, index) => {
              return (
                <tr className="table-row" key={index}>
                  <td className="table-row__text">
                    <div className="table-row__text">{material.name}</div>
                    <div className="table-subTitle">{material.description}</div>
                  </td>
                  <td className="table-row__text">{material.weight}</td>
                  {/* <td className="table-row__text">{material.tolerance}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* <table className="stats-form__table">
        <thead>
          <tr>
            {header.map((h, index) => (
              <th key={index}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {warehouseInventoryArr.map((mat, index) => {
            return (
              <tr key={index}>
                <td>{mat.name}</td>
                <td>{mat.weight}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </StatsForm>
  );
};

export default MaterialInventory;
