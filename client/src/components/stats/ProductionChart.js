import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactApexChart from "react-apexcharts";
import { BsGraphUp } from "react-icons/bs";
import { useAppContext } from "../../context/appContext";
import { Loading, ButtonGroup } from "../shared";
import moment from "moment";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProductionChart = () => {
  const {
    isLoadingStatsDailyProduction,
    getDailyBatching,
    dailyBatchingArr,
    todayNumOfBatches,
    todayTotalBatchingWeight,
    customerCodeName,
  } = useAppContext();
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(moment().startOf("week"));
  console.log(startDate);

  const condition = {
    customerCodeName,
    startDate: startDate,
    endDate: Date.now(),
  };

  useEffect(() => {
    getDailyBatching(condition);
  }, [startDate]);

  // const state = {
  //   series: [
  //     {
  //       name: "Weight",
  //       data: dailyBatchingArr.map((value) => value.weight),
  //     },
  //   ],
  //   options: {
  //     colors: ["#2196f3"],
  //     chart: {
  //       type: "bar",
  //       toolbar: {
  //         show: false,
  //       },
  //       zoom: {
  //         enabled: false,
  //       },
  //     },
  //     plotOptions: {
  //       bar: {
  //         borderRadius: 10,
  //         dataLabels: {
  //           position: "top",
  //         },
  //       },
  //     },
  //     dataLabels: {
  //       enabled: true,
  //       formatter: function (val) {
  //         return val / 1000;
  //       },
  //       offsetY: -20,
  //       style: {
  //         fontSize: "12px",
  //         colors: ["#304758"],
  //       },
  //     },
  //     stroke: {
  //       curve: "smooth",
  //     },
  //     xaxis: {
  //       type: "datetime",
  //       categories: dailyBatchingArr.map((value) => value.date),
  //       labels: {
  //         show: false,
  //       },
  //       axisBorder: {
  //         show: false,
  //       },
  //       axisTicks: {
  //         show: false,
  //       },
  //     },
  //     tooltip: {
  //       x: {
  //         format: "dd/MM",
  //       },
  //     },
  //     yaxis: {
  //       show: false,
  //       min: 0,
  //       labels: {
  //         show: false,
  //       },
  //       axisTicks: {
  //         show: false,
  //       },
  //     },
  //     // noData: {
  //     //   text: "Loading...",
  //     // },
  //     grid: {
  //       show: false,
  //     },
  //     stroke: {
  //       width: 2,
  //     },
  //   },
  // };
  // const state = {
  //   series: [
  //     {
  //       name: "Weight",
  //       data: dailyBatchingArr.map((value) => value.weight),
  //     },
  //   ],
  //   options: {
  //     colors: ["#2196f3"],
  //     chart: {
  //       type: "area",
  //       toolbar: {
  //         show: false,
  //       },
  //       zoom: {
  //         enabled: false,
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       curve: "smooth",
  //     },
  //     xaxis: {
  //       type: "datetime",
  //       categories: dailyBatchingArr.map((value) => value.date),
  //       labels: {
  //         show: false,
  //       },
  //       axisBorder: {
  //         show: false,
  //       },
  //       axisTicks: {
  //         show: false,
  //       },
  //     },
  //     tooltip: {
  //       x: {
  //         format: "dd/MM",
  //       },
  //     },
  //     yaxis: {
  //       show: false,
  //       min: 0,
  //       labels: {
  //         show: false,
  //       },
  //       axisTicks: {
  //         show: false,
  //       },
  //     },
  //     // noData: {
  //     //   text: "Loading...",
  //     // },
  //     grid: {
  //       show: false,
  //     },
  //     stroke: {
  //       width: 2,
  //     },
  //   },
  // };

  // {t("STATS.PRODUCTIONCHART")}

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    // {
    //   name: "Page B",
    //   uv: 3000,
    //   pv: 1398,
    //   amt: 2210,
    // },
    // {
    //   name: "Page C",
    //   uv: 2000,
    //   pv: 9800,
    //   amt: 2290,
    // },
    // {
    //   name: "Page D",
    //   uv: 2780,
    //   pv: 3908,
    //   amt: 2000,
    // },
    // {
    //   name: "Page E",
    //   uv: 1890,
    //   pv: 4800,
    //   amt: 2181,
    // },
    // {
    //   name: "Page F",
    //   uv: 2390,
    //   pv: 3800,
    //   amt: 2500,
    // },
    // {
    //   name: "Page G",
    //   uv: 3490,
    //   pv: 4300,
    //   amt: 2100,
    // },
  ];

  const buttons = ["Week", "Month", "Year"];

  const handlePeriodClick = (newDate) => {
    console.log(newDate);
    setStartDate(newDate);
  };

  const dateFormatter = (date) => {
    return moment(date).format("MM/DD");
  };

  const CustomTooltip = ({ payload, label, active }) => {
    console.log("payload: ", payload);
    console.log("label: ", label);
    console.log("payload length: ", payload.length);
    if (active && payload && payload.length > 0) {
      const numOfBatches = payload[0].payload.numOfBatches;
      const weight = payload[0].payload.weight;
      return (
        <div className="barchart-tooltip">
          {/* <p className="label">{`${moment(label).format()} : ${
            payload[0].value
          }`}</p> */}
          <p className="label">{`${moment(label).format("YYYY-MM-DD")}`}</p>
          <div className="details">
            <p>{`${weight} kg`}</p>
            <p>{`${numOfBatches} ${numOfBatches > 1 ? "batches" : "batch"}`}</p>
          </div>
          {/* <p className="intro">{getIntroOfPage(label)}</p> */}
          {/* <p className="desc">Anything you want can be displayed here.</p> */}
        </div>
      );
    }

    return null;
  };

  return (
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
                {todayNumOfBatches > 1 ? <i>batches</i> : <i>batch</i>}
              </div>
            </div>
            <div className="production-chart__chart">
              <ResponsiveContainer width="100%" height={250}>
                {/* <BarChart width={50} height={100} data={dailyBatchingArr}> */}
                <BarChart
                  data={dailyBatchingArr}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <CartesianGrid vertical={false} strokeDasharray="1 3" />
                  <XAxis dataKey="date" tickFormatter={dateFormatter} />
                  <YAxis />
                  <Tooltip cursor={false} content={<CustomTooltip />} />
                  {/* <Legend /> */}
                  <Bar dataKey="weight" fill="#90caf9" barSize={25} />
                  {/* <Bar dataKey="weight" fill="#22c55e" barSize={30} /> */}
                  {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </article>
  );
};

export default ProductionChart;
