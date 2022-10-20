import React from "react";
import { useAppContext } from "../../context/appContext";

const Message = ({ content, onClose, onDelete }) => {
  const { isLoadingCreateMaterial } = useAppContext();
  return (
    <div
      className={`message-container ${
        isLoadingCreateMaterial ? "form-loading" : ""
      }`}
    >
      <p>{content}</p>
      <div className="message-container__buttons">
        <button className="btn btn-cancel" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-delete" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Message;
