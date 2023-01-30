import { Logo } from "../../components/shared";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { i18n } = useTranslation();

  const languageHandler = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <nav>
      <Logo />
      <div>
        <select value={i18n.language} onChange={languageHandler}>
          <option value="en-US">English</option>
          <option value="fa" className="farsi-font">
            فارسی
          </option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
