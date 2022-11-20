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
          Batching System Dashboard is a tool used to present all important
          management KPIs (key performance indicators) in a single place, share
          insights with c-level executives in an efficient way, and empower the
          management to make fast and data-driven decisions based on the latest
          information.
        </p>
      </div>
    </section>
  );
};

export default BatchingMessages;
