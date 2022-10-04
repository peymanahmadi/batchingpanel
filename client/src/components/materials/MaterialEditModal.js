import { useEffect, useState } from "react";
import { FaTimes, FaNutritionix } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import { FormRow, Alert, CheckBox, Toast } from "../shared";

// const initialState = {
//   commonMaterialID: "",
//   name: "",
//   description: "",
//   available: true,
// };

const MaterialEditModal = () => {
  const {
    isLoadingCreateMaterial,
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    commonMaterialID,
    materialName,
    materialDescription,
    materialAvailable,
    handleChange,
    clearValues,
    createMaterial,
    editMaterial,
    alertType,
    hideModal,
  } = useAppContext();
  // const [values, setValues] = useState(initialState);

  const handleMaterialInput = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    handleChange({ type, name, value, checked });
  };

  const closeModal = () => {
    hideModal();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!commonMaterialID || !materialName) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editMaterial();
      return;
    }
    createMaterial();
  };

  // useEffect(() => {
  //   if (alertType === "success") {
  //     closeModal();
  //     // setTimeout(() => {
  //     //   closeModal();
  //     // }, 3000);
  //   }
  // }, [alertType]);

  return (
    <form className="modal-form" onSubmit={submitHandler}>
      <nav className="modal-form__header">
        <div className="modal-form__header__title">
          <FaNutritionix />
          <h5>Add Material</h5>
        </div>
        <FaTimes onClick={closeModal} />
      </nav>
      {/* {showAlert && <Toast />} */}
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
          disabled={isLoadingCreateMaterial || isLoading}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MaterialEditModal;
