import { useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useAppContext } from "../../context/appContext";
import { Loading, Badge } from "../shared";

const WarehousesContainer = () => {
  const {
    getWarehouses,
    setEditWarehouse,
    isLoading,
    warehousesArr,
    showModal,
    showModalConfirm,
  } = useAppContext();

  const header = ["Name", "Common ID", "Available", "Actions"];

  useEffect(() => {
    getWarehouses();
  }, []);

  const handleEditWarehouse = (_id) => {
    setEditWarehouse(_id);
    showModal();
  };

  const handleDeleteWarehouse = (_id) => {
    setEditWarehouse(_id);
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
            {warehousesArr.map((warehouse, index) => {
              const { _id, commonWarehouseID, name, description, available } =
                warehouse;
              return (
                <tr key={index}>
                  <td className="table-row__text">
                    <div className="table-row__text">{name}</div>
                    <div className="table-subTitle">{description}</div>
                  </td>
                  <td className="table-row__text">{commonWarehouseID}</td>
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
                        onClick={() => handleEditWarehouse(_id)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="table-row__actions__btn-delete"
                        onClick={() => handleDeleteWarehouse(_id)}
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
    </div>
  );
};

export default WarehousesContainer;
