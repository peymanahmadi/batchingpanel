import { useAppContext } from "../../context/appContext";
import { Loading } from "../shared";

const AvailableMaterials = ({ materials, handleListClick }) => {
  const { isLoading } = useAppContext();

  return (
    <div className="list-materials">
      <div className="list-header materials-list">
        <div>
          <input type="checkbox" name="" id="" />
        </div>
        <div>Code</div>
        <div>Name</div>
      </div>
      {isLoading ? (
        <Loading center />
      ) : (
        <ul className="ingredients">
          {materials !== undefined &&
            materials.map((material, index) => {
              const { selected, commonMaterialID, name, description } =
                material;
              return (
                <li
                  className={`ingredients-list materials-list ${
                    selected ? "list-active" : null
                  }`}
                  key={index}
                >
                  <div>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={selected}
                      value="selected"
                      onChange={() => handleListClick(index, material)}
                    />
                  </div>
                  <div>{commonMaterialID}</div>
                  <div>
                    {name}
                    <div className="table-subTitle">{description}</div>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default AvailableMaterials;
