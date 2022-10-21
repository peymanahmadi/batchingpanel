import { NavLink } from "react-router-dom";
import links from "../../utils/links";
import DropdownMenu from "./DropdownMenu";

const NavLinks = () => {
  return (
    <div className="nav-links">
      {links.map((menu) => {
        const { id, icon, text, type, path, subMenus } = menu;
        // if (menu.type === "header") {
        //   return <Header key={menu.title} title={menu.title} />;
        // }
        if (type === "dropdown") {
          return (
            <DropdownMenu key={id} icon={icon} text={text} subMenu={subMenus} />
          );
        }
        if (type === "simple") {
          return (
            <li key={id}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <span className="icon">{icon}</span>
                {text}
              </NavLink>
            </li>
          );
        }
      })}
    </div>
  );
};

export default NavLinks;
