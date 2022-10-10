import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo, FormRow, Toast } from "../components/shared";
import { useAppContext } from "../context/appContext";
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
      }, 1);
    }
  }, [user, navigate]);

  const notify = () => toast.error("Please provide all values!");

  return (
    <section className="login-page full-page">
      <form
        className={isLoading ? `form form-loading` : `form`}
        onSubmit={onSubmit}
      >
        <Logo />
        <h4>Login</h4>
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
        <p>
          Forgot your password?{" "}
          <Link to="/forgot-password" className="member-btn">
            Reset Password
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
