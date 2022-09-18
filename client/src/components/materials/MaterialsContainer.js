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

  const header = ["Materials"];

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
            <tr>
              {header.map((h, index) => (
                <th key={index}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {materialsArr.map((mat, index) => {
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

export default MaterialsContainer;
