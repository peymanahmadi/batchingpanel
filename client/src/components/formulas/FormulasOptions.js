import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { Badge } from "../shared";

const FormulasOptions = () => {
  const { showModal, clearValues, totalFormulas } = useAppContext();
  const { t } = useTranslation();

  const handleOpenForm = () => {
    clearValues();
    showModal();
  };

  return (
    <section className="dashboard-form__options">
      <div className="dashboard-form__options__title">
        <h6>{t("FORMULAS")}</h6>
        <div>
          <Badge type="badge-success" content={totalFormulas} />
        </div>
      </div>
      <div className="navbar-controls">
        <input placeholder={t("SEARCH")} />
        <button className="btn" onClick={handleOpenForm}>
          {t("FORMULAS.ADDFORMULA")}
        </button>
      </div>
    </section>
  );
};

export default FormulasOptions;
