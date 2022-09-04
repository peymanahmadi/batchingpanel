import { useAppContext } from "../../context/appContext";

const BatchedFormulas = () => {
  const { batchedFormulaArr } = useAppContext();
  const header = ["Material", "Weight"];
  return (
    <article className="stats-form stats-batchedFormula">
      <div className="stats-form__title">
        <div>Batched Formulas</div>
      </div>
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
    </article>
  );
};

export default BatchedFormulas;
