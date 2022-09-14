import {
  HeadingStats,
  MaterialConsumptions,
  BatchingStats,
  BatchedFormulas,
  MaterialInventory,
  ProductionChart,
  MaterialTolerance,
  InventoryChart,
} from "../../components";

const Stats = () => {
  return (
    <div className="stats-container">
      {/* <HeadingStats /> */}
      <ProductionChart />
      {/* <BatchedFormulas /> */}
      {/* <MaterialConsumptions /> */}
      {/* <BatchingStats /> */}
      {/* <MaterialInventory /> */}
      <MaterialTolerance />
      {/* <InventoryChart /> */}
    </div>
  );
};

export default Stats;
