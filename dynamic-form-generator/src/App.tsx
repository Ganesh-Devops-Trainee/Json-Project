import React, { useState } from "react";
import FormPreview from "./components/FormPreview";
import JsonEditor from "./components/JsonEditor";

const App: React.FC = () => {
  const [json, setJson] = useState<string>("");

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/2 p-4">
        <JsonEditor json={json} onChange={setJson} />
      </div>
      <div className="w-full lg:w-1/2 p-4 bg-gray-100 dark:bg-gray-900">
        <FormPreview json={json} />
      </div>
    </div>
  );
};

export default App;