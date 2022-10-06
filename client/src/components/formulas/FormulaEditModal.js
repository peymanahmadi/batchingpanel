import { useEffect, useState } from "react";
import { FaTimes, FaFlask } from "react-icons/fa";
import { FormRow, CheckBox, Loading } from "../shared";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { useAppContext } from "../../context/appContext";

const FormulaEditModal = () => {
  const {
    isLoading,
    isEditing,
    commonFormulaID,
    formulaVersion,
    formulaName,
    formulaDescription,
    formulaBatchSize,
    formulaAvailable,
    handleChange,
    hideModal,
    getMaterials,
    createFormula,
    availableMaterialsArr,
  } = useAppContext();

  const [materials, setMaterials] = useState();
  const [startLoading, setStartLoading] = useState();
  const [rawMaterials, setRawMaterials] = useState([]);

  const handleFormulaInput = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    console.log(type, name, value, checked);
    handleChange({ type, name, value, checked });
  };

  useEffect(() => {
    getMaterials();
  }, []);

  useEffect(() => {
    if (
      availableMaterialsArr !== undefined &&
      availableMaterialsArr.length > 0
    ) {
      setMaterials(availableMaterialsArr);
      console.log("here", availableMaterialsArr);
      setStartLoading(true);
    }
  }, [availableMaterialsArr]);

  const closeModal = () => {
    setMaterials([]);
    setRawMaterials([]);
    setStartLoading(false);
    hideModal();
  };

  const handleMoveLeft = () => {
    const newData = materials.filter((material) => {
      return material.selected !== true;
    });
    materials.map((material) => {
      if (material.selected) {
        material.selected = false;
        material.weight = null;
        setRawMaterials((prevState) => [...prevState, material]);
      }
    });
    setMaterials(newData);
  };

  const handleMoveRight = () => {
    const newData = rawMaterials.filter((rawMaterial) => {
      return rawMaterial.selected !== true;
    });
    rawMaterials.map((rawMaterial) => {
      if (rawMaterial.selected) {
        rawMaterial.selected = false;
        setMaterials((prevState) => [...prevState, rawMaterial]);
      }
    });
    setRawMaterials(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createFormula(rawMaterials);
  };

  // console.log(materials); // imppppppppppppppppppppppppppppppp
  const handleListClick = (index, material) => {
    material.selected = !material.selected;
    setMaterials([...materials]);
  };

  const handleInputChange = (index, ingredient, e) => {
    rawMaterials[index].weight = e.target.value;
    rawMaterials[index].materialID = rawMaterials[index]._id;
    setRawMaterials([...rawMaterials]);
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <nav className="modal-form__header">
        <div className="modal-form__header__title">
          <FaFlask />
          <h5>Add Formula</h5>
        </div>
        <FaTimes onClick={closeModal} />
      </nav>
      <div className="modal-form__content">
        <div className="modal-form__content__inputs">
          <div className="cfi">
            <FormRow
              name="commonFormulaID"
              labelText="Common Formula ID"
              type="text"
              value={commonFormulaID}
              // handleChange={handleValuesChange}
              handleChange={handleFormulaInput}
            />
          </div>
          <div className="version">
            <FormRow
              name="formulaVersion"
              labelText="Version"
              type="text"
              value={formulaVersion}
              // handleChange={handleValuesChange}
              handleChange={handleFormulaInput}
            />
          </div>
          <div className="name">
            <FormRow
              name="formulaName"
              labelText="Name"
              type="text"
              value={formulaName}
              // handleChange={handleValuesChange}
              handleChange={handleFormulaInput}
            />
          </div>
          <div className="desc">
            <FormRow
              name="formulaDescription"
              labelText="Description"
              type="text"
              value={formulaDescription}
              // handleChange={handleValuesChange}
              handleChange={handleFormulaInput}
            />
          </div>
          <div className="batch-size">
            <FormRow
              name="formulaBatchSize"
              labelText="Formula Batch Size"
              type="text"
              value={formulaBatchSize}
              // handleChange={handleValuesChange}
              handleChange={handleFormulaInput}
            />
          </div>
          <div className="available">
            {/* <CheckBox
              name="formulaAvailable"
              labelText="Available"
              checked={formulaAvailable}
              handleChange={handleFormulaInput}
            /> */}
            <FormRow
              name="formulaAvailable"
              labelText="Available"
              type="checkbox"
              value={formulaAvailable}
              // handleChange={handleValuesChange}
              handleChange={handleFormulaInput}
            />
          </div>
        </div>
        <div>
          <label className="form-label">Formulation</label>
          <div className="formulation">
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
                  const { selected, commonMaterialID, name, description } =
                    rawMaterial;
                  // console.log(ingredient); // impppppppppppppppppppppppppppp
                  return (
                    <li
                      className={`ingredients-list ${
                        selected ? "list-active" : null
                      }`}
                      key={index}
                      // onClick={() => handleListClick(index, ingredient)}
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
                        // name="weight"
                        value={rawMaterials[index].weight}
                        onChange={(e) =>
                          handleInputChange(index, rawMaterial, e)
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="buttons">
              <BsChevronDoubleLeft />
              <BsChevronLeft onClick={handleMoveLeft} />
              <BsChevronRight onClick={handleMoveRight} />
              <BsChevronDoubleRight />
            </div>
            <div className="list-materials">
              <div className="list-header materials-list">
                <div>
                  <input type="checkbox" name="" id="" />
                </div>
                <div>Code</div>
                <div>Name</div>
              </div>
              {isLoading && <Loading center />}
              <ul className="ingredients">
                {startLoading &&
                  materials.map((material, index) => {
                    const { selected, commonMaterialID, name, description } =
                      material;
                    // console.log(material); // imppppppppppppppppppppppppppppppppppp
                    return (
                      <li
                        className={`ingredients-list materials-list ${
                          selected ? "list-active" : null
                        }`}
                        key={index}
                        // onClick={() => handleListClick(index, material)}
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
            </div>
          </div>
        </div>
      </div>
      <div className="modal-form__footer">
        <button className="btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormulaEditModal;
