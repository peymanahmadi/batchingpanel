import main from "../assets/images/main.svg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Navbar } from "./index";

const Landing = () => {
  const { t } = useTranslation();

  return (
    <main className="landing-page">
      <Navbar />
      <div className="container page">
        <div className="info">
          <h1>{t("LANDING.Title")}</h1>
          <p>{t("LANDING.MESSAGE")}</p>
          <Link to="/login">
            <button className="btn btn-primary btn-hero">
              {t("LANDING.LOGIN")}
            </button>
          </Link>
        </div>
        <img
          src={main}
          alt="batching automation system data management"
          className="img main-img"
        />
      </div>
    </main>
  );
};

export default Landing;
