import React from "react";
import { useForm } from "react-hook-form";
import { FormSchema } from "../types/schema";
import { downloadJson } from "../utils/downloadJson";

interface FormPreviewProps {
  json: string;
}

const FormPreview: React.FC<FormPreviewProps> = ({ json }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Attempt to parse the JSON schema
  const schema: FormSchema | null = (() => {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  })();

  // Fallback for fields if not defined in schema
  const fields = schema?.fields || [];

  // Flag to disable buttons if schema is invalid
  const isFormValid = schema && fields.length > 0;

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    alert("Form submitted successfully!");
  };

  if (!isFormValid) {
    return (
      <div>
        <p className="text-red-600">Invalid JSON schema. Please check the JSON format and fields.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{schema.formTitle}</h2>
      <p className="text-gray-700 dark:text-gray-300">{schema.formDescription}</p>

      {/* Render form fields dynamically */}
      {fields.map((field) => (
        <div key={field.id} className="space-y-1">
          <label className="block text-gray-900 dark:text-white">{field.label}</label>
          {field.type === "text" && (
            <input
              {...register(field.id, { required: field.required })}
              placeholder={field.placeholder}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          )}
          {field.type === "email" && (
            <input
              {...register(field.id, {
                required: field.required,
                pattern: field.validation?.pattern,
              })}
              placeholder={field.placeholder}
              type="email"
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          )}
          {field.type === "select" && (
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
          {field.type === "textarea" && (
            <textarea
              {...register(field.id, { required: field.required })}
              placeholder={field.placeholder}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          )}

          {/* Show error message for invalid fields */}
          {errors[field.id] && <p className="text-red-600">This field is required</p>}
        </div>
      ))}

      <div className="space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={!isFormValid}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => downloadJson(schema)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
          disabled={!isFormValid}
        >
          Download JSON
        </button>
      </div>
    </form>
  );
};

export default FormPreview;
