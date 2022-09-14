import { useAppContext } from "../../context/appContext";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const BigSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <aside className="big-sidebar">
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </aside>
  );
};

export default BigSidebar;
