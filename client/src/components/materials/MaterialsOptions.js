// import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { Modal, MaterialEditModal, Badge } from "../shared";

const MaterialsOptions = () => {
  const { openModal, showModal, clearValues, hideModal, totalMaterials } =
    useAppContext();
  const { t } = useTranslation();

  const handleOpenForm = () => {
    clearValues();
    showModal();
  };

  return (
    <section className="dashboard-form__options">
      <div className="dashboard-form__options__title">
        <h6>{t("MATERIALS")}</h6>
        <div>
          <Badge content={totalMaterials} />
        </div>
      </div>
      <div className="navbar-controls">
        <input placeholder={t("SEARCH")} />
        <button className="btn" onClick={handleOpenForm}>
          {t("MATERIALS.ADDMATERIAL")}
        </button>
      </div>
    </section>
  );
};

export default MaterialsOptions;
