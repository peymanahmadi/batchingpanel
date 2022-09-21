import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { Loading, Badge } from "../shared";

const MaterialsContainer = () => {
  const { getMaterials, isLoadingMaterials, materialsArr, customerCodeName } =
    useAppContext();

  const header = ["Name", "Common ID", "Available", "Actions"];

  const condition = {
    customerCodeName,
  };

  useEffect(() => {
    getMaterials(condition);
  }, []);

  return (
    <div className="users-container">
      {isLoadingMaterials ? (
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
            {materialsArr.map((material, index) => {
              return (
                <tr className="table-row" key={index}>
                  <td>
                    <div className="table-row__text">{material.name}</div>
                    <div className="table-subTitle">{material.description}</div>
                  </td>
                  <td className="table-row__text">
                    {material.commonMaterialID}
                  </td>
                  <td className="table-row__text">
                    <Badge
                      type={material.available ? "success" : "fail"}
                      content={
                        material.available ? "Available" : "Not Available"
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

export default MaterialsContainer;
