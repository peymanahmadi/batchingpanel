import {
  HeadingStats,
  MaterialConsumptions,
  BatchingStats,
  BatchedFormulas,
  MaterialInventory,
  ProductionChart,
  ProductionTolerance,
} from "../../components";

const Stats = () => {
  return (
    <div className="stats-container">
      {/* <HeadingStats />
      <ProductionChart />
      <BatchedFormulas />
      <MaterialConsumptions />
      <BatchingStats />
      <MaterialInventory /> */}
      <ProductionTolerance />
    </div>
  );
};

export default Stats;
