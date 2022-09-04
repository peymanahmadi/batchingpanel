import { useAppContext } from "../../context/appContext";

const BatchingStats = () => {
  const { batchingNums } = useAppContext();
  return (
    <article className="stats-form stats-batchingStats">
      <div className="stats-form__title">
        <div>Batching Statistics</div>
      </div>
      <div className="stats-form__content">
        <div>
          <h5>Batched Number</h5>
          <h4>{batchingNums}</h4>
        </div>
        <div>
          <h5>Batched Weight</h5>
          <h4>{batchingNums}</h4>
        </div>
      </div>
    </article>
  );
};

export default BatchingStats;
