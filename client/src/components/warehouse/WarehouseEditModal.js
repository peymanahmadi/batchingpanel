import { FaTimes, FaWarehouse } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/appContext";
import { FormRow, CheckBox } from "../shared";

const WarehouseEditModal = () => {
  const {
    isLoadingCreateWarehouse,
    isEditing,
    commonWarehouseID,
    warehouseName,
    warehouseDescription,
    warehouseAvailable,
    handleChange,
    createWarehouse,
    editWarehouse,
    hideModal,
    clearValues,
  } = useAppContext();

  const handleWarehouseInput = (e) => {
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (!commonWarehouseID || !warehouseName) {
      notify();
      return;
    }
    if (isEditing) {
      editWarehouse();
      return;
    }
    createWarehouse();
  };

  const notify = () => toast.error("Please provide all required values!");

  return (
    <form
      className={`modal-form ${isLoadingCreateWarehouse ? "form-loading" : ""}`}
      onSubmit={submitHandler}
    >
      <nav className="modal-form__header">
        <div className="modal-form__header__title">
          <FaWarehouse />
          <h5>Add Warehouse</h5>
        </div>
        <FaTimes onClick={closeModal} />
      </nav>
      <div className="modal-form__content">
        <FormRow
          name="commonWarehouseID"
          labelText="Common Warehouse ID"
          type="text"
          value={commonWarehouseID}
          handleChange={handleWarehouseInput}
        />
        <FormRow
          name="warehouseName"
          labelText="Name"
          type="text"
          value={warehouseName}
          handleChange={handleWarehouseInput}
        />
        <FormRow
          name="warehouseDescription"
          labelText="Description"
          type="text"
          value={warehouseDescription}
          handleChange={handleWarehouseInput}
        />
        <CheckBox
          name="warehouseAvailable"
          labelText="Available"
          checked={warehouseAvailable}
          handleChange={handleWarehouseInput}
        />
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

export default WarehouseEditModal;
