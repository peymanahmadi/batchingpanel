import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";

const MaterialConsumptions = () => {
  const { getMaterialConsumption, materialConsumption } = useAppContext();

  const condition = {
    customerCodeName: "goldasht",
    dueDate: "2022-09-03",
  };

  const header = ["Material", "Weight"];

  useEffect(() => {
    getMaterialConsumption(condition);
  }, []);

  return (
    <article className="stats-form stats-materialConsumption">
      <div className="stats-form__title">
        <div>Material Consumption</div>
      </div>
      <table className="stats-form__table">
        <thead>
          <tr>
            {header.map((h, index) => (
              <th key={index}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {materialConsumption.map((mat, index) => {
            return (
              <tr key={index}>
                <td>{mat.name}</td>
                <td>{mat.weight}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
  );
};

// const TableRow = ({ Row }) => {
//   return (
//     <tr>
//       {Row.map((val) => (
//         <td>{val}</td>
//       ))}
//     </tr>
//   );
// };

export default MaterialConsumptions;
