import {
  HeadingStats,
  MaterialConsumptions,
  BatchingStats,
  BatchedFormulas,
  MaterialInventory,
  ProductionChart,
} from "../../components";

const Stats = () => {
  return (
    <div className="stats-container">
      <HeadingStats />
      <ProductionChart />
      <BatchedFormulas />
      <MaterialConsumptions />
      <BatchingStats />
      <MaterialInventory />
    </div>
  );
};

export default Stats;
