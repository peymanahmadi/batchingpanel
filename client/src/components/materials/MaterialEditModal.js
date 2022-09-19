import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import { FormRow, Alert } from "../shared";

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

  const submitHandler = (e) => {
    e.preventDefault();
    if (!condition.commonMaterialID || !condition.name) {
      displayAlert();
      return;
    }
    createMaterial(condition);
    setTimeout(() => {}, 3000);
    hideModal();
  };

  return (
    <form className="modal-form" onSubmit={submitHandler}>
      <nav className="modal-form__header">
        <h5>Add Material</h5>
        <FaTimes />
      </nav>
      {showAlert && <Alert />}
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
        <button className="btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default MaterialEditModal;
