import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import StatsForm from "./StatsForm";
import { TbFlask2 } from "react-icons/tb";
import Loading from "../shared/Loading";

const BatchedFormulas = () => {
  const { batchedFormulaArr, isLoading } = useAppContext();
  const { t } = useTranslation();
  const header = ["Name", "Weight(kg)"];
  return (
    <StatsForm
      handler="batched-formula"
      color="secondary"
      icon={<TbFlask2 />}
      title={t("STATS.BATCHEDFORMULAS")}
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
            {batchedFormulaArr.map((material, index) => {
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
          {batchedFormulaArr.map((mat, index) => {
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

export default BatchedFormulas;
