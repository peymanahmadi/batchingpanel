import { useEffect, useState } from "react";
import { FaTimes, FaFlask } from "react-icons/fa";
import { FormRow, Alert } from "../shared";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { useAppContext } from "../../context/appContext";

const initialState = {
  commonFormulaID: "",
  version: "",
  name: "",
  description: "",
  formulaBatchSize: 1500,
  available: true,
  ingredients: [],
};

const comb = {
  commonMaterialID: "",
  weight: 0,
};

const FormulaEditModal = () => {
  const {
    hideModal,
    getMaterials,
    createFormula,
    showAlert,
    materialsArr,
    availableMaterialsArr,
    customerCodeName,
  } = useAppContext();

  const [materials, setMaterials] = useState(availableMaterialsArr);
  const [values, setValues] = useState(initialState);
  const [ingredients, setIngredients] = useState([]);
  const [combination, setCombination] = useState(comb);
  const [ingValues, setIngValues] = useState([]);

  const condition = {
    customerCodeName,
  };

  useEffect(() => {
    getMaterials(condition);
  }, []);

  useEffect(() => {
    setMaterials(availableMaterialsArr);
  }, [availableMaterialsArr]);

  const closeModal = () => {
    setMaterials([]);
    setValues(initialState);
    setIngredients([]);
    hideModal();
  };

  const handleValuesChange = (e) => {
    console.log(e.target);
    console.log(e.target.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleMoveLeft = () => {
    const newData = materials.filter((material) => {
      return material.selected !== true;
    });
    materials.map((material) => {
      if (material.selected) {
        material.selected = false;
        material.weight = null;
        setIngredients((prevState) => [...prevState, material]);
      }
    });
    setMaterials(newData);
  };

  const handleMoveRight = () => {
    const newData = ingredients.filter((ingredient) => {
      return ingredient.selected !== true;
    });
    ingredients.map((ingredient) => {
      if (ingredient.selected) {
        ingredient.selected = false;
        setMaterials((prevState) => [...prevState, ingredient]);
      }
    });
    setIngredients(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ingredients.remove("_id");
    console.log(ingredients);
    values.ingredients = ingredients;
    values.customerCodeName = customerCodeName;
    // console.log(values);
    // setValues(prevState => [...prevState, values.ingredients])
    setValues(values);
    console.log(values);
    createFormula(values);
    // for(let i = 0; i < ingredients.length; i++){

    // }
  };

  // console.log(materials); // imppppppppppppppppppppppppppppppp
  const handleListClick = (index, material) => {
    material.selected = !material.selected;
    setMaterials([...materials]);
  };

  const handleInputChange = (index, ingredient, e) => {
    ingredients[index].weight = e.target.value;
    ingredients[index].materialID = ingredients[index]._id;
    setIngredients([...ingredients]);
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <nav className="modal-form__header">
        <div className="modal-form__header__title">
          <FaFlask />
          <h5>Add Material</h5>
        </div>
        <FaTimes onClick={closeModal} />
      </nav>
      {showAlert && (
        <div className="modal-form__content">
          <Alert />
        </div>
      )}
      <div className="modal-form__content">
        <div className="modal-form__content__inputs">
          <div className="cfi">
            <FormRow
              name="commonFormulaID"
              labelText="Common Formula ID"
              type="text"
              value={values.commonFormulaID}
              handleChange={handleValuesChange}
            />
          </div>
          <div className="version">
            <FormRow
              name="version"
              labelText="Version"
              type="text"
              value={values.version}
              handleChange={handleValuesChange}
            />
          </div>
          <div className="name">
            <FormRow
              name="name"
              labelText="Name"
              type="text"
              value={values.name}
              handleChange={handleValuesChange}
            />
          </div>
          <div className="desc">
            <FormRow
              name="description"
              labelText="Description"
              type="text"
              value={values.description}
              handleChange={handleValuesChange}
            />
          </div>
          <div className="batch-size">
            <FormRow
              name="formulaBatchSize"
              labelText="Formula Batch Size"
              type="text"
              value={values.formulaBatchSize}
              handleChange={handleValuesChange}
            />
          </div>
          <div className="available">
            <FormRow
              name="available"
              labelText="Available"
              type="checkbox"
              value={values.available}
              handleChange={handleValuesChange}
            />
          </div>
        </div>

        <div>Formulation</div>
        <div className="formulation">
          <div className="list-ingredients">
            <div className="list-header">
              <div>Code</div>
              <div>Name</div>
              <div>Weight</div>
            </div>
            <ul className="ingredients">
              {ingredients.map((ingredient, index) => {
                // console.log(ingredient); // impppppppppppppppppppppppppppp
                return (
                  <li
                    className={`ingredients-list ${
                      ingredient.selected ? "list-active" : null
                    }`}
                    key={index}
                    onClick={() => handleListClick(index, ingredient)}
                  >
                    <div>{ingredient.commonMaterialID}</div>
                    <div>
                      {ingredient.name}
                      <div className="table-subTitle">
                        {ingredient.description}
                      </div>
                    </div>
                    <input
                      className="list-input"
                      type="number"
                      name={ingredient.commonMaterialID}
                      // name="weight"
                      value={ingredients[index].weight}
                      onChange={(e) => handleInputChange(index, ingredient, e)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="buttons">
            {/* <button> */}
            <BsChevronDoubleLeft />
            {/* </button> */}
            {/* <button> */}
            <BsChevronLeft onClick={handleMoveLeft} />
            {/* </button> */}
            {/* <button> */}
            <BsChevronRight onClick={handleMoveRight} />
            {/* </button> */}
            {/* <button> */}
            <BsChevronDoubleLeft />
            {/* </button> */}
          </div>
          <div className="list-materials">
            <div className="list-header materials-list">
              <div>Code</div>
              <div>Name</div>
            </div>
            <ul className="ingredients">
              {materials.map((material, index) => {
                // console.log(material); // imppppppppppppppppppppppppppppppppppp
                return (
                  <li
                    className={`ingredients-list materials-list ${
                      material.selected ? "list-active" : null
                    }`}
                    key={index}
                    onClick={() => handleListClick(index, material)}
                  >
                    <div>{material.commonMaterialID}</div>
                    <div>
                      {material.name}
                      <div className="table-subTitle">
                        {material.description}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
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
