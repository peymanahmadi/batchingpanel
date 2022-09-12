import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useAppContext } from "../../context/appContext";

const ProductionTolerance = () => {
  const { getProductionTolerance, productionTolerance } = useAppContext();

  const condition = {
    customerCodeName: "goldasht",
  };

  useEffect(() => {
    getProductionTolerance(condition);
  }, []);

  const state = {
    series: [
      {
        name: "Cash Flow",
        data: [
          0, 2, 0, -2, 0, -5, 3, 0, 0, 5, 1, 2, 2, -3, -5, -6, -3, 6, 1, 0, 0,
          0, 2, 4, -1, -3, -6, -15, -10, -5, 0, 2, 0, -2, 0, -5, 3, 0, 0, 5, 1,
          2, 2, -3, -5, -6, -3, 6, 1, 0, 0, 0, 2, 4, -1, -3, -6, -15, -10, -5,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: -100,
                to: -10,
                color: "#F15B46",
              },
              {
                from: -10,
                to: 0,
                color: "#FEB019",
              },
            ],
          },
          columnWidth: "80%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        title: {
          text: "Growth",
        },
        // labels: {
        //   formatter: function (y) {
        //     return y.toFixed(0) + '%';
        //   },
        // },
      },
      xaxis: {
        type: "datetime",
        categories: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
          38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
          55, 56, 57, 58, 59, 60,
        ],
        // categories: function (x) {
        //   // let arr = []
        //   // for(let i = 0; i < x; i++) {
        //   //   let n = i;
        //   //   arr.push(n)
        //   // }
        //   return [1, 2, 3, 4];
        // },
        labels: {
          rotate: -90,
        },
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ProductionTolerance;
