import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { Modal, UserEditModal } from "..";

const UsersOptions = () => {
  const { t } = useTranslation();
  const { users, isLoading, page, totalUsers } = useAppContext();
  const [showForm, setShowForm] = useState();

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      {showForm && (
        <Modal onClose={handleCloseForm}>
          <UserEditModal />
        </Modal>
      )}
      <section className="dashboard-form-page">
        <nav>
          <h5>{t("USERS")}</h5>
          <div className="navbar-controls">
            <input placeholder={t("SEARCH")} />
            <button className="btn" onClick={handleOpenForm}>
              {t("USERS.ADDUSER")}
            </button>
          </div>
          <p>
            {totalUsers} user{users.length > 1 && "s"} found
          </p>
        </nav>
      </section>
    </>
  );
};

export default UsersOptions;
