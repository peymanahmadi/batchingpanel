import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { Badge } from "../shared";

const UsersOptions = () => {
  const { t } = useTranslation();
  const { showModal, clearValues, totalUsers } = useAppContext();

  const handleOpenForm = () => {
    clearValues();
    showModal();
  };

  return (
    <section className="dashboard-form__options">
      <div className="dashboard-form__options__title">
        <h6>{t("USERS")}</h6>
        <div>
          <Badge type="badge-success" content={totalUsers} />
        </div>
      </div>
      <div className="navbar-controls">
        <input placeholder={t("SEARCH")} />
        <button className="btn" onClick={handleOpenForm}>
          {t("USERS.ADDUSER")}
        </button>
      </div>
    </section>
  );
};

export default UsersOptions;
