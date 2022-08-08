import "./assets/sass/main.scss";
import Landing from "./pages/Landing";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.dir = i18n.dir();
    document.documentElement.lang = i18n.language;

    document.title = i18n.t("documentTitle");
  }, [i18n, i18n.language]);

  return (
    <div className={i18n.language === "en" ? "english-font" : "farsi-font"}>
      <Landing />
    </div>
  );
};

export default App;
