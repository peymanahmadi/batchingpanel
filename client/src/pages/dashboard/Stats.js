import {
  MaterialConsumptions,
  BatchedFormulas,
  MaterialInventory,
  ProductionChart,
  BatchingMessages,
  MaterialTolerance,
  FormulaTolerance,
  InventoryChart,
} from "../../components/shared";

const Stats = () => {
  return (
    <div className="stats-container">
      <ProductionChart />
      <BatchingMessages />
      {/* <MaterialConsumptions /> */}
      {/* <BatchedFormulas /> */}
      {/* <MaterialTolerance /> */}
      {/* <MaterialInventory /> */}
      {/* <FormulaTolerance /> */}
      {/* <InventoryChart /> */}
    </div>
  );
};

export default Stats;
