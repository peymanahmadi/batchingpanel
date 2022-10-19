import links from "../../utils/links";
// import links from "../../utils/MenuConfig";
import { NavLink } from "react-router-dom";
import SimpleMenu from "../menu/SimpleMenu";
import DropdownMenu from "../menu/DropdownMenu";

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon, subMenu } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

// const NavLinks = ({ toggleSidebar }) => {
//   const handleMenuDropDownClick = () => {};

//   const renderSideBarMenuItem = () => {
//     return links.map((menu, index) => {
//       let liElementList = "";
//       if (menu.type === "header") {
//         liElementList = (
//           <li className="header-menu">
//             <span>{menu.title}</span>
//           </li>
//         );
//       } else if (menu.type === "dropdown") {
//         liElementList = (
//           <DropdownMenu
//             menu={menu}
//             // active={menuItems[index].active}
//             key={"sidebar" + index}
//             handleClick={(e) => handleMenuDropDownClick(e, index)}
//           />
//         );
//       } else if (menu.type === "simple") {
//         liElementList = <SimpleMenu menu={menu} />;
//       }
//       return liElementList;
//     });
//   };

//   return (
//     <div className="nav-links">
//       <ul>{renderSideBarMenuItem()}</ul>
//     </div>
//   );
// };

export default NavLinks;
