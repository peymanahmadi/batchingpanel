import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactApexChart from "react-apexcharts";
import { BsGraphUp } from "react-icons/bs";
import { useAppContext } from "../../context/appContext";
import { Loading, ButtonGroup } from "../index";

const ProductionChart = () => {
  const {
    isLoadingStatsDailyProduction,
    getDailyBatching,
    dailyBatching,
    todayNumOfBatches,
    todayTotalBatchingWeight,
  } = useAppContext();
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
      colors: ["#2196f3"],
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
        min: 0,
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      // noData: {
      //   text: "Loading...",
      // },
      grid: {
        show: false,
      },
      stroke: {
        width: 2,
      },
    },
  };

  // {t("STATS.PRODUCTIONCHART")}
  const buttons = ["Week", "Month"];

  return (
    <>
      <article className="daily-production">
        <div className="daily-production__header">
          <div className="daily-production__title">
            <BsGraphUp />
            <h6>Daily Production Chart</h6>
            {isLoadingStatsDailyProduction && <Loading center />}
          </div>
          <div className="daily-production__condition">
            <ButtonGroup btns={buttons} />
          </div>
        </div>
        <div className="daily-production__content">
          {!isLoadingStatsDailyProduction && (
            <>
              <div className="today-stats">
                <div className="subTitle2">Today stats</div>
                <div className="subTitle2">
                  {todayTotalBatchingWeight} <i>kg</i>
                </div>
                <div className="subTitle2">
                  {todayNumOfBatches}{" "}
                  {todayNumOfBatches > 1 ? "batches" : "batch"}
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
            </>
          )}
        </div>
      </article>
    </>
  );
};

export default ProductionChart;
