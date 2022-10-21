import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { Badge } from "../shared";

const WarehousesOptions = () => {
  const { showModal, clearValues, totalWarehouses } = useAppContext();
  const { t } = useTranslation();

  const handleOpenForm = () => {
    clearValues();
    showModal();
  };
  return (
    <section className="dashboard-form__options">
      <div className="dashboard-form__options__title">
        <div className="title-badge">
          <h6>{t("WAREHOUSES")}</h6>
          <div>
            <Badge type="badge-success" content={totalWarehouses} />
          </div>
        </div>
        <input placeholder={t("SEARCH")} />
      </div>
      <div className="navbar-controls">
        <button className="btn" onClick={handleOpenForm}>
          {t("WAREHOUSES.ADDWAREHOUSE")}
        </button>
      </div>
    </section>
  );
};

export default WarehousesOptions;
