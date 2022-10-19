import { NavLink } from "react-router-dom";

const SimpleMenu = ({ menu }) => {
  const { id, icon, title, path } = menu;
  return (
    <li>
      <NavLink
        key={id}
        to={path}
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <span className="icon">{icon}</span>
        {title}
      </NavLink>
    </li>
  );
};

export default SimpleMenu;
