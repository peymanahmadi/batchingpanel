import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { MdGppGood, MdGppBad } from "react-icons/md";
import { Navbar } from "./index";

const Verify = () => {
  const { verificationStatus, isLoading, verifyToken } = useAppContext();

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <main className="landing-page">
      <Navbar />
      <div>
        <div className="verification">
          {isLoading && <h5>Loading...</h5>}
          {verificationStatus === "not verified" && (
            <div className="not-verified">
              <MdGppBad />
              <h5>
                There was an error, please double check your verification link.
              </h5>
            </div>
          )}
          {verificationStatus === "verified" && (
            <div className="verified">
              <div className="verified-message">
                <MdGppGood />
                <h5>Account Confirmed</h5>
              </div>
              <div className="verified-login">
                <Link to="/login">
                  <button className="btn btn-hero">Login</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Verify;
