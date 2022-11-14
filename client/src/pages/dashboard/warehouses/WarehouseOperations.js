import {
  WarehousesOpsOptions,
  WarehouseOpsContainer,
  WarehouseOpsEditModal,
  Modal,
} from "../../../components/shared";
import { useAppContext } from "../../../context/appContext";

const WarehouseOperations = () => {
  const { openModal, hideModal } = useAppContext();
  return (
    <div>
      {openModal && (
        <Modal className="modal-one-column" onClose={() => hideModal()}>
          <WarehouseOpsEditModal />
        </Modal>
      )}
      <WarehousesOpsOptions />
      <WarehouseOpsContainer />
    </div>
  );
};

export default WarehouseOperations;
