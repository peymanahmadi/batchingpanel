import main from "../assets/images/main.svg";
import { Logo } from "../components/shared";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Landing = () => {
  const { t } = useTranslation();
  return (
    <main className="landing-page">
      <nav>
        <Logo />
        <div>
          <select>
            <option>English</option>
            <option>فارسی</option>
          </select>
        </div>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>{t("landingTitle")}</h1>
          <p>{t("LANDING.MESSAGE")}</p>
          <Link to="/login">
            <button className="btn btn-hero">{t("LANDING.GETSTARTED")}</button>
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
