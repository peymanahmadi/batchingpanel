import { useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router-dom";

const DropDownMenu = ({ icon, text, subMenu }) => {
  const [showSubMenu, setShowSubMenu] = useState();

  const handleSubMenu = () => {
    setShowSubMenu((prev) => !showSubMenu);
  };

  return (
    <>
      <div onClick={handleSubMenu}>
        <li
          className="nav-link"
          style={{ cursor: "pointer", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="icon">{icon}</span>
            <div>{text}</div>
          </div>
          <span className="arrow">
            {showSubMenu ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </span>
        </li>
      </div>
      {showSubMenu && (
        <div>
          {subMenu.map((sub) => {
            return (
              <li key={sub.id}>
                <NavLink
                  to={sub.path}
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link sub-nav-link active"
                      : "nav-link sub-nav-link"
                  }
                >
                  {sub.text}
                </NavLink>
              </li>
            );
          })}
        </div>
      )}
    </>
  );
};

export default DropDownMenu;
