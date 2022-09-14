import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useAppContext } from "../../context/appContext";

const InventoryChart = () => {
  const { getAllInventory, getWarehouseInventory } = useAppContext();

  const condition = {
    customerCodeName: "goldasht",
  };

  useEffect(() => {
    getAllInventory(condition);
  }, []);

  const state = {
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
        // data: getAllInventory.map(),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        // categories: [
        //   "South Korea",
        //   "Canada",
        //   "United Kingdom",
        //   "Netherlands",
        //   "Italy",
        //   "France",
        //   "Japan",
        //   "United States",
        //   "China",
        //   "Germany",
        // ],
      },
    },
  };

  console.log(getWarehouseInventory);
  const cat = state.options.xaxis.categories;

  return (
    <>
      {getWarehouseInventory.map((gwi, index) => {
        return (
          <div key={index} className="material-tolerance">
            <div>{gwi.name}</div>
            <ReactApexChart
              options={{
                chart: {
                  type: "bar",
                  height: 350,
                },
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    horizontal: true,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: gwi.inventory.map((g) => g.name),
                },
              }}
              series={[
                {
                  data: gwi.inventory.map((g) => g.weight),
                },
              ]}
              type="bar"
              height={350}
            />
          </div>
        );
      })}
    </>
  );
};

export default InventoryChart;
