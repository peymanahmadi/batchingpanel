import { useState } from "react";

const ButtonGroup = ({ btns }) => {
  const [btnIndex, setBtnIndex] = useState(0);

  return (
    <div className="btn-group-container">
      {btns.map((btn, index) => {
        return (
          <button
            key={index}
            onClick={() => setBtnIndex(index)}
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
