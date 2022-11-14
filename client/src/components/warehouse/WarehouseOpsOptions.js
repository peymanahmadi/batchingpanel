import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";

const WarehousesOpsOptions = () => {
  const { clearValues, showModal, getWarehouses, warehousesArr } =
    useAppContext();
  const { t } = useTranslation();
  const handleOpenForm = () => {
    clearValues();
    showModal();
  };

  useEffect(() => {
    getWarehouses();
  }, []);

  return (
    <section className="dashboard-form__options">
      <div className="dashboard-form__options__title">
        {/* <div className="title-badge"> */}
        <h6>Warehouse Operations</h6>

        {/* </div> */}
      </div>
      <div className="navbar-controls"></div>
      <div>
        <select name="warehouse" id="">
          {warehousesArr.map((warehouse) => {
            const { _id, name } = warehouse;
            return (
              <option key={_id} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
      <button className="btn" onClick={handleOpenForm}>
        Warehouse Entry
      </button>
    </section>
  );
};

export default WarehousesOpsOptions;
