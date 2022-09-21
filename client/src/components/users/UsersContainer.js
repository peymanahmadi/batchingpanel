import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { Loading, Badge } from "../shared";
// import User from "./User";

const UsersContainer = () => {
  const {
    getUsers,
    usersArr,
    isLoadingUsers,
    page,
    totalUsers,
    customerCodeName,
  } = useAppContext();

  const header = ["Name", "Job Title", "Available", "Actions"];

  const condition = {
    customerCodeName,
  };

  useEffect(() => {
    getUsers(customerCodeName);
  }, []);

  return (
    <div className="users-container">
      {isLoadingUsers ? (
        <Loading center />
      ) : (
        <table className="form-table">
          <thead>
            <tr className="table-header">
              {header.map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersArr.map((user, index) => {
              return (
                <tr className="table-row" key={index}>
                  <td>
                    <div className="table-row__text">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="table-subTitle">{user.email}</div>
                  </td>
                  <td className="table-row__text">{user.jobTitle}</td>
                  <td className="table-row__text">
                    <Badge
                      type={user.available ? "success" : "fail"}
                      content={user.available ? "Available" : "Not Available"}
                    />
                  </td>
                  <td>
                    <button className="btn-secondary">Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersContainer;
