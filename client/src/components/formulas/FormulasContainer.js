import { useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useAppContext } from "../../context/appContext";
import { Loading, Badge } from "../shared";

const FormulasContainer = () => {
  const {
    getFormulas,
    setDeleteFormula,
    setEditFormula,
    isLoadingFormulas,
    formulasArr,
    showModal,
    showModalConfirm,
  } = useAppContext();

  const header = ["Name", "Common ID", "Available", "Actions"];

  useEffect(() => {
    getFormulas();
    // eslint-disable-next-line
  }, []);

  const handleEditFormula = (_id) => {
    setEditFormula(_id);
    showModal();
  };

  const handleDeleteFormula = (_id) => {
    setDeleteFormula(_id);
    showModalConfirm();
  };

  return (
    <div className="users-container">
      {isLoadingFormulas ? (
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
            {formulasArr.map((formula, index) => {
              const { _id, commonFormulaID, name, description, available } =
                formula;
              return (
                <tr key={index}>
                  <td className="table-row__text">
                    <div className="table-row__text">{name}</div>
                    <div className="table-subTitle">{description}</div>
                  </td>
                  <td className="table-row__text">{commonFormulaID}</td>
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
                        onClick={() => handleEditFormula(_id)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="table-row__actions__btn-delete"
                        onClick={() => handleDeleteFormula(_id)}
                      >
                        <MdDelete />
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

export default FormulasContainer;
