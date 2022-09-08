import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import StatsForm from "./StatsForm";
import { TbSum } from "react-icons/tb";

const BatchingStats = () => {
  const { batchingNums, batchingWeight } = useAppContext();
  const { t } = useTranslation();
  return (
    <StatsForm
      handler="daily"
      color="orange"
      icon={<TbSum />}
      title={t("STATS.BATCHINGDAILYSTATS")}
      btnGroup={false}
    >
      <div className="stats-form__label">
        <h4>{batchingNums} batches</h4>
      </div>
      <div className="stats-form__label">
        <h4>{batchingWeight} kg</h4>
      </div>
    </StatsForm>
  );
};

export default BatchingStats;
