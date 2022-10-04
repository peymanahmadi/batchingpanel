import React from "react";
import ReactDom from "react-dom";
import { useAppContext } from "../../context/appContext";

const messageModalPortal = document.getElementById("messages-modal");

const Backdrop = ({ type, onClose }) => {
  return <div className={`backdrop type-${type}`} onClick={onClose} />;
};

const ModalContainer = ({ children }) => {
  const { language } = useAppContext();
  return (
    <div className={language === "en" ? "english-font" : "farsi-font"}>
      <div className="modal-message">{children}</div>
    </div>
  );
};

const MessageModal = ({ children, type, onClose }) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop type={type} onClose={onClose} />,
        messageModalPortal
      )}
      {ReactDom.createPortal(
        <ModalContainer>{children}</ModalContainer>,
        messageModalPortal
      )}
    </>
  );
};

export default MessageModal;
