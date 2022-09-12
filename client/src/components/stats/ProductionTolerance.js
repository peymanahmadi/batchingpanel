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
        // name: "Tolerance",
        name: productionTolerance.map((pt) => pt.name),
        data: productionTolerance.map((pt) => pt.tolerance),
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
        show: false,
      },
      xaxis: {
        type: "category",
        tickAmount: "datapoints",
        labels: {
          rotate: -90,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
    },
  };

  return (
    <div className="production-tolerance">
      {productionTolerance.map((pt, index) => {
        return (
          <div
            key={index}
            className={`production-tolerance__chart ${
              pt.length > 70 ? "full-width" : "half-width"
            }`}
          >
            <div>
              <div key={index} className="subTitle2">
                <span>{pt.name}</span>
                <span>{pt.length}</span>
              </div>
            </div>
            <ReactApexChart
              options={state.options}
              series={[{ name: pt.name, data: pt.tolerance }]}
              type="bar"
              height={150}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductionTolerance;
