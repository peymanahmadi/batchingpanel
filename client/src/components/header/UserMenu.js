import { useTranslation } from "react-i18next";
import { FaRegUser, FaGithub, FaLanguage, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const UserMenu = ({ firstName, lastName }) => {
  const { i18n } = useTranslation();
  const { user, logout } = useAppContext();
  const handleHeaderClick = (event) => {
    // do something

    event.stopPropagation();
  };
  const languageHandler = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <div className="usermenu" onClick={handleHeaderClick}>
        <div className="usermenu__user">
          <p className="usermenu__fullname">
            {user.firstName} {user.lastName}
          </p>
          <p className="usermenu__email">{user.email}</p>
        </div>
        <hr />
        <ul>
          <li>
            <Link to="/" className="usermenu__title">
              <FaRegUser />
              <p>My Profile</p>
            </Link>
          </li>
          <li className="usermenu__language">
            <div className="usermenu__title">
              <FaLanguage />
              <p>Language</p>
            </div>
            <select value={i18n.language} onChange={languageHandler}>
              <option value="en-US">English</option>
              <option value="fa" className="farsi-font">
                فارسی
              </option>
            </select>
          </li>
          <li>
            <a
              href="https://github.com/peymanahmadi/batchingpanel"
              target="_blank"
              className="usermenu__title"
            >
              <FaGithub />
              <p>Github</p>
            </a>
          </li>
          <hr />
          <li>
            <div href="#" className="usermenu__title">
              <FaSignOutAlt />
              <p>Sign out</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
