import { NavLink } from "react-router-dom";

const DropdownMenu = ({ menu, handleClick }) => {
  const { icon, title, path, subMenus } = menu;

  let menuContent, subMenusContent, subMenusContents;
  if (subMenus.length) {
    subMenusContent = subMenus.map((subMenu, index) => {
      return (
        <li key={index}>
          <NavLink to={path} className="nav-link">
            <span className="icon">{icon}</span>
            {title}
          </NavLink>
        </li>
      );
    });
    subMenusContents = <ul>{subMenusContent}</ul>;
  }

  const handleMenuDropDownClick = (e) => {
    handleClick();
    //setOpen(!open);
  };

  const linkMenu = (
    <a
      href="#s"
      className="nav-link"
      onClick={(e) => {
        handleMenuDropDownClick(e);
      }}
    >
      <span className="icon">{icon}</span>
      {title}
    </a>
  );

  menuContent = (
    <>
      {linkMenu}
      {subMenusContents}
    </>
  );

  return <li>{menuContent}</li>;
};

export default DropdownMenu;
