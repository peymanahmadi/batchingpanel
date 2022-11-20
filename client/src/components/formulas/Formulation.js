const Formulation = ({ rawMaterials, handleListClick, handleInputChange }) => {
  return (
    <div className="list-ingredients">
      <div className="list-header">
        <div>
          <input type="checkbox" name="" id="" />
        </div>
        <div>Code</div>
        <div>Name</div>
        <div>Weight</div>
      </div>
      <ul className="ingredients">
        {rawMaterials.map((rawMaterial, index) => {
          const { selected, commonMaterialID, name, description, weight } =
            rawMaterial;
          return (
            <li
              className={`ingredients-list ${selected ? "list-active" : null}`}
              key={index}
            >
              <div>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={selected}
                  value="selected"
                  onChange={() => handleListClick(index, rawMaterial)}
                />
              </div>
              <div>{commonMaterialID}</div>
              <div>
                {name}
                <div className="table-subTitle">{description}</div>
              </div>
              <input
                className="list-input"
                type="number"
                name={commonMaterialID}
                // name={weight}
                // value={rawMaterials[index].weight || ""}
                value={weight || ""}
                onChange={(e) => handleInputChange(index, e)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Formulation;
