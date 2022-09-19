import ReactDOM from "react-dom";
import { useAppContext } from "../../context/appContext";

const Backdrop = ({ onClose }) => {
  return <div className="backdrop" onClick={onClose} />;
};

const ModalOverlay = ({ children, content }) => {
  const { language } = useAppContext();
  return (
    <div className={language === "en" ? "english-font" : "farsi-font"}>
      <div className={`modal ${content}`}>
        <div>{children}</div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("root");

const Modal = ({ children, onClose, className }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay content={className}>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
