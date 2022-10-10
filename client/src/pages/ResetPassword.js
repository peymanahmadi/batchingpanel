import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Logo, FormRow } from "../components/shared";
import { useAppContext } from "../context/appContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { isLoading, resetPassword, newPassword, handleChange } =
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
    if (!newPassword) {
      toast.error("Please enter password");
      return;
    }
    resetPassword();
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <main className="landing-page">
      <nav>
        <Logo />
      </nav>
      <section className="login-page">
        <form
          className={isLoading ? `form form-loading` : `form`}
          onSubmit={handleSubmit}
        >
          <h4>Reset Password</h4>
          <FormRow
            type="password"
            labelText="New Password"
            name="newPassword"
            value={newPassword}
            handleChange={handleValueChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "New Password"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default ResetPassword;
