import React, { useState } from "react";

interface JsonEditorProps {
  json: string;
  onChange: (newJson: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ json, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onChange(value);
    try {
      JSON.parse(value);
      setError(null);
    } catch (err) {
      setError("Invalid JSON");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(json);
    alert("JSON copied to clipboard!");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">JSON Editor</h2>
      <textarea
        className="w-full h-72 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white"
        value={json}
        onChange={handleChange}
        placeholder="Paste your JSON schema here..."
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {/* <button
        onClick={handleCopy}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Copy JSON
      </button> */}
      {/* <ReactJson src={json ? JSON.parse(json) : {}} theme="monokai" /> */}
      <div className="p-4 bg-white dark:bg-gray-800">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">JSON Viewer</h3>
      <pre className="bg-gray-100 dark:bg-gray-700 p-4 text-sm">
        {json}
      </pre>
    </div>
    </div>
  );
};

export default JsonEditor;