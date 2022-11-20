import { FormRow } from "../shared";

const FormulaDefinition = ({
  commonFormulaID,
  formulaVersion,
  formulaName,
  formulaDescription,
  formulaBatchSize,
  formulaAvailable,
  handleFormulaInput,
}) => {
  return (
    <div className="modal-form__content__inputs">
      <div className="cfi">
        <FormRow
          name="commonFormulaID"
          labelText="Common Formula ID"
          type="text"
          value={commonFormulaID}
          handleChange={handleFormulaInput}
        />
      </div>
      <div className="version">
        <FormRow
          name="formulaVersion"
          labelText="Version"
          type="text"
          value={formulaVersion}
          handleChange={handleFormulaInput}
        />
      </div>
      <div className="name">
        <FormRow
          name="formulaName"
          labelText="Name"
          type="text"
          value={formulaName}
          handleChange={handleFormulaInput}
        />
      </div>
      <div className="desc">
        <FormRow
          name="formulaDescription"
          labelText="Description"
          type="text"
          value={formulaDescription}
          handleChange={handleFormulaInput}
        />
      </div>
      <div className="batch-size">
        <FormRow
          name="formulaBatchSize"
          labelText="Batch Size"
          type="text"
          value={formulaBatchSize}
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
          // value={formulaAvailable}
          checked={formulaAvailable}
          handleChange={handleFormulaInput}
        />
      </div>
    </div>
  );
};

export default FormulaDefinition;
