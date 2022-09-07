import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import StatsForm from "./StatsForm";
import { TbFileSpreadsheet } from "react-icons/tb";

const MaterialConsumptions = () => {
  const { getMaterialConsumption, materialConsumption } = useAppContext();
  const { t } = useTranslation();

  const condition = {
    customerCodeName: "goldasht",
    dueDate: "2022-09-04",
  };

  const header = ["Material", "Weight"];

  useEffect(() => {
    getMaterialConsumption(condition);
  }, []);

  return (
    <StatsForm
      handler="material-consumption"
      color="primary"
      icon={<TbFileSpreadsheet />}
      title={t("STATS.MATERIALCONSUMPTION")}
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
          {materialConsumption.map((mat, index) => {
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

// const TableRow = ({ Row }) => {
//   return (
//     <tr>
//       {Row.map((val) => (
//         <td>{val}</td>
//       ))}
//     </tr>
//   );
// };

export default MaterialConsumptions;
