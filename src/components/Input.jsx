function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  helpText,
}) {
  return (
    <div className="form-field">
      <label className="field-label">{label}</label>
      {helpText && <p className="help-text">{helpText}</p>}
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="field-input"
      />
    </div>
  );
}
export default Input;
