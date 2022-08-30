import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Loading from "../Loading";
import User from "./User";

const UsersContainer = () => {
  const { getUsers, users, isLoading, page, totalUsers, customerID } =
    useAppContext();

  useEffect(() => {
    getUsers(customerID);
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (users.length === 0) {
    return (
      <section>
        <h2>No users to display</h2>
      </section>
    );
  }
  return (
    <>
      <div className="users-container">
        <div className="users-header">
          <p>Name</p>
          <p></p>
          <p>Role</p>
          <p>Actions</p>
        </div>
        {users.map((user) => {
          return (
            <User
              key={user._id}
              firstName={user.firstName}
              lastName={user.lastName}
              jobTitle={user.jobTitle}
            />
          );
        })}
      </div>
    </>
  );
};

export default UsersContainer;
