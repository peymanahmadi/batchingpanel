import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext";

const Backdrop = ({ onClose }) => {
  return <div className="backdrop" onClick={onClose} />;
};

const ModalOverlay = ({ children, content, onSubmit }) => {
  const { t } = useTranslation();
  const { language } = useAppContext();
  return (
    <div className={language === "en" ? "english-font" : "farsi-font"}>
      <div className="modal">
        <div className={content}>{children}</div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("root");

const Modal = ({ children, onClose, onSubmit }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
