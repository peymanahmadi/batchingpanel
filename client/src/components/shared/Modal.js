import ReactDOM from "react-dom";
import { useAppContext } from "../../context/appContext";

const Backdrop = ({ onClose }) => {
  return <div className="backdrop" onClick={onClose} />;
};

const ModalOverlay = ({ children, className }) => {
  const { language } = useAppContext();
  return (
    <div className={language === "en" ? "english-font" : "farsi-font"}>
      <div className={`modal ${className}`}>
        <div>{children}</div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("action-modal");

const Modal = ({ children, onClose, className }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay className={className}>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
