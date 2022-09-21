import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { Loading, Badge } from "../shared";

const FormulasContainer = () => {
  const { getFormulas, isLoadingFormulas, formulasArr, customerCodeName } =
    useAppContext();

  const header = ["Name", "Common ID", "Available", "Actions"];

  const condition = {
    customerCodeName,
  };

  useEffect(() => {
    getFormulas(condition);
  }, []);

  return (
    <div className="users-container">
      {isLoadingFormulas ? (
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
            {formulasArr.map((formula, index) => {
              return (
                <tr className="table-row" key={index}>
                  <td>
                    <div className="table-row__text">{formula.name}</div>
                    <div className="table-subTitle">{formula.description}</div>
                  </td>
                  <td className="table-row__text">{formula.commonFormulaID}</td>
                  <td className="table-row__text">
                    <Badge
                      type={formula.available ? "success" : "fail"}
                      content={
                        formula.available ? "Available" : "Not Available"
                      }
                    />
                  </td>
                  <td>
                    <button className="btn-secondary">Edit</button>
                  </td>
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
