import { useEffect, useState } from "react";
import { FaTimes, FaNutritionix } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import { FormRow, Alert, CheckBox } from "../shared";

const initialState = {
  commonMaterialID: "",
  name: "",
  description: "",
  available: true,
};

const MaterialEditModal = () => {
  const {
    createMaterial,
    isLoadingCreateMaterial,
    customerCodeName,
    showAlert,
    displayAlert,
    alertType,
    hideModal,
  } = useAppContext();
  const [values, setValues] = useState(initialState);

  const handleValuesChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const condition = {
    customerCodeName,
    commonMaterialID: values.commonMaterialID,
    name: values.name,
    description: values.description,
    available: values.available,
  };

  const closeModal = () => {
    hideModal();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!condition.commonMaterialID || !condition.name) {
      displayAlert();
      return;
    }
    createMaterial(condition);
  };

  useEffect(() => {
    if (alertType === "success") {
      setTimeout(() => {
        closeModal();
      }, 3000);
    }
  }, [alertType]);

  return (
    <form className="modal-form" onSubmit={submitHandler}>
      <nav className="modal-form__header">
        <div className="modal-form__header__title">
          <FaNutritionix />
          <h5>Add Material</h5>
        </div>
        <FaTimes onClick={closeModal} />
      </nav>
      {showAlert && (
        <div className="modal-form__content">
          <Alert />
        </div>
      )}
      <div className="modal-form__content">
        <FormRow
          name="commonMaterialID"
          labelText="Common Mateiral ID"
          type="text"
          value={values.commonMaterialID}
          handleChange={handleValuesChange}
        />
        <FormRow
          name="name"
          labelText="Name"
          type="text"
          value={values.name}
          handleChange={handleValuesChange}
        />
        <FormRow
          name="description"
          labelText="Description"
          type="text"
          value={values.description}
          handleChange={handleValuesChange}
        />
        <FormRow
          name="available"
          labelText="Available"
          type="checkbox"
          value={values.available}
          handleChange={handleValuesChange}
        />
        {/* <CheckBox label="Available" /> */}
        {/* <input
          className="form-select"
          type="checkbox"
          name="available"
          id=""
          checked={values.available}
          onChange={handleValuesChange}
        /> */}
      </div>
      <div className="modal-form__footer">
        <button
          className="btn"
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
