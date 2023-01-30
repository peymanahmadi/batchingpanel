import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormRow } from "../components/shared";
import { useAppContext } from "../context/appContext";
import { toast } from "react-toastify";
import { Navbar } from "./index";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const { t } = useTranslation();
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
      <Navbar />
      {/* <section className="login-page full-page"> */}
      <section className="login-page">
        <form
          className={isLoading ? `form form-loading` : `form`}
          onSubmit={onSubmit}
        >
          {/* <Logo /> */}
          <h4>{t("LOGIN.Title")}</h4>
          {/* email input */}
          <FormRow
            labelText={t("LOGIN.Email")}
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          {/* password input */}
          <FormRow
            labelText={t("LOGIN.Password")}
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {t("LOGIN.Title")}
          </button>
          <button
            type="submit"
            className="btn btn-secondary btn-block"
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              const currentUser = {
                email: "demo@thingssolution.com",
                password: "demouser",
              };
              loginUser({
                currentUser,
                endPoint: "login",
                alertText: "Login Successful! Redirecting...",
              });
            }}
          >
            {t("LOGIN.Demo")}
          </button>
          <p>
            {t("LOGIN.ForgetPassword")}{" "}
            <Link to="/forgot-password" className="member-btn">
              {t("LOGIN.ResetPassword")}
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
