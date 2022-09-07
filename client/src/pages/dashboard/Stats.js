import {
  MaterialConsumptions,
  BatchingStats,
  BatchedFormulas,
  MaterialInventory,
  ProductionChart,
} from "../../components";

const Stats = () => {
  return (
    <div className="stats-container">
      <MaterialConsumptions />
      <BatchingStats />
      <BatchedFormulas />
      <MaterialInventory />
      <ProductionChart />
    </div>
  );
};

export default Stats;
