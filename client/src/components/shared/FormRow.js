const FormRow = ({
  type,
  name,
  value,
  checked,
  handleChange,
  labelText,
  className,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        checked={checked}
        // className={`form-input ${className} ${
        //   type === "checkbox" ? "styled-checkbox" : null
        // }`}
        className={
          type === "checkbox" ? "form-checkbox" : `form-input ${className}`
        }
      />
    </div>
  );
};

export default FormRow;
