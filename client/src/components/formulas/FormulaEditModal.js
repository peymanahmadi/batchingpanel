import { useEffect, useState } from "react";
import { FaTimes, FaFlask } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/appContext";
import AvailableMaterials from "./AvailableMaterials";
import Formulation from "./Formulation";
import ListControls from "./ListControls";
import FormulaDefinition from "./FormulaDefinition";

const FormulaEditModal = () => {
  const {
    isLoadingCreateFormula,
    isEditing,
    commonFormulaID,
    formulaVersion,
    formulaName,
    formulaDescription,
    formulaBatchSize,
    formulaAvailable,
    ingredients,
    handleChange,
    getMaterials,
    createFormula,
    editFormula,
    availableMaterialsArr,
    getFormulaByID,
    formulation,
    hideModal,
    clearValues,
  } = useAppContext();

  const [materials, setMaterials] = useState();
  const [rawMaterials, setRawMaterials] = useState([]);

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
    }
  }, [availableMaterialsArr]);

  useEffect(() => {
    if (isEditing) {
      getFormulaByID();
      // the function fills formula and formulation
    }
    // eslint-disable-next-line
  }, [isEditing]);

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
    hideModal();
    clearValues();
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
    if (!commonFormulaID || !formulaName) {
      notify();
      return;
    }
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
    rawMaterials[index].weight = e.target.value;
    rawMaterials[index].materialID = rawMaterials[index]._id;
    setRawMaterials([...rawMaterials]);
  };

  const notify = () => toast.error("Please provide all required values!");

  return (
    <form
      className={`modal-form ${isLoadingCreateFormula ? "form-loading" : ""}`}
      onSubmit={handleSubmit}
    >
      <nav className="modal-form__header">
        <div className="modal-form__header__title">
          <FaFlask />
          <h5>Add Formula</h5>
        </div>
        <div className="close-btn">
          <FaTimes onClick={closeModal} />
        </div>
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
