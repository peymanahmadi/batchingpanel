import { Outlet, Link } from "react-router-dom";
import { Navbar, BigSidebar, SmallSidebar } from "../../components/shared";

const SharedLayout = () => {
  return (
    <section className="shared-layout">
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </section>
  );
};

export default SharedLayout;
