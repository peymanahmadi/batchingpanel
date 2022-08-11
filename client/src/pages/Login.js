import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert } = useAppContext();
  // global state and useNavigate

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      displayAlert();
      return;
    }
    console.log(values);
  };

  return (
    <section className="login-page full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
        {showAlert && <Alert />}
        {/* email input */}
        <FormRow
          type="text"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          login
        </button>
      </form>
    </section>
  );
};

export default Login;
