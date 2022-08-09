import main from "../assets/images/main.svg";
import { Logo } from "../components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Landing = () => {
  const { t } = useTranslation();
  return (
    <main className="landing">
      <nav>
        <Logo />
        <div>
          <button>EN</button>
          <button>PE</button>
        </div>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>{t("landingTitle")}</h1>
          <p>
            Manage your business by installing Automatic Batching System
            packages at your feed mill factory. It is so advanced yet simple and
            smart to control and use for your teams.
          </p>
          <Link to="/login">
            <button>{t("login")}</button>
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
