import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { Modal, FormulaEditModal } from "../shared";

const FormulasOptions = () => {
  const { openModal, showModal, hideModal, totalFormulas } = useAppContext();
  const { t } = useTranslation();
  return (
    <div>
      {openModal && (
        <Modal onClose={() => hideModal()}>
          <FormulaEditModal />
        </Modal>
      )}
      <section className="dashboard-form-page">
        <nav>
          <h5>{t("FORMULAS")}</h5>
          <div className="navbar-controls">
            <input placeholder={t("SEARCH")} />
            <button className="btn" onClick={() => showModal()}>
              {t("FORMULAS.ADDFORMULA")}
            </button>
          </div>
          <p>
            {totalFormulas} formula{totalFormulas > 1 && "s"} found
          </p>
        </nav>
      </section>
    </div>
  );
};

export default FormulasOptions;
