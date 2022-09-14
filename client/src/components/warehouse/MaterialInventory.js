import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TbFileSpreadsheet } from "react-icons/tb";
import { useAppContext } from "../../context/appContext";
import StatsForm from "../stats/StatsForm";

const MaterialInventory = () => {
  const { t } = useTranslation();
  const { materialInventory, getMaterialInventory } = useAppContext();

  const condition = {
    customerCodeName: "goldasht",
  };

  const header = ["Material", "Weight"];

  useEffect(() => {
    getMaterialInventory(condition);
  }, []);

  return (
    <StatsForm
      handler="inventory"
      color="red"
      icon={<TbFileSpreadsheet />}
      title={t("STATS.INVENTORY")}
    >
      <table className="stats-form__table">
        <thead>
          <tr>
            {header.map((h, index) => (
              <th key={index}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {materialInventory.map((mat, index) => {
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
