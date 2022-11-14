import {
  InventoryOptions,
  InventoryContainer,
} from "../../../components/shared";
import { useAppContext } from "../../../context/appContext";

const WarehouseInventory = () => {
  const { isLoading, editWarehouseID } = useAppContext();
  return (
    <div>
      <InventoryOptions />
      {!isLoading && <InventoryContainer />}
    </div>
  );
};

export default WarehouseInventory;
