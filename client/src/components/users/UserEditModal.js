import { useTranslation } from "react-i18next";
import { FormRow, CheckBox } from "../shared";
import { useAppContext } from "../../context/appContext";
import { ImUsers } from "react-icons/im";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const UserEditModal = () => {
  const { t } = useTranslation();
  const {
    isLoading,
    isEditing,
    commonUserID,
    firstName,
    lastName,
    email,
    password,
    jobTitle,
    userAvailable,
    handleChange,
    registerUser,
    editUser,
    hideModal,
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      notify();
      return;
    }
    if (isEditing) {
      editUser();
      return;
    }
    registerUser();
  };

  const notify = () => toast.error("Please provide all required values!");

  return (
    <form className="modal-form" onSubmit={submitHandler}>
      <nav className="modal-form__header">
        <div className="modal-form__header__title">
          <ImUsers />
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
          handleChange={handleUserInput}
        />
        <FormRow
          name="firstName"
          labelText={t("USERS.FIRSTNAME")}
          type="text"
          value={firstName}
          handleChange={handleUserInput}
        />
        <FormRow
          name="lastName"
          labelText={t("USERS.LASTNAME")}
          type="text"
          value={lastName}
          handleChange={handleUserInput}
        />
        <FormRow
          name="email"
          labelText={t("USERS.EMAIL")}
          type="email"
          value={email}
          handleChange={handleUserInput}
        />
        {!isEditing && (
          <FormRow
            name="password"
            labelText={t("USERS.PASSWORD")}
            type="password"
            value={password}
            handleChange={handleUserInput}
          />
        )}
        <FormRow
          name="jobTitle"
          labelText={t("USERS.JOBTITLE")}
          type="text"
          value={jobTitle}
          handleChange={handleUserInput}
        />
        <CheckBox
          name="userAvailable"
          labelText="Available"
          checked={userAvailable}
          handleChange={handleUserInput}
        />
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
