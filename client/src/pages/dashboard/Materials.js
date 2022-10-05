import {
  MaterialsOptions,
  MaterialsContainer,
  Modal,
  MaterialEditModal,
  MessageModal,
  Message,
} from "../../components/shared";
import { useAppContext } from "../../context/appContext";

const Materials = () => {
  const {
    openModal,
    hideModal,
    openModalConfirm,
    hideModalConfirm,
    materialName,
    deleteMaterial,
  } = useAppContext();

  const handleDeleteMaterial = () => {
    deleteMaterial();
  };

  return (
    <>
      {openModal && (
        <Modal className="modal-one-column" onClose={() => hideModal()}>
          <MaterialEditModal />
        </Modal>
      )}
      {openModalConfirm && (
        <MessageModal type="red" onClose={() => hideModalConfirm()}>
          <Message
            content={`Material flagged for deleting ${materialName}`}
            onClose={() => hideModalConfirm()}
            onDelete={handleDeleteMaterial}
          />
        </MessageModal>
      )}
      <MaterialsOptions />
      <MaterialsContainer />
    </>
  );
};

export default Materials;
