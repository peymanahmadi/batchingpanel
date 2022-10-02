import { BsLightbulbFill } from "react-icons/bs";

const BatchingMessages = () => {
  return (
    <section className="stats-form batching-messages">
      <div className="dashboard-card__header">
        <div className="dashboard-card__title">
          <BsLightbulbFill />
          <h6>At a glance</h6>
          {/* {isLoadingMaterialTolerance && <Loading center />} */}
        </div>
      </div>
      <div className="batching-messages__content">
        <p>
          batching system dashboard is a managerial assistant to monitor all
          manufacturing processes less than 1 minute.
        </p>
      </div>
    </section>
  );
};

export default BatchingMessages;
