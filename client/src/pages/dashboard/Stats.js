import {
  HeadingStats,
  MaterialConsumptions,
  BatchingStats,
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
      {/* <HeadingStats /> */}
      <ProductionChart />
      <BatchingMessages />
      {/* <BatchedFormulas /> */}
      <MaterialConsumptions />
      {/* <BatchingStats /> */}
      {/* <MaterialInventory /> */}
      <MaterialTolerance />
      {/* <InventoryChart /> */}
    </div>
  );
};

export default Stats;
