import React from "react";
import { useForm } from "react-hook-form";
import { FormSchema } from "../types/schema";
import { downloadJson } from "../utils/downloadJson";

const FormPreview: React.FC<{ json: string }> = ({ json }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const schema: FormSchema | null = (() => {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  })();

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    alert("Form submitted successfully!");
  };

  if (!schema) {
    return <p className="text-gray-900 dark:text-white">Enter a valid JSON to preview the form.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{schema.formTitle}</h2>
      <p className="text-gray-700 dark:text-gray-300">{schema.formDescription}</p>

      {/* Render the fields dynamically */}
      {schema.fields.map((field) => (
        <div key={field.id} className="space-y-1">
          <label className="block text-gray-900 dark:text-white">{field.label}</label>

          {/* Render Text Field */}
          {field.type === "text" && (
            <input
              {...register(field.id, { required: field.required })}
              placeholder={field.placeholder}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          )}

          {/* Render Email Field */}
          {field.type === "email" && (
            <input
              {...register(field.id, { 
                required: field.required,
                pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined
              })}
              placeholder={field.placeholder}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          )}

          {/* Render Select Field */}
          {field.type === "select" && (
            <select
              {...register(field.id, { required: field.required })}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            >
              {field.options?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {/* Render Radio Buttons */}
          {field.type === "radio" && (
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <label key={index} className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    {...register(field.id, { required: field.required })}
                    value={option.value}
                    className="form-radio text-blue-500"
                  />
                  <span className="text-gray-900 dark:text-white">{option.label}</span>
                </label>
              ))}
            </div>
          )}

          {/* Render Textarea Field */}
          {field.type === "textarea" && (
            <textarea
              {...register(field.id, { required: field.required })}
              placeholder={field.placeholder}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          )}

          {/* Error Message */}
          {errors[field.id] && <p className="text-red-600">This field is required</p>}
        </div>
      ))}

      <div className="space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
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
