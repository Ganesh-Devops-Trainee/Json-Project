import { useEffect, useState } from "react";
import FormPreview from "./components/FormPreview";
import JsonEditor from "./components/JsonEditor";

const App = () => {
  // Explicitly type the state as string for jsonSchema
  const [jsonSchema, setJsonSchema] = useState<string>("");

  // Explicitly type the state as boolean for darkMode
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Check if there's a saved dark mode preference in localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevMode: boolean) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <div className="h-screen">
      <div className="flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dynamic Form Generator</h1>
        <button
          onClick={toggleDarkMode}
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
