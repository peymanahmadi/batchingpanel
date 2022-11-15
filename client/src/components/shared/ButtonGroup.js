import { useState } from "react";
import moment from "moment";
// import {
//   sub,
//   startOfDay,
//   startOfWeek,
//   startOfMonth,
//   startOfYear,
// } from "date-fns";

const ButtonGroup = ({ btns, onPeriodClick }) => {
  const [btnIndex, setBtnIndex] = useState(0);

  const handleButtonClick = (index, btn) => {
    setBtnIndex(index);
    if (btn === "Day") {
      onPeriodClick(moment().startOf("day"));
    } else if (btn === "Week") {
      onPeriodClick(moment().startOf("week"));
    } else if (btn === "Month") {
      onPeriodClick(moment().startOf("month"));
    } else if (btn === "Year") {
      onPeriodClick(moment().startOf("year"));
    }
  };

  return (
    <div className="btn-group-container">
      {btns.map((btn, index) => {
        return (
          <button
            key={index}
            // onClick={() => setBtnIndex(index)}
            onClick={() => handleButtonClick(index, btn)}
            className={btnIndex === index ? "active" : null}
          >
            {btn}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
