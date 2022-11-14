import { useEffect } from "react";
import { FaTimes, FaWarehouse } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/appContext";
import { FormRow, CheckBox } from "../shared";

const WarehouseOpsEditModal = () => {
  const {
    isLoadingCreateWarehouse,
    editWarehouseID,
    weight,
    handleChange,
    hideModal,
    clearValues,
    warehouseOperations,
    getWarehouses,
    getMaterials,
    warehousesArr,
    materialsArr,
  } = useAppContext();

  const handleWarehouseOpsInput = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    handleChange({ type, name, value, checked });
  };

  const closeModal = () => {
    hideModal();
    clearValues();
  };

  useEffect(() => {
    getWarehouses();
    getMaterials();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    // if (!commonWarehouseID || !warehouseName) {
    //   notify();
    //   return;
    // }
    // if (isEditing) {
    //   editWarehouse();
    //   return;
    // }
    // warehouseOperations();
    console.log(e);
  };

  const notify = () => toast.error("Please provide all required values!");

  return (
    <form
      className={`modal-form ${isLoadingCreateWarehouse ? "form-loading" : ""}`}
      onSubmit={submitHandler}
      id="ware"
    >
      <nav className="modal-form__header">
        <div className="modal-form__header__title">
          <FaWarehouse />
          <h5>Warehouse Operations</h5>
        </div>
        <FaTimes onClick={closeModal} />
      </nav>
      <div className="modal-form__content">
        <div className="form-row">
          <label htmlFor="warehouse" className="form-label">
            Select Warehouse:
          </label>
          <select
            name="warehouse"
            id="warehouse"
            autoFocus
            form="ware"
            className="form-input"
          >
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
        <div className="form-row">
          <label htmlFor="material" className="form-label">
            Select Material:
          </label>
          <select name="material" id="material" className="form-input">
            {materialsArr.map((material) => {
              const { _id, name, description } = material;
              return (
                <option key={_id} value={name}>
                  {name}
                  {description}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="inbound" className="form-label">
            Choose an option:
          </label>
          <select name="inbound" id="inbound" className="form-input">
            <option value="inbound">inbound</option>
            <option value="inbound">outbound</option>
          </select>
        </div>
        {/* <FormRow
          name="warehouseName"
          labelText="Warehouse"
          type="text"
          value={warehouseName}
          handleChange={handleWarehouseOpsInput}
        /> */}
        {/* <FormRow
          name="materialName"
          labelText="Material"
          type="text"
          value={materialName}
          handleChange={handleWarehouseOpsInput}
        /> */}
        <FormRow
          name="weight"
          labelText="Weight"
          type="text"
          value={weight}
          handleChange={handleWarehouseOpsInput}
        />
        <div className="form-row">
          <label htmlFor="inbound" className="form-label">
            Choose an option:
          </label>
          <input type="text-area" className="form-input" />
        </div>
        {/* <CheckBox
          name="warehouseAvailable"
          labelText="Available"
          checked={warehouseAvailable}
          handleChange={handleWarehouseOpsInput}
        /> */}
      </div>
      <div className="modal-form__footer">
        <button
          className="btn btn-block"
          type="submit"
          disabled={isLoadingCreateWarehouse}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default WarehouseOpsEditModal;
