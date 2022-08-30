import { FaUserCircle } from "react-icons/fa";

const User = ({ firstName, lastName, jobTitle }) => {
  return (
    <div className="user-container">
      <div className="user-avatar">
        <FaUserCircle />
      </div>

      <div className="user-title">
        <h5>
          {firstName} {lastName}
        </h5>
      </div>

      <div className="user-jobTitle">
        <p>{jobTitle}</p>
      </div>

      <div className="user-edit">
        <button className="btn btn-edit">Edit</button>
        <button className="btn btn-delete">Delete</button>
      </div>
    </div>
  );
};

export default User;
