import { useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";
import { FormRow } from "../components";

const Form = () => {
  const { t } = useTranslation();
  return (
    <div className="form">
      <nav className="title-bar">
        <h5>{t("USERS.ADDUSER")}</h5>
        <FaTimes />
      </nav>
      <main>
        <FormRow name="firstName" labelText="first name" type="text" />
        <FormRow name="lastName" labelText="last name" type="text" />
        <FormRow name="email" type="email" />
        <FormRow name="password" type="password" />
        <FormRow name="jobTitle" labelText="job title" type="password" />
        <FormRow name="available" type="checkbox" />
      </main>
    </div>
  );
};

export default Form;
