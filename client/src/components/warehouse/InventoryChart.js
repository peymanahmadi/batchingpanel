import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { MdOutlineInventory } from "react-icons/md";
import { useAppContext } from "../../context/appContext";
import { Loading } from "../shared";

const InventoryChart = () => {
  const {
    isLoadingWarehouseInventory,
    getAllInventory,
    getWarehouseInventory,
  } = useAppContext();

  const condition = {
    customerCodeName: "goldasht",
  };

  useEffect(() => {
    getAllInventory(condition);
  }, []);

  console.log(getWarehouseInventory);
  // const cat = state.options.xaxis.categories;

  return (
    <>
      <div className="dashboard-form">
        <div className="dashboard-form__header">
          <div className="dashboard-form__title">
            <MdOutlineInventory />
            <h6>Material Inventory</h6>
            {isLoadingWarehouseInventory && <Loading center />}
          </div>
        </div>
        {getWarehouseInventory.map((gwi, index) => {
          return (
            <div key={index} className="inventory-chart">
              <div className="subTitle2">{gwi.name}</div>
              <ReactApexChart
                options={{
                  chart: {
                    type: "bar",
                    // height: "auto",
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
                // height="100%"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default InventoryChart;
