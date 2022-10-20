import { NavLink } from "react-router-dom";

const WarehouseToolbar = () => {
  return (
    <section className="dashboard-form__options">
      <button className="btn">
        <NavLink to="/">Warehouses</NavLink>
      </button>
      <button className="btn">
        <NavLink to="/">Material Entry</NavLink>
      </button>
    </section>
  );
};

export default WarehouseToolbar;
