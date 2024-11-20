import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";

const JsonEditor: React.FC<{ json: string; onChange: (newJson: string) => void }> = ({
  json,
  onChange,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [parsedJson, setParsedJson] = useState<object | null>(null);

  useEffect(() => {
    // Try to parse the JSON safely
    try {
      if (json) {
        const parsed = JSON.parse(json);
        setParsedJson(parsed);
        setError(null); // Reset error if JSON is valid
      } else {
        setParsedJson(null); // Reset parsed data if JSON is empty
      }
    } catch (err) {
      setError("Invalid JSON format. Please correct the syntax.");
      setParsedJson(null); // Clear parsed data if JSON is invalid
    }
  }, [json]);

  const handleJsonChange = (newJson: string) => {
    onChange(newJson); // Pass the updated JSON to the parent component
  };

  return (
    <div className="json-editor-container">
      <div className="json-editor">
        <textarea
          value={json}
          onChange={(e) => handleJsonChange(e.target.value)}
          placeholder="Enter JSON here"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Show error message if JSON is invalid */}
      {error && <div className="text-red-600 mt-2">{error}</div>}

      {/* Show parsed JSON in a formatted way if valid */}
      {parsedJson && (
        <ReactJson
          src={parsedJson}
          theme="monokai"
          collapsed={false}
          enableClipboard={false}
        />
      )}
    </div>
  );
};

export default JsonEditor;
