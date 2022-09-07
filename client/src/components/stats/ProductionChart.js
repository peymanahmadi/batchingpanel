import { useTranslation } from "react-i18next";

const ProductionChart = () => {
  const { t } = useTranslation();
  return (
    <div className="stats-form chart" style={{ background: "#9ccc65" }}>
      {t("STATS.PRODUCTIONCHART")}
    </div>
  );
};

export default ProductionChart;
