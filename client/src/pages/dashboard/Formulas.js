import {
  FormulasOptions,
  FormulasContainer,
  Modal,
  FormulaEditModal,
} from "../../components/shared";
import { useAppContext } from "../../context/appContext";

const Formulas = () => {
  const { openModal, hideModal } = useAppContext();
  return (
    <>
      {openModal && (
        <Modal onClose={() => hideModal()}>
          <FormulaEditModal />
        </Modal>
      )}
      <FormulasOptions />
      <FormulasContainer />
    </>
  );
};

export default Formulas;
