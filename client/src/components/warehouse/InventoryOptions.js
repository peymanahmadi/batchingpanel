import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { Loading } from "../shared";

const InventoryOptions = () => {
  const {
    isLoading,
    getWarehouses,
    warehousesArr,
    // editWarehouseID,
    handleChange,
    setEditWarehouse,
  } = useAppContext();
  const { t } = useTranslation();
  // console.log("editWarehouseID: ", editWarehouseID);

  useEffect(() => {
    getWarehouses();
  }, []);

  const handleSelectChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    // editWarehouseID = e.target.value;
    console.log("handleSelectChange");
    handleChange({ type, name, value, checked });
  };

  return (
    <section className="dashboard-form__options">
      <div className="dashboard-form__options__title">
        <div className="title-badge">
          <h6>Warehouse Inventory</h6>
        </div>
        <input placeholder={t("SEARCH")} />
      </div>
      <div className="navbar-controls">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <select
              // value={editWarehouseID}
              name="editWarehouseID"
              id=""
              onChange={handleSelectChange}
            >
              {warehousesArr.map((warehouse) => {
                const { _id, name } = warehouse;
                {
                  warehousesArr.length === 0 && setEditWarehouse(_id);
                }
                return (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>
    </section>
  );
};

export default InventoryOptions;
