import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactApexChart from "react-apexcharts";
import { BsPercent } from "react-icons/bs";
import { useAppContext } from "../../context/appContext";
import StatsForm from "./StatsForm";
import { Loading, ButtonGroup } from "../shared/index";
import moment from "moment";

const FormulaTolerance = () => {
  const {
    isLoadingFormulaTolerance,
    getFormulaTolerance,
    formulaTolerance,
    customerCodeName,
  } = useAppContext();
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(moment().startOf("day"));
  const condition = {
    customerCodeName,
    startDate,
    endDate: Date.now(),
  };

  useEffect(() => {
    getFormulaTolerance(condition);
  }, [startDate]);

  const state = {
    series: [
      {
        name: formulaTolerance.map((pt) => pt.name),
        data: formulaTolerance.map((pt) => pt.tolerance),
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
                // color: "#F1416C",
                color: "#0d47a1",
              },
              {
                from: -10,
                to: -5,
                // color: "#FFC700", // Warning
                color: "#2196f3", // Warning
              },
              {
                from: -5,
                to: 0,
                // color: "#50CD89", // Green
                color: "#90caf9", // Green
              },
              {
                from: 0,
                to: 5,
                // color: "#50CD89", // Green color
                color: "#90caf9", // Green color
              },
              {
                from: 5,
                to: 10,
                // color: "#FFC700",
                color: "#2196f3",
              },
              {
                from: 10,
                to: 100,
                // color: "#F1416C", // Red
                color: "#0d47a1", // Red
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

  const buttons = ["Day", "Week", "Month"];

  const handlePeriodClick = (newDate) => {
    setStartDate(newDate);
  };
  return (
    <StatsForm
      handler="formula-tolerance"
      color="primary"
      icon={<BsPercent />}
      title={t("STATS.FORMULATOLERANCE")}
      btnGroup={true}
      buttons={buttons}
      onPeriodClick={handlePeriodClick}
    >
      {isLoadingFormulaTolerance ? (
        <Loading center />
      ) : (
        <>
          {formulaTolerance.map((pt, index) => {
            console.log(formulaTolerance);
            return (
              <div key={index} className="material-tolerance__chart">
                {/* <div className={`${pt.length > 30 ? "full-width" : "half-width"}`}> */}
                <div className="full-width">
                  <div>
                    <div key={index} className="subTitle2 space-between">
                      <div>{pt.name}</div>
                      <div className="badge">
                        {formulaTolerance.length}{" "}
                        <span>
                          {formulaTolerance.length > 1 ? "batches" : "batch"}
                        </span>
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
        </>
      )}
    </StatsForm>
  );
};

export default FormulaTolerance;
