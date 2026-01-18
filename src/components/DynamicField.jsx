import ArrayFieldRenderer from "./ArrayUI";
import ObjectFieldRenderer from "./ObjectUI";
import PrimitiveField from "./FieldUI";

function DynamicField({ schema, value, path, onChange }) {
  console.log("DynamicField");

  console.log("Schema:" +schema);
  console.log("Value:", value);
  console.log("Path:", path);

  if (!schema) return null;

  switch (schema.type) {
    case "object":
      return (
        <ObjectFieldRenderer
          properties={schema.properties}
          value={value}
          path={path}
          onChange={onChange}
        />
      );
    case "array":
      return (
        <ArrayFieldRenderer
          items={schema.items}
          value={value}
          path={path}
          onChange={onChange}
        />
      );
    case "string":
    case "number":
    case "boolean":
      return (
        <PrimitiveField
          type={schema.type}
          value={value}
          path={path}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
}
export default DynamicField;
