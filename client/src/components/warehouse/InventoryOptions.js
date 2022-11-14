import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { Loading } from "../shared";

const InventoryOptions = () => {
  const ref = useRef();
  const {
    isLoading,
    getWarehouses,
    warehousesArr,
    editWarehouseID,
    handleChange,
    setEditWarehouse,
  } = useAppContext();
  const [id, setID] = useState();
  const { t } = useTranslation();
  console.log("editWarehouseID: ", editWarehouseID);
  useEffect(() => {
    getWarehouses();
    setID(false);
  }, []);

  if (!isLoading && !id) {
    // setID(true);

    console.log("isLoading: ", isLoading);
    console.log(warehousesArr);
    if (warehousesArr.length > 0) {
      const id = warehousesArr[0]._id;
      console.log(id);
      // ref.current = id;
      setEditWarehouse(id);
      //   warehousesArr.map((warehouse) => {
      //     const { _id } = warehouse;
      //     return setEditWarehouse(_id);
      //   });
    }
  }

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
