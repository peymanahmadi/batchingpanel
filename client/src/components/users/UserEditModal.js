import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import { FaTimes } from "react-icons/fa";

const initialState = {
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
  const { isLoading, displayAlert, showAlert, registerUser, customerID } =
    useAppContext();

  const handleValuesChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(customerID);
    const { firstName, lastName, email, password } = values;
    if (!firstName || !lastName || !email || !password) {
      displayAlert();
      return;
    }
    values.customerIDs[0] = customerID;
    const newUser = values;
    console.log(newUser);
    registerUser(newUser);
  };

  // useEffect(() => {

  // }, [])

  return (
    <form className="userform" onSubmit={onSubmit}>
      <nav className="title-bar">
        <h5>{t("USERS.ADDUSER")}</h5>
        <FaTimes />
      </nav>
      {showAlert && <Alert />}
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
      <FormRow
        name="available"
        labelText={t("USERS.AVAILABLE")}
        type="checkbox"
        value={values.available}
        handleChange={handleValuesChange}
      />
      <button type="submit" className="btn btn-block" disabled={isLoading}>
        submit
      </button>
    </form>
  );
};

export default UserEditModal;
