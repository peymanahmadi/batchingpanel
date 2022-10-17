import {
  UsersOptions,
  UsersContainer,
  Modal,
  UserEditModal,
} from "../../components/shared";
import { useAppContext } from "../../context/appContext";

const Users = () => {
  const { openModal, hideModal, openModalConfirm, hideModalConfirm } =
    useAppContext();
  return (
    <>
      {openModal && (
        <Modal className="modal-one-column" onClose={() => hideModal()}>
          <UserEditModal />
        </Modal>
      )}
      <UsersOptions />
      <UsersContainer />
    </>
  );
};

export default Users;
