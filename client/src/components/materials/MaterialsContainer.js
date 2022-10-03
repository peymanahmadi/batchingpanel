import { useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useAppContext } from "../../context/appContext";
import { Modal, MaterialEditModal, Loading, Badge } from "../shared";

const MaterialsContainer = () => {
  const {
    getMaterials,
    setEditMaterial,
    isLoadingMaterials,
    materialsArr,
    showModal,
    hideModal,
    openModal,
    customerCodeName,
    alertType,
  } = useAppContext();

  const header = ["Name", "Common ID", "Available", "Actions"];

  const condition = {
    customerCodeName,
  };

  useEffect(() => {
    getMaterials(condition);
  }, [alertType === "success"]);

  const handleEditMaterial = (_id) => {
    setEditMaterial(_id);
    showModal();
  };

  return (
    <>
      {openModal && (
        <Modal className="modal-one-column" onClose={() => hideModal()}>
          <MaterialEditModal />
        </Modal>
      )}
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
                const { _id, commonMaterialID, name, description, available } =
                  material;
                return (
                  <tr className="table-row" key={index}>
                    <td>
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
                        <button className="table-row__actions__btn-delete">
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
      </div>
    </>
  );
};

export default MaterialsContainer;
