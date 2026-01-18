import FormCheckbox from "./Checkbox";
import FormInput from "./Input";

function FieldUI({ type, value, path, onChange }) {
  const fieldName = path[path.length - 1];
  const label = fieldName;

  console.log("Primitive Field");
  console.log("type: " + type);
  console.log("value: " + value);
  console.log("path: " + path);

  const handleChange = (e) => {
    let newValue;
    if (type === "boolean") {
      newValue = e.target.checked;
    } else if (type === "number") {
      newValue = parseFloat(e.target.value) || 0;
    } else {
      newValue = e.target.value;
    }
    onChange(path, newValue);
  };

  if (type === "boolean") {
    return (
      <FormCheckbox label={label} checked={value} onChange={handleChange} />
    );
  }

  return (
    <FormInput
      label={label}
      type={type === "number" ? "number" : "text"}
      value={value}
      onChange={handleChange}
      placeholder={`Enter ${label}`}
    />
  );
}

export default FieldUI;
