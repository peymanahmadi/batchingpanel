import { FaTimes, FaNutritionix } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/appContext";
import { FormRow, CheckBox } from "../shared";

const MaterialEditModal = () => {
  const {
    isLoadingCreateMaterial,
    isEditing,
    commonMaterialID,
    materialName,
    materialDescription,
    materialAvailable,
    handleChange,
    createMaterial,
    editMaterial,
    hideModal,
    clearValues,
  } = useAppContext();

  const handleMaterialInput = (e) => {
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
    if (!commonMaterialID || !materialName) {
      notify();
      return;
    }
    if (isEditing) {
      editMaterial();
      return;
    }
    createMaterial();
  };

  const notify = () => toast.error("Please provide all required values!");

  return (
    <form
      className={`modal-form ${isLoadingCreateMaterial ? "form-loading" : ""}`}
      onSubmit={submitHandler}
    >
      <nav className="modal-form__header">
        <div className="modal-form__header__title">
          <FaNutritionix />
          <h5>Add Material</h5>
        </div>
        <FaTimes onClick={closeModal} />
      </nav>
      <div className="modal-form__content">
        <FormRow
          name="commonMaterialID"
          labelText="Common Mateiral ID"
          type="text"
          value={commonMaterialID}
          handleChange={handleMaterialInput}
        />
        <FormRow
          name="materialName"
          labelText="Name"
          type="text"
          value={materialName}
          handleChange={handleMaterialInput}
        />
        <FormRow
          name="materialDescription"
          labelText="Description"
          type="text"
          value={materialDescription}
          handleChange={handleMaterialInput}
        />
        <CheckBox
          name="materialAvailable"
          labelText="Available"
          checked={materialAvailable}
          handleChange={handleMaterialInput}
        />
      </div>
      <div className="modal-form__footer">
        <button
          className="btn btn-block"
          type="submit"
          disabled={isLoadingCreateMaterial}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MaterialEditModal;
