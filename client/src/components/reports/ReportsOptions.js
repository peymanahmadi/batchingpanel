import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { FormRowSelect } from "../shared";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ReportsOptions = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const { isLoadingFormulas, getFormulas, formulasArr } = useAppContext();
  const allFormula = { name: "All" };
  useEffect(() => {
    getFormulas();
  }, []);
  const handleSearch = () => {
    if (isLoadingFormulas) return;
  };

  return (
    <section className="reports-options">
      <h6>Reports</h6>
      <div className="reports-filter">
        <FormRowSelect
          labelText="Formula"
          name="Formula"
          handleChange={handleSearch}
          list={[allFormula, ...formulasArr]}
        />
        <FormRowSelect
          labelText="Formula"
          name="Formula"
          handleChange={handleSearch}
          list={[allFormula, ...formulasArr]}
        />
        <div className="form-row">
          <label htmlFor="" className="form-label">
            Date
          </label>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            // isClearable={true}
            className="calendar"
          />
        </div>
      </div>
    </section>
  );
};

export default ReportsOptions;
