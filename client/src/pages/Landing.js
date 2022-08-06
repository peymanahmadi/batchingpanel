import main from "../assets/images/main.svg";
import { Logo } from "../components";

const Landing = () => {
  return (
    <main className="landing">
      <nav>
        <Logo />
        <div>
          <button>EN</button>
          <button>FA</button>
        </div>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            <span>Batching</span> System Automation
          </h1>
          <p>
            Manage your business by installing Automatic Batching System
            packages at your feed mill factory. It is so advanced yet simple and
            smart to control and use for your teams.
          </p>
        </div>
        <img
          src={main}
          alt="batching automation system data management"
          className="img main-img"
        />
      </div>
    </main>
  );
};

export default Landing;
