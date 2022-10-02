const FormRow = ({ type, name, value, handleChange, labelText, className }) => {
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
        className={`form-input ${className} ${
          type === "checkbox" ? "styled-checkbox" : null
        }`}
      />
    </div>
  );
};

export default FormRow;
