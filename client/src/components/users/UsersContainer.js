import { useEffect } from "react";
import { MdEdit, MdDelete, MdBlock } from "react-icons/md";
import { useAppContext } from "../../context/appContext";
import { Loading, Badge } from "../shared";
import moment from "moment";
// import User from "./User";

const UsersContainer = () => {
  const {
    getUsers,
    setEditUser,
    usersArr,
    isLoadingUsers,
    page,
    totalUsers,
    showModalConfirm,
    showModal,
  } = useAppContext();

  const header = ["Name", "Job Title", "Last Login", "Available", "Actions"];

  useEffect(() => {
    getUsers();
  }, []);

  const handleEditUser = (_id) => {
    setEditUser(_id);
    showModal();
  };

  const handleDeleteUser = (_id) => {
    setEditUser(_id);
    showModalConfirm();
  };

  const handleBlockUser = (_id) => {
    setEditUser(_id);
    showModalConfirm();
  };

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
              const {
                _id,
                firstName,
                lastName,
                email,
                jobTitle,
                lastLoginAt,
                available,
              } = user;
              const date = new Date(lastLoginAt);
              var datetime = moment(date);
              // console.log(datetime);
              // console.log(moment(datetime).fromNow());
              let lastLogin = moment(datetime).fromNow();
              return (
                <tr className="table-row" key={index}>
                  <td>
                    <h6>
                      {firstName} {lastName}
                    </h6>
                    <div className="table-subTitle">{email}</div>
                  </td>
                  <td>
                    <div className="table-title">{jobTitle}</div>
                  </td>
                  <td>
                    <h6>{lastLogin}</h6>
                  </td>
                  <td className="table-row__text">
                    <Badge
                      type={available ? "badge-success" : "badge-fail"}
                      content={available ? "Available" : "Not Available"}
                    />
                  </td>
                  <td className="table-row__text">
                    <div className="table-row__actions">
                      <button
                        className="table-row__actions__btn-edit"
                        onClick={() => handleEditUser(_id)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="table-row__actions__btn-delete"
                        onClick={() => handleDeleteUser(_id)}
                      >
                        <MdDelete />
                      </button>
                      <button
                        className="table-row__actions__btn-delete"
                        onClick={() => handleBlockUser(_id)}
                      >
                        <MdBlock />
                      </button>
                    </div>
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
