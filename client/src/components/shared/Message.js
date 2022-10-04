import React from "react";
import { useAppContext } from "../../context/appContext";

const Message = ({ content, onClose, onDelete }) => {
  const { isLoading } = useAppContext();
  return (
    <div className="message-container">
      <p>{content}</p>
      <div className="message-container__buttons">
        <button
          className="btn btn-cancel"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          className="btn btn-delete"
          onClick={onDelete}
          disabled={isLoading}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Message;
