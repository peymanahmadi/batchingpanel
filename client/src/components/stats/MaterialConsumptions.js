import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import StatsForm from "./StatsForm";
import { TbFileSpreadsheet } from "react-icons/tb";
import Loading from "../Loading";

const MaterialConsumptions = () => {
  const { getMaterialConsumption, materialConsumption, isLoading } =
    useAppContext();
  const { t } = useTranslation();

  const condition = {
    customerCodeName: "goldasht",
    dueDate: "2022-09-01",
  };

  const header = ["Material", "Weight", "Tolerance"];

  useEffect(() => {
    getMaterialConsumption(condition);
  }, []);

  return (
    <StatsForm
      handler="material-consumption"
      color="primary"
      icon={<TbFileSpreadsheet />}
      title={t("STATS.MATERIALCONSUMPTION")}
      btnGroup={true}
    >
      {isLoading ? (
        <Loading center />
      ) : (
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
                  <td>{mat.tolerance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </StatsForm>
  );
};

export default MaterialConsumptions;
