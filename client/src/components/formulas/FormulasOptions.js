import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { Modal, FormulaEditModal } from "../shared";

const FormulasOptions = () => {
  const { openModal, showModal, hideModal, totalFormulas } = useAppContext();
  const { t } = useTranslation();
  return (
    <div>
      {/* {showForm && (
        <Modal onClose={handleCloseForm}>
          <UserEditModal />
        </Modal>
      )} */}
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
            {/* <button className="btn" onClick={() => showModal()}> */}
            <button className="btn" onClick={() => showModal()}>
              {t("FORMULAS.ADDFORMULA")}
            </button>
          </div>
          <p>{/* {totalFormulas} user{users.length > 1 && "s"} found */}</p>
        </nav>
      </section>
    </div>
  );
};

export default FormulasOptions;
