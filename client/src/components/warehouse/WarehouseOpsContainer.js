import { useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useAppContext } from "../../context/appContext";
import { Loading, Badge } from "../shared";
import moment from "moment";

const WarehouseOpsContainer = () => {
  const { isLoading, warehouseOperationsArr, getWarehouseOperations } =
    useAppContext();

  const header = ["Mateiral Name", "Weight", "Inbound", "Date", "Description"];

  useEffect(() => {
    getWarehouseOperations();
  }, []);

  const handleEditWarehouse = (_id) => {
    // setEditWarehouse(_id);
    // showModal();
  };

  const handleDeleteWarehouse = (_id) => {
    // setEditWarehouse(_id);
    // showModalConfirm();
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
            {warehouseOperationsArr.map((warehouseOps, index) => {
              const {
                _id,
                warehouseID,
                materialID,
                inbound,
                weight,
                description,
                dateTime,
              } = warehouseOps;
              const { name } = materialID;
              return (
                <tr key={index}>
                  {/* Material Name */}
                  <td className="table-row__text">
                    <div className="table-row__text">{name}</div>
                    {/* <div className="table-subTitle">{description}</div> */}
                  </td>
                  {/* Weight */}
                  <td className="table-row__text">{weight}</td>
                  {/* Inbound */}
                  <td className="table-row__text">
                    {inbound}
                    {/* <Badge
                      type={available ? "badge-success" : "badge-fail"}
                      content={available ? "Available" : "Not Available"}
                    /> */}
                  </td>
                  {/* Date */}
                  <td className="table-row__text">{dateTime}</td>
                  {/* Description */}
                  <td className="table-row__text">{description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WarehouseOpsContainer;
