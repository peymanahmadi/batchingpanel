import { useEffect } from "react";
import { Loading, Badge } from "../shared";
import { useAppContext } from "../../context/appContext";

const InventoryContainer = () => {
  const {
    isLoadingWarehouseInventory,
    getAllInventory,
    warehouseInventoryArr,
    editWarehouseID,
  } = useAppContext();

  const header = ["Material Name", "Weight", "Available"];
  // console.log("editWarehouseID: ", editWarehouseID);
  useEffect(() => {
    // if (editWarehouseID !== "") {
    getAllInventory();
    // console.log(editWarehouseID);
    // }
  }, [editWarehouseID]);

  return (
    <div className="users-container">
      {isLoadingWarehouseInventory ? (
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
            {warehouseInventoryArr.map((inventories, index) => {
              const { _id, name, inventory } = inventories;
              return (
                <tr key={index}>
                  <td className="table-row__text">
                    <div className="table-row__text">
                      {inventory[index].name}
                    </div>
                    <div className="table-subTitle">
                      {inventory[index].description}
                    </div>
                  </td>
                  <td className="table-row__text">{inventory[index].weight}</td>
                  <td className="table-row__text">
                    <Badge
                      type={
                        inventory[index].available
                          ? "badge-success"
                          : "badge-fail"
                      }
                      content={
                        inventory[index].available
                          ? "Available"
                          : "Not Available"
                      }
                    />
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

export default InventoryContainer;
