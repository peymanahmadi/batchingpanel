import {
  MaterialConsumptions,
  BatchedFormulas,
  MaterialInventory,
  ProductionChart,
  BatchingMessages,
  MaterialTolerance,
  InventoryChart,
} from "../../components/shared";

const Stats = () => {
  return (
    <div className="stats-container">
      <ProductionChart />
      <BatchingMessages />
      {/* <BatchedFormulas /> */}
      <MaterialConsumptions />
      {/* <MaterialInventory /> */}
      <MaterialTolerance />
      {/* <InventoryChart /> */}
    </div>
  );
};

export default Stats;
