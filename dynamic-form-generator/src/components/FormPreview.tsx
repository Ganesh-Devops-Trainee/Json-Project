import React from "react";
import { useForm } from "react-hook-form";
import { FormSchema } from "../types/schema";
import { downloadJson } from "../utils/downloadJson";

const FormPreview: React.FC<{ json: string }> = ({ json }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Try to parse the JSON schema
  const schema: FormSchema | null = (() => {
    try {
      return JSON.parse(json);
    } catch {
      return null; // If JSON is invalid, return null
    }
  })();

  // Handle form submission
  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    alert("Form submitted successfully!");
  };

  // If schema is invalid (or JSON is not parsed correctly)
  if (!schema || !schema.fields) {
    return <p className="text-red-600 dark:text-white">Enter a valid JSON with the correct schema structure.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{schema.formTitle}</h2>
      <p className="text-gray-700 dark:text-gray-300">{schema.formDescription}</p>
      
      {/* Check if fields are defined and map over them */}
      {Array.isArray(schema.fields) && schema.fields.map((field) => (
        <div key={field.id} className="space-y-1">
          <label className="block text-gray-900 dark:text-white">{field.label}</label>
          
          {/* Render different input types based on field type */}
          {field.type === "text" && (
            <input
              {...register(field.id, { required: field.required })}
              placeholder={field.placeholder}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          )}
          
          {field.type === "email" && (
            <input
              {...register(field.id, { required: field.required, pattern: field.validation?.pattern })}
              placeholder={field.placeholder}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          )}

          {/* Handle select field type */}
          {field.type === "select" && field.options && (
            <select
              {...register(field.id, { required: field.required })}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {/* Handle radio field type */}
          {field.type === "radio" && field.options && (
            <div>
              {field.options.map((option) => (
                <label key={option.value} className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    {...register(field.id, { required: field.required })}
                    value={option.value}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          )}

          {/* Handle textarea field type */}
          {field.type === "textarea" && (
            <textarea
              {...register(field.id, { required: field.required })}
              placeholder={field.placeholder}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          )}

          {/* Validation error message */}
          {errors[field.id] && <p className="text-red-600">This field is required</p>}
        </div>
      ))}

      <div className="space-x-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
        <button
          type="button"
          onClick={() => downloadJson(schema)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Download JSON
        </button>
      </div>
    </form>
  );
};

export default FormPreview;
