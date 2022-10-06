import {
  FormulasOptions,
  FormulasContainer,
  Modal,
  FormulaEditModal,
  MessageModal,
  Message,
} from "../../components/shared";
import { useAppContext } from "../../context/appContext";

const Formulas = () => {
  const {
    openModal,
    hideModal,
    openModalConfirm,
    hideModalConfirm,
    formulaName,
    deleteFormula,
  } = useAppContext();

  const handleDeleteFormula = () => {
    deleteFormula();
  };

  return (
    <>
      {openModal && (
        <Modal onClose={() => hideModal()}>
          <FormulaEditModal />
        </Modal>
      )}
      {openModalConfirm && (
        <MessageModal type="red" onClose={() => hideModalConfirm()}>
          <Message
            content={`Formula flagged for deleting ${formulaName}`}
            onClose={() => hideModalConfirm()}
            onDelete={handleDeleteFormula}
          />
        </MessageModal>
      )}
      <FormulasOptions />
      <FormulasContainer />
    </>
  );
};

export default Formulas;
