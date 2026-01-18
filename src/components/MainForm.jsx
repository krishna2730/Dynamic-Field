import { generateSchema, setValueByPath } from "../utils/schema";
import DynamicField from "./DynamicField";
import sampel1 from "../data/sample1.json";
// import sampel2 from "../data/sample2.json";
import { useState } from "react";

function MainForm() {
  const initialConfig = sampel1;

  const [config, setConfig] = useState(initialConfig);
  const [originalConfig, setOriginalConfig] = useState(initialConfig);
  const [schema, setSchema] = useState(() => generateSchema(initialConfig));
  const [showPreview, setShowPreview] = useState("hide");
  const [isSaved, setIsSaved] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFieldChange = (path, value) => {
    setConfig((prevConfig) => setValueByPath(prevConfig, path, value));
    setIsSaved(false);
  };

  const handleSubmit = () => {
    console.log("Configuration Saved:", JSON.stringify(config, null, 2));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    alert(
      "Configuration saved successfully!\n\nCheck the browser console to see the JSON output."
    );
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all changes? This cannot be undone."
      )
    ) {
      setConfig(initialConfig);
      setIsSaved(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(schema, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "configuration.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".json")) {
      setUploadError("Please upload a valid JSON file");
      setTimeout(() => setUploadError(null), 3000);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        setConfig(jsonData);
        setOriginalConfig(jsonData);
        setSchema(generateSchema(jsonData));
        setUploadError(null);
        setIsSaved(false);

        // Show success message
        alert("JSON file loaded successfully!");
      } catch (error) {
        setUploadError("Invalid JSON file. Please check the file format.");
        setTimeout(() => setUploadError(null), 3000);
      }
    };

    reader.onerror = () => {
      setUploadError("Error reading file. Please try again.");
      setTimeout(() => setUploadError(null), 3000);
    };

    reader.readAsText(file);

    // Reset the file input
    event.target.value = "";
  };

  const triggerFileUpload = () => {
    document.getElementById("json-file-input").click();
  };

  return (
    <div className="app">
      <div className="container">
        <input
          id="json-file-input"
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="hidden-input"
        />

        <div className="header">
          <div className="header-content">
            <div className="header-text">
              <h1>Dynamic Fields</h1>
              <p>
                Manage your application settings with an intuitive,
                user-friendly interface
              </p>
            </div>
            <div className="header-actions">
              <button onClick={triggerFileUpload} className="btn btn-primary">
                Upload JSON
              </button>
              <button
                onClick={() =>
                  setShowPreview((prev) => (prev === "json" ? "hide" : "json"))
                }
                className="btn btn-secondary"
              >
                {"Show Preview"}
              </button>
              <button
                onClick={() =>
                  setShowPreview((prev) =>
                    prev === "original" ? "hide" : "original"
                  )
                }
                className="btn btn-secondary"
              >
                {"Show Original Preview"}
              </button>
              <button
                onClick={() =>
                  setShowPreview((prev) =>
                    prev === "schema" ? "hide" : "schema"
                  )
                }
                className="btn btn-secondary"
              >
                {"Show Schema Preview"}
              </button>
              <button onClick={handleExport} className="btn btn-secondary">
                Export JSON
              </button>
              <button onClick={handleReset} className="btn btn-danger">
                Reset All
              </button>
            </div>
          </div>
        </div>

        {showPreview === "json" && (
          <div className="preview-panel">
            <div className="preview-header">
              <h2 className="preview-title">JSON Preview</h2>
            </div>
            <div className="preview-content">
              <pre>{JSON.stringify(config, null, 2)}</pre>
            </div>
          </div>
        )}

        {showPreview === "original" && (
          <div className="preview-panel">
            <div className="preview-header">
              <h2 className="preview-title">Original JSON Preview</h2>
            </div>
            <div className="preview-content">
              <pre>{JSON.stringify(originalConfig, null, 2)}</pre>
            </div>
          </div>
        )}

        {showPreview === "schema" && (
          <div className="preview-panel">
            <div className="preview-header">
              <h2 className="preview-title">Schema Preview</h2>
            </div>
            <div className="preview-content">
              <pre>{JSON.stringify(schema, null, 2)}</pre>
            </div>
          </div>
        )}

        <div className="main-content">
          <DynamicField
            schema={schema}
            value={config}
            path={[]}
            onChange={handleFieldChange}
          />

          <div
            style={{
              marginTop: "2rem",
              paddingTop: "2rem",
              borderTop: "2px solid #e2e8f0",
            }}
          >
            <div className="footer-actions">
              <button onClick={handleSubmit} className="btn btn-success">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {isSaved && <div className="status-badge">JSON saved successfully!</div>}

      {uploadError && <div className="error-badge">{uploadError}</div>}
    </div>
  );
}

export default MainForm;
