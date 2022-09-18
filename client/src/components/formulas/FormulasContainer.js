import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Loading from "../shared/Loading";

const FormulasContainer = () => {
  const { getFormulas, isLoadingFormulas, formulasArr, customerCodeName } =
    useAppContext();

  const header = ["Formulas"];

  const condition = {
    customerCodeName,
  };

  useEffect(() => {
    getFormulas(condition);
  }, []);

  return (
    <div className="users-container">
      {isLoadingFormulas ? (
        <Loading />
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
            {formulasArr.map((mat, index) => {
              return (
                <tr key={index}>
                  <td>{mat.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FormulasContainer;
