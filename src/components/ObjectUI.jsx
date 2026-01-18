import Card from "./Card";
import DynamicField from "./DynamicField";

function ObjectUI({ properties, value, path, onChange }) {
  const objectValue = value || {};
  const fieldName = path[path.length - 1];
  const label = fieldName;

  console.log("ObjectFieldRenderer");
  console.log("properties: " + properties);
  console.log("value: " + value);

  const fields = Object.keys(properties).map((key) => (
    <DynamicField
      key={key}
      schema={properties[key]}
      value={objectValue[key]}
      path={[...path, key]}
      onChange={onChange}
    />
  ));

  if (!label) {
    return <div className="fields-grid">{fields}</div>;
  }

  return (
    <Card title={label} collapsible={true} defaultOpen={true}>
      <div className="fields-grid">{fields}</div>
    </Card>
  );
}

export default ObjectUI;
