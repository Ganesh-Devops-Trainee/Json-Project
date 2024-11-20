import React, { useState } from "react";

interface JsonEditorProps {
  json: string;
  onChange: (json: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ json, onChange }) => {
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    try {
      JSON.parse(input);
      setError("");
      onChange(input);
    } catch {
      setError("Invalid JSON format");
    }
  };

  return (
    <div>
      <textarea
        value={json}
        onChange={handleChange}
        className="w-full h-64 p-2 border rounded"
        placeholder="Enter JSON schema"
      ></textarea>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default JsonEditor;