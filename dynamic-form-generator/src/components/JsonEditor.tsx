import React, { useEffect, useState } from "react";
import { JsonTree } from "react-json-tree";

interface JsonEditorProps {
  json: string;
  onChange: (newJson: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ json, onChange }) => {
  const [error, setError] = useState<string | null>(null);
  const [parsedJson, setParsedJson] = useState<object | null>(null);

  useEffect(() => {
    // Attempt to parse the JSON and set the parsed state or show an error
    try {
      if (json.trim() === "") {
        setParsedJson(null);
        setError(null);
        return;
      }

      const parsed = JSON.parse(json);
      setParsedJson(parsed);
      setError(null); // Reset any errors if JSON is valid
    } catch (err) {
      setParsedJson(null); // Clear parsed JSON if invalid
      setError("Invalid JSON format. Please correct the syntax.");
    }
  }, [json]); // Run this effect every time the JSON string changes

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value); // Update parent component with new JSON
  };

  return (
    <div className="json-editor-container p-4">
      <textarea
        value={json}
        onChange={handleJsonChange}
        placeholder="Enter JSON here"
        className="w-full h-40 p-2 border rounded dark:bg-gray-700 dark:text-white"
      />

      {/* Display an error message if JSON is invalid */}
      {error && <div className="text-red-600 mt-2">{error}</div>}

      {/* Display the formatted JSON if valid */}
      {parsedJson && (
        <div className="mt-4">
          <JsonTree
            data={parsedJson}
            theme="monokai"
            invertTheme={false}
          />
        </div>
      )}
    </div>
  );
};

export default JsonEditor;
