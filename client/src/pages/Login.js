import { useState, useEffect } from "react";
import { Logo, FormRow, Toast } from "../components/shared";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    // const id = toast.loading("Please wait...");
    loginUser({
      currentUser,
      endPoint: "login",
      alertText: "Login Successful! Redirecting...",
    });
    // toast.update(id, {
    //   render: "All is good",
    //   type: "loading",
    //   isLoading: false,
    // });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  const notify = () => toast.error("Please provide all values!");

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
    </section>
  );
};

export default Login;
