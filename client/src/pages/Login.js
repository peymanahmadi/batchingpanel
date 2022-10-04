import { useState, useEffect } from "react";
import { Logo, FormRow, Toast } from "../components/shared";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, loginUser } =
    useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      // displayAlert();
      notify();
      return;
    }
    const currentUser = { email, password };
    loginUser({
      currentUser,
      endPoint: "login",
      alertText: "Login Successful! Redirecting...",
    });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  const notify = () => toast.error("Wow so easy !");

  return (
    <section className="login-page full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
        {/* {showAlert && <Toast />} */}
        {/* email input */}
        <FormRow
          type="email"
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
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          login
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Login;
