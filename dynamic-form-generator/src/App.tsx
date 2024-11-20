import React, { useState } from "react";
import JsonEditor from "./components/JsonEditor";
import FormPreview from "./components/FormPreview";

const App: React.FC = () => {
  const [jsonSchema, setJsonSchema] = useState("");

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="p-4 border-r">
        <h1 className="text-2xl font-bold mb-4">JSON Editor</h1>
        <JsonEditor json={jsonSchema} onChange={setJsonSchema} />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Form Preview</h1>
        <FormPreview json={jsonSchema} />
      </div>
    </div>
  );
};

export default App;