import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import StatsForm from "./StatsForm";
import { TbFlask2 } from "react-icons/tb";

const BatchedFormulas = () => {
  const { batchedFormulaArr } = useAppContext();
  const { t } = useTranslation();
  const header = ["Material", "Weight"];
  return (
    <StatsForm
      handler="formula"
      color="secondary"
      icon={<TbFlask2 />}
      title={t("STATS.BATCHEDFORMULAS")}
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
          {batchedFormulaArr.map((mat, index) => {
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

export default BatchedFormulas;
