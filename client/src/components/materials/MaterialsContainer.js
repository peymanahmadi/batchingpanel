import { useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useAppContext } from "../../context/appContext";
import { Loading, Badge, PageBtnContainer } from "../shared";

const MaterialsContainer = () => {
  const {
    getMaterials,
    setEditMaterial,
    isLoading,
    materialsArr,
    showModal,
    showModalConfirm,
    materialSearch,
    numOfPages,
    page,
  } = useAppContext();

  const header = ["Name", "Common ID", "Available", "Actions"];

  useEffect(() => {
    getMaterials();
  }, [page, materialSearch]);

  const handleEditMaterial = (_id) => {
    setEditMaterial(_id);
    showModal();
  };

  const handleDeleteMaterial = (_id) => {
    setEditMaterial(_id);
    showModalConfirm();
  };

  return (
    <div className="users-container">
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
            {materialsArr.map((material, index) => {
              const { _id, commonMaterialID, name, description, available } =
                material;
              return (
                <tr key={index}>
                  <td className="table-row__text">
                    <div className="table-row__text">{name}</div>
                    <div className="table-subTitle">{description}</div>
                  </td>
                  <td className="table-row__text">{commonMaterialID}</td>
                  <td className="table-row__text">
                    <Badge
                      type={available ? "badge-success" : "badge-fail"}
                      content={available ? "Available" : "Not Available"}
                    />
                  </td>
                  <td className="table-row__text">
                    <div className="table-row__actions">
                      <button
                        className="table-row__actions__btn-edit"
                        onClick={() => handleEditMaterial(_id)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="table-row__actions__btn-delete"
                        onClick={() => handleDeleteMaterial(_id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {numOfPages > 1 && <PageBtnContainer />}
    </div>
  );
};

export default MaterialsContainer;
