import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";

const MaterialsOptions = () => {
  const { totalMaterials } = useAppContext();
  const { t } = useTranslation();
  return (
    <>
      <section className="dashboard-form-page">
        <nav>
          <h5>{t("MATERIALS")}</h5>
          <div className="navbar-controls">
            <input placeholder={t("SEARCH")} />
            <button className="btn">{t("MATERIALS.ADDMATERIAL")}</button>
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
