import {
  MaterialConsumptions,
  BatchingStats,
  BatchedFormulas,
  MaterialInventory,
} from "../../components";

const Stats = () => {
  return (
    <div className="stats-container">
      <MaterialConsumptions />
      <BatchingStats />
      <BatchedFormulas />
      <MaterialInventory />
    </div>
  );
};

export default Stats;
