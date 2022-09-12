import { useTranslation } from "react-i18next";
import ReactApexChart from "react-apexcharts";
import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";

const ProductionChart = () => {
  const { getDailyBatching, dailyBatching } = useAppContext();
  const { t } = useTranslation();

  const condition = {
    customerCodeName: "goldasht",
  };

  useEffect(() => {
    getDailyBatching(condition);
  }, []);

  const state = {
    series: [
      {
        name: "Weight",
        data: dailyBatching.map((value) => value.weight),
      },
    ],
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: false,
        },
        zoom: {
          enabl: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: dailyBatching.map((value) => value.date),
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      tooltip: {
        x: {
          format: "dd/MM",
        },
      },
      yaxis: {
        show: false,
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      noData: {
        text: "Loading...",
      },
      grid: {
        show: false,
      },
      stroke: {
        width: 2,
      },
    },
  };

  // {t("STATS.PRODUCTIONCHART")}

  return (
    <div className="production-chart">
      <div className="production-chart__title">
        <h5>Production Chart</h5>
        <div className="subTitle2 muted">
          Nums and Weight of Daily Batchings
        </div>
      </div>
      <div className="production-chart__chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          className="chart-canvas"
          height="100%"
        />
      </div>
    </div>
  );
};

export default ProductionChart;
