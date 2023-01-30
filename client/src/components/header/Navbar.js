import { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { GrShift } from "react-icons/gr";
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
          <a
            href="https://github.com/peymanahmadi/batchingpanel"
            target="_blank"
            style={{ color: "inherit" }}
          >
            <span className="icon" style={{ fontSize: "1.5rem" }}>
              <BsGithub />
            </span>
          </a>
          {/* <div
            className="user"
            ref={ref}
            // onMouseOver={() => setShowLogout(true)}
            // onMouseLeave={() => setShowLogout(false)}
            onClick={() => setShowLogout((prev) => !prev)}
          >
            <FaUserCircle />
            <p>{`${user?.firstName} ${user?.lastName}`}</p>
            <FaCaretDown />
          </div>
          {showLogout && (
            <UserMenu firstName={user?.firstName} lastName={user?.lastName} />
          )} */}
          <button
            ref={ref}
            type="button"
            className="btn btn-light"
            onClick={() => setShowLogout((prev) => !prev)}
          >
            <FaUserCircle />
            {user?.firstName} {user?.lastName}
            <FaCaretDown />
          </button>
          {showLogout && (
            <UserMenu firstName={user?.firstName} lastName={user?.lastName} />
          )}
          {/* <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              logout
            </button>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
