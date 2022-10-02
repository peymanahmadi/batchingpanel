import { useState } from "react";
import {
  sub,
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
} from "date-fns";

const ButtonGroup = ({ btns, onPeriodClick }) => {
  const [btnIndex, setBtnIndex] = useState(0);

  const handleButtonClick = (index, btn) => {
    setBtnIndex(index);
    const now = new Date();
    if (btn === "Day") {
      onPeriodClick(
        startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate()))
      );
    }
    if (btn === "Week") {
      // onPeriodClick(
      //   sub(new Date(now.getFullYear(), now.getMonth(), now.getDate()), {
      //     weeks: 1,
      //   })
      // );
      onPeriodClick(
        startOfWeek(new Date(now.getFullYear(), now.getMonth(), now.getDate()))
      );
    }
    if (btn === "Month") {
      onPeriodClick(
        startOfMonth(new Date(now.getFullYear(), now.getMonth(), now.getDate()))
      );
    }
    if (btn === "Year") {
      onPeriodClick(
        startOfYear(new Date(now.getFullYear(), now.getMonth(), now.getDate()))
      );
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
