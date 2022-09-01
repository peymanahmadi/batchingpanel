import { useTranslation } from "react-i18next";

const MaterialsOptions = () => {
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
          <p>{/* {totalUsers} user{users.length > 1 && "s"} found */}</p>
        </nav>
      </section>
    </>
  );
};

export default MaterialsOptions;
