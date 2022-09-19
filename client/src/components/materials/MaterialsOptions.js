import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { Modal, MaterialEditModal } from "../shared";

const MaterialsOptions = () => {
  const { openModal, showModal, hideModal, totalMaterials } = useAppContext();
  const { t } = useTranslation();

  const [showForm, setShowForm] = useState();

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      {openModal && (
        <Modal className="modal-one-column" onClose={() => hideModal()}>
          <MaterialEditModal />
        </Modal>
      )}
      <section className="dashboard-form-page">
        <nav>
          <h5>{t("MATERIALS")}</h5>
          <div className="navbar-controls">
            <input placeholder={t("SEARCH")} />
            <button className="btn" onClick={() => showModal()}>
              {t("MATERIALS.ADDMATERIAL")}
            </button>
          </div>
          <p>
            {totalMaterials} material{totalMaterials.length > 1 && "s"} found
          </p>
        </nav>
      </section>
    </>
  );
};

export default MaterialsOptions;
