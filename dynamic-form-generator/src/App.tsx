import React, { useState } from "react";
import FormPreview from "./components/FormPreview";
import JsonEditor from "./components/JsonEditor";

const App: React.FC = () => {
  const [jsonSchema, setJsonSchema] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`h-screen ${darkMode ? "dark" : ""}`}>
      <div className="flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dynamic Form Generator</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Toggle Dark Mode
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* JSON Editor on the left side */}
        <div className="p-4 border-r bg-white dark:bg-gray-800">
          <JsonEditor json={jsonSchema} onChange={setJsonSchema} />
        </div>

        {/* Form Preview on the right side */}
        <div className="p-4 bg-white dark:bg-gray-800">
          <FormPreview json={jsonSchema} />
        </div>
      </div>
    </div>
  );
};

export default App;
