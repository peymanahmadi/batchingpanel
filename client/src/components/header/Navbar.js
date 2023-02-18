import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsGithub, BsChevronDoubleLeft } from "react-icons/bs";
import { useAppContext } from "../../context/appContext";
import Logo from "../shared/Logo";
import UserMenu from "./UserMenu";
import useOutsideClick from "../../customHooks/useOutsideClick";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser, user, customerName } = useAppContext();

  const handleClickOutside = () => {
    setShowLogout(false);
  };

  const ref = useOutsideClick(handleClickOutside);
  return (
    <nav className="navbar">
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <BsChevronDoubleLeft />
        </button>
        <div>
          <Logo />
          <h5 className="logo-text">{customerName}</h5>
        </div>

        <div
          className="btn-container"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <button
            ref={ref}
            type="button"
            className="btn btn-light"
            onClick={() => setShowLogout((prev) => !prev)}
          >
            <FaUserCircle />
          </button>
          {showLogout && <UserMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
