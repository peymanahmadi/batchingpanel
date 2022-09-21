const CheckBox = ({ label }) => {
  return (
    <label className="checkbox-container" htmlFor="">
      {label}
      <input type="checkbox" name="" id="" />
      <span class="checkmark"></span>
    </label>
  );
};

export default CheckBox;
