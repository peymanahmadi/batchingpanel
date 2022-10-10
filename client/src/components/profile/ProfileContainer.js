import { MdAccountCircle } from "react-icons/md";
import { useAppContext } from "../../context/appContext";

const ProfileContainer = () => {
  const { user } = useAppContext();
  const { firstName, lastName, email, jobTitle } = user;
  return (
    <div className="users-container">
      <div className="profile-container">
        <MdAccountCircle />
        <div className="profile">
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" value={firstName} />
        </div>
        <div className="profile">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" value={lastName} />
        </div>
        <div className="profile">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} />
        </div>
        <div className="profile">
          <label htmlFor="jobTitle">Job Title</label>
          <input type="text" name="jobTitle" value={jobTitle} />
        </div>
        <div className="profile">
          <label htmlFor="jobTitle">Password</label>
          <button className="btn-outline" style={{ width: "75%" }}>
            Change Password
          </button>
        </div>
        <div className="profile-save">
          <button className="btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
