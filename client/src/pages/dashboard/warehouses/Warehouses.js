import {
  WarehousesOptions,
  WarehousesContainer,
  Modal,
  WarehouseEditModal,
  MessageModal,
  Message,
} from "../../../components/shared";
import { useAppContext } from "../../../context/appContext";

const Warehouses = () => {
  const {
    openModal,
    hideModal,
    openModalConfirm,
    hideModalConfirm,
    warehouseName,
    deleteWarehouse,
  } = useAppContext();

  const handleDeleteWarehouse = () => {
    deleteWarehouse();
  };

  return (
    <>
      {openModal && (
        <Modal className="modal-one-column" onClose={() => hideModal()}>
          <WarehouseEditModal />
        </Modal>
      )}
      {openModalConfirm && (
        <MessageModal type="red" onClose={() => hideModalConfirm()}>
          <Message
            content={`Warehouse flagged for deleting ${warehouseName}`}
            onClose={() => hideModalConfirm()}
            onDelete={handleDeleteWarehouse}
          />
        </MessageModal>
      )}
      <WarehousesOptions />
      <WarehousesContainer />
    </>
  );
};

export default Warehouses;
