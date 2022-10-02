import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactApexChart from "react-apexcharts";
import { BsGraphUp } from "react-icons/bs";
import { useAppContext } from "../../context/appContext";
import { Loading, ButtonGroup } from "../shared";

const ProductionChart = () => {
  const {
    isLoadingStatsDailyProduction,
    getDailyBatching,
    dailyBatchingArr,
    todayNumOfBatches,
    todayTotalBatchingWeight,
  } = useAppContext();
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState();

  const condition = {
    customerCodeName: "goldasht",
    startDate: startDate,
    endDate: Date.now(),
  };

  useEffect(() => {
    getDailyBatching(condition);
  }, [startDate]);

  const state = {
    series: [
      {
        name: "Weight",
        data: dailyBatchingArr.map((value) => value.weight),
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
          enabled: false,
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
        categories: dailyBatchingArr.map((value) => value.date),
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
  const buttons = ["Week", "Month", "Year"];

  const handlePeriodClick = (newDate) => {
    setStartDate(newDate);
  };

  return (
    <>
      <article className="stats-form daily-production">
        <div className="dashboard-card__header">
          <div className="dashboard-card__title">
            <BsGraphUp />
            <h6>Daily Production Chart</h6>
            {isLoadingStatsDailyProduction && <Loading center />}
          </div>
          <div className="dashboard-card__condition">
            <ButtonGroup btns={buttons} onPeriodClick={handlePeriodClick} />
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
                  height="90%"
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
