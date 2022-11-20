import { useEffect, useState } from "react";
import { FaTimes, FaFlask } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import AvailableMaterials from "./AvailableMaterials";
import Formulation from "./Formulation";
import ListControls from "./ListControls";
import FormulaDefinition from "./FormulaDefinition";

const FormulaEditModal = () => {
  const {
    isLoading,
    isEditing,
    editFormulaID,
    commonFormulaID,
    formulaVersion,
    formulaName,
    formulaDescription,
    formulaBatchSize,
    formulaAvailable,
    ingredients,
    handleChange,
    hideModal,
    getMaterials,
    createFormula,
    editFormula,
    availableMaterialsArr,
    getFormulaByID,
    formula,
    formulation,
  } = useAppContext();

  const [materials, setMaterials] = useState();
  const [startLoading, setStartLoading] = useState();
  const [rawMaterials, setRawMaterials] = useState([]);

  const [editMaterials, setEditMaterials] = useState();
  const [editRawMaterials, setEditRawMaterials] = useState([]);

  const handleFormulaInput = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    handleChange({ type, name, value, checked });
  };

  useEffect(() => {
    getMaterials();
    // the function fills availableMaterialsArr
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      availableMaterialsArr !== undefined &&
      availableMaterialsArr.length > 0
    ) {
      setMaterials(availableMaterialsArr);
      setStartLoading(true);
    }
  }, [availableMaterialsArr]);

  useEffect(() => {
    if (isEditing) {
      getFormulaByID();
      // the function fills formula and formulation
    }
  }, [isEditing]);

  // useEffect(() => {
  //   console.log("formula: ", formula);
  //   console.log("formulation: ", formulation);
  // }, [formulation]);

  useEffect(() => {
    if (
      isEditing &&
      formulation !== undefined &&
      formulation.length > 0 &&
      materials !== undefined &&
      materials.length > 0
    ) {
      for (let i = 0; i < materials.length; i++) {
        for (let j = 0; j < formulation[0].ingredients.length; j++) {
          if (materials[i]._id === formulation[0].ingredients[j]._id) {
            materials[i].selected = true;
            materials[i].weight = formulation[0].ingredients[j].weight;
          }
        }
      }
      handleMoveLeft();
    }
    // eslint-disable-next-line
  }, [formulation]);

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
    materials.map((material, index) => {
      if (material.selected) {
        material.selected = false;
        if (!isEditing) {
          material.weight = null;
          ingredients.push(material);
        } else {
          // material.weight = editRawMaterials[index].weight;
          //material.weight = ingredients[index]?.weight;
          //console.log(index, "Code runs here");
          // if (ingredients[index]?.weight === undefined) {
          //   material.weight = null;
          //   ingredients.push(material);
          //   console.log(ingredients);
          // } else {
          //   material.weight = ingredients[index]?.weight;
          // }
        }
        setRawMaterials((prevState) => [...prevState, material]);
      }
    });
    setMaterials(newData);
  };

  const handleMoveRight = () => {
    const newData = rawMaterials.filter((rawMaterial) => {
      return rawMaterial.selected !== true;
    });
    // ingredients = ingredients.filter((ingredient) => {
    //   return ingredient.selected !== true;
    // });
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
    // createFormula(rawMaterials);
    if (isEditing) {
      editFormula(rawMaterials);
    } else {
      createFormula();
    }
  };

  const handleListClick = (index, material) => {
    material.selected = !material.selected;
    setMaterials([...materials]);
  };

  const handleInputChange = (index, e) => {
    // ingredients[index].weight = e.target.value;
    // ingredients[index].materialID = ingredients[index]._id;
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
        <FormulaDefinition
          commonFormulaID={commonFormulaID}
          formulaVersion={formulaVersion}
          formulaName={formulaName}
          formulaDescription={formulaDescription}
          formulaBatchSize={formulaBatchSize}
          formulaAvailable={formulaAvailable}
          handleFormulaInput={handleFormulaInput}
        />
        <div>
          <label className="form-label">Formulation</label>
          <div className="formulation">
            <Formulation
              rawMaterials={rawMaterials}
              handleListClick={handleListClick}
              handleInputChange={handleInputChange}
            />
            <ListControls
              handleMoveLeft={handleMoveLeft}
              handleMoveRight={handleMoveRight}
            />
            <AvailableMaterials
              materials={materials}
              handleListClick={handleListClick}
            />
          </div>
        </div>
      </div>
      <div className="modal-form__footer">
        <button
          className="btn"
          type="submit"
          disabled={availableMaterialsArr.length < 1}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormulaEditModal;
