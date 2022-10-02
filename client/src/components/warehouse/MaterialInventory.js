import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TbFileSpreadsheet } from "react-icons/tb";
import { useAppContext } from "../../context/appContext";
import StatsForm from "../stats/StatsForm";

const MaterialInventory = () => {
  const { t } = useTranslation();
  const {
    materialInventory,
    getWarehouses,
    warehouses,
    getMaterialInventory,
    getAllInventory,
    isLoadingWarehouseInventory,
    warehouseInventory,
  } = useAppContext();

  const condition = {
    customerCodeName: "goldasht",
  };

  const condition2 = {
    customerCodeName: "goldasht",
    warehouseID: "632b72c7c21ad43357939e06",
  };

  const header = ["Material", "Weight"];

  useEffect(() => {
    getWarehouses(condition);
  }, []);

  useEffect(() => {
    if (warehouses) {
      console.log(warehouses);
      getAllInventory(condition2);
    }
  }, [warehouses]);

  return (
    <StatsForm
      handler="inventory"
      color="red"
      icon={<TbFileSpreadsheet />}
      title={t("STATS.INVENTORY")}
    >
      <select name="" id="">
        {warehouses.map((warehouse, index) => {
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
      </select>
      <table className="stats-form__table">
        <thead>
          <tr>
            {header.map((h, index) => (
              <th key={index}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {warehouseInventory.map((mat, index) => {
            return (
              <tr key={index}>
                <td>{mat.name}</td>
                <td>{mat.weight}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </StatsForm>
  );
};

export default MaterialInventory;
