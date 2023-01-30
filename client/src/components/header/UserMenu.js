import { useTranslation } from "react-i18next";
import { FaRegUser, FaGithub, FaLanguage, FaSignOutAlt } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";

const UserMenu = ({ firstName, lastName }) => {
  const { i18n } = useTranslation();
  const { user } = useAppContext();
  const handleHeaderClick = (event) => {
    // do something

    event.stopPropagation();
  };
  const languageHandler = () => {};
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
            <div className="usermenu__title">
              <FaRegUser />
              <p>My Profile</p>
            </div>
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
            <div className="usermenu__title">
              <FaGithub />
              <p>Github</p>
            </div>
          </li>
          <hr />
          <li>
            <div className="usermenu__title">
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
