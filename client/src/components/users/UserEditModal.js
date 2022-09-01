import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import { FaTimes } from "react-icons/fa";

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
    displayAlert,
    showAlert,
    hideModal,
    registerUser,
    customerID,
  } = useAppContext();

  const handleValuesChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
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
    <form className="user-modal" onSubmit={onSubmit}>
      <nav className="header-form">
        <h5>{t("USERS.ADDUSER")}</h5>
        <FaTimes />
      </nav>
      {showAlert && <Alert />}
      <div className="userform">
        <FormRow
          name="commonUserID"
          labelText={t("USERS.COMMONUSERID")}
          type="text"
          value={values.commonUserID}
          handleChange={handleValuesChange}
        />
        <FormRow
          name="firstName"
          labelText={t("USERS.FIRSTNAME")}
          type="text"
          value={values.firstName}
          handleChange={handleValuesChange}
        />
        <FormRow
          name="lastName"
          labelText={t("USERS.LASTNAME")}
          type="text"
          value={values.lastName}
          handleChange={handleValuesChange}
        />
        <FormRow
          name="email"
          labelText={t("USERS.EMAIL")}
          type="email"
          value={values.email}
          handleChange={handleValuesChange}
        />
        <FormRow
          name="password"
          labelText={t("USERS.PASSWORD")}
          type="password"
          value={values.password}
          handleChange={handleValuesChange}
        />
        <FormRow
          name="jobTitle"
          labelText={t("USERS.JOBTITLE")}
          type="text"
          value={values.jobTitle}
          handleChange={handleValuesChange}
        />
        {/* <FormRow
          name="available"
          labelText={t("USERS.AVAILABLE")}
          type="checkbox"
          value={values.available}
          handleChange={handleValuesChange}
        /> */}
      </div>
      <div className="footer-form">
        <button type="submit" className="btn" disabled={isLoading}>
          submit
        </button>
      </div>
    </form>
  );
};

export default UserEditModal;
