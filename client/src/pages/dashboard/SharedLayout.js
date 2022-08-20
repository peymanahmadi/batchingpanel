import { Outlet, Link } from "react-router-dom";

const SharedLayout = () => {
  return (
    <section>
      <nav>
        <Link to="profile">Profile</Link>
      </nav>
      <Outlet />
    </section>
  );
};

export default SharedLayout;
