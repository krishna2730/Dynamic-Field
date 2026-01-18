function Checkbox({ label, checked, onChange, helpText }) {
  return (
    <div className="form-field">
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={checked || false}
          onChange={onChange}
          className="field-checkbox"
        />
        <span className="checkbox-label">{label}</span>
      </label>
      {helpText && <p className="help-text">{helpText}</p>}
    </div>
  );
}

export default Checkbox;
