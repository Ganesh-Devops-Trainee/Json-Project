import React, { useState } from "react";
import downloadJson from "../utils/downloadJson";

interface FormPreviewProps {
  json: string;
}

const FormPreview: React.FC<FormPreviewProps> = ({ json }) => {
  const [formData, setFormData] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  let schema;

  try {
    schema = JSON.parse(json);
  } catch {
    return <p className="text-red-500">Invalid JSON</p>;
  }

  const handleChange = (id: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
    downloadJson(formData, "form-submission");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{schema?.formTitle || "Form"}</h2>
      <p className="mb-4">{schema?.formDescription}</p>
      <form onSubmit={handleSubmit}>
        {schema?.fields?.map((field: any) => (
          <div key={field.id} className="mb-4">
            <label className="block mb-2">{field.label}</label>
            {field.type === "text" && (
              <input
                type="text"
                placeholder={field.placeholder}
                className="w-full p-2 border rounded"
                required={field.required}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}
            {/* Add other field types */}
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
      {submitted && <p className="mt-4 text-green-500">Form Submitted Successfully!</p>}
    </div>
  );
};

export default FormPreview;