import Card from "./Card";
import DynamicField from "./DynamicField";

function ArrayUI({ items, value, path, onChange }) {
  const arrayValue = value || [];
  const fieldName = path[path.length - 1];
  const label = fieldName;

  console.log("ArrayField");
  console.log("items: " + items);
  console.log("value: " + value);
  console.log("path: " + path);

  const handleAddItem = () => {
    const newItem =
      items.type === "object" ? {} : items.type === "number" ? 0 : "";
    console.log("newItem:" + newItem);

    onChange(path, [...arrayValue, newItem]);
  };

  const handleRemoveItem = (index) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const newArray = arrayValue.filter((_, i) => i !== index);
      onChange(path, newArray);
    }
  };

  return (
    <Card
      title={label}
      collapsible={true}
      defaultOpen={true}
      badge={`${arrayValue.length} item${arrayValue.length !== 1 ? "s" : ""}`}
    >
      <div className="array-container">
        {arrayValue.length === 0 ? (
          <div className="empty-state">
            <p className="empty-text">No items yet</p>
            <p className="empty-subtext">
              Click the button below to add your first item
            </p>
          </div>
        ) : (
          <div className="array-items">
            {arrayValue.map((item, index) => (
              <div key={index} className="array-item-card">
                <div className="array-item-header">
                  <span className="array-item-number">#{index + 1}</span>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="remove-btn"
                    title="Remove this item"
                  >
                    <span>×</span>
                  </button>
                </div>
                <DynamicField
                  schema={items}
                  value={item}
                  path={[...path, index]}
                  onChange={onChange}
                />
              </div>
            ))}
          </div>
        )}
        <button onClick={handleAddItem} className="add-item-btn">
          + Add New Item
        </button>
      </div>
    </Card>
  );
}

export default ArrayUI;
