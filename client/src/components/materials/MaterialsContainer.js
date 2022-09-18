import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Loading from "../shared/Loading";

const MaterialsContainer = () => {
  const {
    getMaterials,
    isLoadingMaterials,
    materialsArr,
    totalMaterials,
    customerCodeName,
  } = useAppContext();

  const header = ["Name", "Common ID", "Available", "Actions"];

  const condition = {
    customerCodeName: customerCodeName,
  };

  useEffect(() => {
    getMaterials(condition);
  }, []);

  return (
    <div className="users-container">
      {isLoadingMaterials ? (
        <Loading />
      ) : (
        <table className="stats-form__table">
          <thead>
            <tr className="table-header">
              {header.map((h, index) => (
                <th key={index}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {materialsArr.map((mat, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="table-row__text">{mat.name}</div>
                    <div className="table-subTitle">{mat.description}</div>
                  </td>
                  <td className="table-row__text">{mat.commonMaterialID}</td>
                  <td className="table-row__text">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={mat.available}
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

export default MaterialsContainer;
