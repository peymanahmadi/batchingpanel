import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormRow } from "../shared";
import { useAppContext } from "../../context/appContext";
import { FaTimes, FaNutritionix } from "react-icons/fa";

const initialState = {
  commonUserID: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  jobTitle: "",
  available: true,
  customerIDs: [""],
  accessLevel: {
    isAdmin: true,
    allowDefineWarehouse: false,
    allowdefineFormula: false,
    allowCreateReports: false,
    allowManageUsers: false,
  },
};

const UserEditModal = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialState);
  const {
    isLoading,
    isEditing,
    displayAlert,
    commonUserID,
    firstName,
    lastName,
    email,
    password,
    jobTitle,
    handleChange,
    showAlert,
    hideModal,
    registerUser,
    customerID,
  } = useAppContext();

  const handleUserInput = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    handleChange({ type, name, value, checked });
  };

  const closeModal = () => {
    hideModal();
  };

  // const handleValuesChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = values;
    if (!firstName || !lastName || !email || !password) {
      displayAlert();
      return;
    }
    values.customerIDs[0] = customerID;
    const newUser = values;
    registerUser(newUser);
    hideModal();
  };

  return (
    <form className="modal-form" onSubmit={submitHandler}>
      <nav className="modal-form__header">
        <div className="modal-form__header__title">
          <FaNutritionix />
          <h5>{t("USERS.ADDUSER")}</h5>
        </div>
        <FaTimes onClick={closeModal} />
      </nav>
      <div className="modal-form__content">
        <FormRow
          name="commonUserID"
          labelText={t("USERS.COMMONUSERID")}
          type="text"
          value={commonUserID}
          // handleChange={handleValuesChange}
          handleChange={handleUserInput}
        />
        <FormRow
          name="firstName"
          labelText={t("USERS.FIRSTNAME")}
          type="text"
          value={firstName}
          // handleChange={handleValuesChange}
          handleChange={handleUserInput}
        />
        <FormRow
          name="lastName"
          labelText={t("USERS.LASTNAME")}
          type="text"
          value={lastName}
          // handleChange={handleValuesChange}
          handleChange={handleUserInput}
        />
        <FormRow
          name="email"
          labelText={t("USERS.EMAIL")}
          type="email"
          value={email}
          // handleChange={handleValuesChange}
          handleChange={handleUserInput}
        />
        <FormRow
          name="password"
          labelText={t("USERS.PASSWORD")}
          type="password"
          value={password}
          // handleChange={handleValuesChange}
          handleChange={handleUserInput}
        />
        <FormRow
          name="jobTitle"
          labelText={t("USERS.JOBTITLE")}
          type="text"
          value={jobTitle}
          // handleChange={handleValuesChange}
          handleChange={handleUserInput}
        />
        {/* <div>
          <div className="form-label">Access Level</div>
          <div>
            <input type="checkbox" name="cbAdmin" id="" />
            <span>Admin</span>
          </div>
          <div>
            <input type="checkbox" name="cbAdmin" id="" />
            Admin
          </div>
        </div> */}
        {/* <FormRow
          name="available"
          labelText={t("USERS.AVAILABLE")}
          type="checkbox"
          value={values.available}
          handleChange={handleValuesChange}
        /> */}
      </div>
      <div className="modal-form__footer">
        <button className="btn btn-block" type="submit" disabled={isLoading}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserEditModal;
