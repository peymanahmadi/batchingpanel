import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { Badge } from "../shared";

const MaterialsOptions = () => {
  const {
    isLoading,
    showModal,
    clearValues,
    totalMaterials,
    materialSearch,
    handleChange,
  } = useAppContext();
  const { t } = useTranslation();

  const handleOpenForm = () => {
    clearValues();
    showModal();
  };

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <section className="dashboard-form__options">
      <div className="dashboard-form__options__title">
        <div className="title-badge">
          <h6>{t("MATERIALS")}</h6>
          <div>
            <Badge type="badge-success" content={totalMaterials} />
          </div>
        </div>
        <input
          type="text"
          name="materialSearch"
          value={materialSearch}
          onChange={handleSearch}
          placeholder={t("SEARCH")}
        />
      </div>
      <div className="navbar-controls">
        <button className="btn" onClick={handleOpenForm}>
          {t("MATERIALS.ADDMATERIAL")}
        </button>
      </div>
    </section>
  );
};

export default MaterialsOptions;
