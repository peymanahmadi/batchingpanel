import { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { useAppContext } from "../../context/appContext";
import Logo from "./Logo";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser, user, customerName } = useAppContext();
  return (
    <nav className="navbar">
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
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
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.firstName}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
