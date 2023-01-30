import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FormRow } from "../components/shared";
import { useAppContext } from "../context/appContext";
import { Navbar } from "./index";

const ForgotPassword = () => {
  const { isLoading, forgotPassword, forgotEmail, handleChange } =
    useAppContext();

  const handleValueChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    handleChange({ type, name, value, checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error("Please provide a valid email");
      return;
    }
    forgotPassword();
  };

  return (
    <main className="landing-page">
      <Navbar />
      <section className="login-page">
        <form
          className={isLoading ? `form form-loading` : `form`}
          onSubmit={handleSubmit}
        >
          <h4>Forgot Password</h4>
          <FormRow
            type="email"
            labelText="Email"
            name="forgotEmail"
            value={forgotEmail}
            handleChange={handleValueChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "Get Reset Password Link"}
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="member-btn">
              Log In
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default ForgotPassword;
