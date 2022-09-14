import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { BsPercent } from "react-icons/bs";
import { useAppContext } from "../../context/appContext";
import { Loading, ButtonGroup } from "../shared/index";

const ProductionTolerance = () => {
  const {
    isLoadingMaterialTolerance,
    getMaterialTolerance,
    materialTolerance,
  } = useAppContext();

  const condition = {
    customerCodeName: "goldasht",
  };

  useEffect(() => {
    getMaterialTolerance(condition);
  }, []);

  const state = {
    series: [
      {
        name: materialTolerance.map((pt) => pt.name),
        data: materialTolerance.map((pt) => pt.tolerance),
      },
    ],
    options: {
      chart: {
        type: "bar",
        // height: 350,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: -100,
                to: -10,
                color: "#F1416C",
              },
              {
                from: -10,
                to: -5,
                color: "#FFC700", // Warning
              },
              {
                from: -5,
                to: 0,
                color: "#50CD89", // Green
              },
              {
                from: 0,
                to: 5,
                color: "#50CD89", // Green color
              },
              {
                from: 5,
                to: 10,
                color: "#FFC700",
              },
              {
                from: 10,
                to: 100,
                color: "#F1416C", // Red
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
      grid: {
        show: true,
        borderColor: "#eff2f5",
        strokeDashArray: 2,
      },
    },
  };

  const buttons = ["Week", "Month"];

  return (
    <div className="material-tolerance">
      <div className="material-tolerance__header">
        <div className="material-tolerance__title">
          <BsPercent />
          <h6>Material Tolerance</h6>
          {isLoadingMaterialTolerance && <Loading center />}
        </div>
        <div className="material-tolerance__condition">
          <ButtonGroup btns={buttons} />
        </div>
      </div>
      <div className="material-tolerance__content"></div>
      {materialTolerance.map((pt, index) => {
        return (
          <div key={index} className="material-tolerance__chart">
            {/* <div className={`${pt.length > 30 ? "full-width" : "half-width"}`}> */}
            <div className="full-width">
              <div>
                <div key={index} className="subTitle2 space-between">
                  <div>{pt.name}</div>
                  <div className="badge">
                    {pt.length}{" "}
                    <span>{pt.length > 1 ? "batches" : "batch"}</span>
                  </div>
                </div>
              </div>
              <ReactApexChart
                options={state.options}
                series={[{ name: pt.name, data: pt.tolerance }]}
                type="bar"
                height={150}
                className="material-tolerance__canvas"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductionTolerance;
