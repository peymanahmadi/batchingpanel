import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo, FormRow } from "../components/shared";
import { useAppContext } from "../context/appContext";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, loginUser } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
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
      }, 1);
    }
  }, [user, navigate]);

  const notify = () => toast.error("Please provide all values!");

  return (
    <main className="landing-page">
      <nav>
        <Logo />
      </nav>
      {/* <section className="login-page full-page"> */}
      <section className="login-page">
        <form
          className={isLoading ? `form form-loading` : `form`}
          onSubmit={onSubmit}
        >
          {/* <Logo /> */}
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
    </main>
  );
};

export default Login;
