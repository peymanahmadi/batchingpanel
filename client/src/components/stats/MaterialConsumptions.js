import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import StatsForm from "./StatsForm";
import { TbFileSpreadsheet } from "react-icons/tb";
import Loading from "../shared/Loading";

const MaterialConsumptions = () => {
  const { getMaterialConsumption, materialConsumption, isLoading } =
    useAppContext();
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState();

  const condition = {
    customerCodeName: "goldasht",
    startDate: startDate,
    endDate: Date.now(),
  };

  const buttons = ["Day", "Week", "Month", "Year"];

  const header = ["Material", "Weight", "Tolerance"];

  useEffect(() => {
    getMaterialConsumption(condition);
  }, [startDate]);

  const handlePeriodClick = (newDate) => {
    setStartDate(newDate);
    console.log(newDate);
  };

  return (
    <StatsForm
      handler="material-consumption"
      color="primary"
      icon={<TbFileSpreadsheet />}
      title={t("STATS.MATERIALCONSUMPTION")}
      btnGroup={true}
      buttons={buttons}
      onPeriodClick={handlePeriodClick}
    >
      {isLoading ? (
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
            {materialConsumption.map((material, index) => {
              return (
                <tr className="table-row" key={index}>
                  <td className="table-row__text">
                    <div className="table-row__text">{material.name}</div>
                    <div className="table-subTitle">{material.description}</div>
                  </td>
                  <td className="table-row__text">{material.weight}</td>
                  <td className="table-row__text">{material.tolerance}</td>
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
