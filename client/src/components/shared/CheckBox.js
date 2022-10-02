// const CheckBox = ({ label }) => {
const CheckBox = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  className,
}) => {
  return (
    // <label className="checkbox-container" htmlFor="">
    //   {label}
    //   <input type="checkbox" name="" id="" />
    //   <span class="checkmark"></span>
    // </label>
    <div
      className="checkbox-container"
      // style={{ display: "flex", alignItems: "center" }}
    >
      <input
        type="checkbox"
        name={name}
        // value={value}
        checked={value}
        onChange={handleChange}
        // className={`form-input ${className} ${
        //   type === "checkbox" ? "styled-checkbox" : null
        // }`}
      />
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
    </div>
  );
};

export default CheckBox;
