import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UserEditModal } from "../../components";
import { Modal } from "../../components";
import { useAppContext } from "../../context/appContext";

const Users = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState();
  const { getUsers } = useAppContext();

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleGetUsers = () => {
    getUsers();
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
          <h3>Users</h3>
          <div className="navbar-controls">
            <input placeholder="Search" />
            <button className="btn" onClick={handleOpenForm}>
              {t("USERS.ADDUSER")}
            </button>
            <button className="btn" onClick={handleGetUsers}>
              Get Users
            </button>
          </div>
        </nav>
        <main></main>
      </section>
    </>
  );
};

export default Users;
