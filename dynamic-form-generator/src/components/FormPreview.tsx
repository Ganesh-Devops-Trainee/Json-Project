import { useForm } from "react-hook-form";
import { FormSchema } from "../types/schema";
import { downloadJson } from "../utils/downloadJson";

interface FormPreviewProps {
  json: string;
}

const FormPreview = ({ json }: FormPreviewProps) => {
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
      <div className="flex justify-center items-start min-h-screen py-4">
        <p className="text-red-600">Invalid JSON schema. Please check the JSON format and fields.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen py-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg w-full p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{schema.formTitle}</h2>
        <p className="text-gray-700 dark:text-gray-300">{schema.formDescription}</p>

        {/* Render form fields dynamically */}
        {fields.map((field) => (
          <div key={field.id} className="space-y-1">
            <label className="block text-gray-900 dark:text-white">{field.label}</label>
            
            {/* Text input field */}
            {field.type === "text" && (
              <input
                {...register(field.id, {
                  required: field.required,
                  minLength: field.validation?.minLength,
                  maxLength: field.validation?.maxLength,
                  pattern: field.validation?.pattern,
                })}
                placeholder={field.placeholder}
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Email input field */}
            {field.type === "email" && (
              <input
                {...register(field.id, {
                  required: field.required,
                  pattern: field.validation?.pattern || /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
                placeholder={field.placeholder}
                type="email"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Password input field */}
            {field.type === "password" && (
              <input
                {...register(field.id, {
                  required: field.required,
                  minLength: field.validation?.minLength,
                })}
                placeholder={field.placeholder}
                type="password"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Tel input field */}
            {field.type === "tel" && (
              <input
                {...register(field.id, {
                  required: field.required,
                  pattern: field.validation?.pattern || /^[0-9]{10}$/,
                })}
                placeholder={field.placeholder}
                type="tel"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* URL input field */}
            {field.type === "url" && (
              <input
                {...register(field.id, {
                  required: field.required,
                  pattern: field.validation?.pattern || /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                })}
                placeholder={field.placeholder}
                type="url"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Number input field */}
            {field.type === "number" && (
              <input
                {...register(field.id, {
                  required: field.required,
                  min: field.validation?.min,
                  max: field.validation?.max,
                })}
                placeholder={field.placeholder}
                type="number"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Range input field */}
            {field.type === "range" && (
              <input
                {...register(field.id, {
                  required: field.required,
                  min: field.validation?.min,
                  max: field.validation?.max,
                })}
                type="range"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Date input field */}
            {field.type === "date" && (
              <input
                {...register(field.id, {
                  required: field.required,
                  min: field.validation?.min,
                  max: field.validation?.max,
                })}
                type="date"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Time input field */}
            {field.type === "time" && (
              <input
                {...register(field.id, {
                  required: field.required,
                  min: field.validation?.min,
                  max: field.validation?.max,
                })}
                type="time"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Datetime-local input field */}
            {field.type === "datetime-local" && (
              <input
                {...register(field.id, {
                  required: field.required,
                  min: field.validation?.min,
                  max: field.validation?.max,
                })}
                type="datetime-local"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Month input field */}
            {field.type === "month" && (
              <input
                {...register(field.id, {
                  required: field.required,
                  min: field.validation?.min,
                  max: field.validation?.max,
                })}
                type="month"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Week input field */}
            {field.type === "week" && (
              <input
                {...register(field.id, {
                  required: field.required,
                  min: field.validation?.min,
                  max: field.validation?.max,
                })}
                type="week"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Color input field */}
            {field.type === "color" && (
              <input
                {...register(field.id, { required: field.required })}
                type="color"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* File input field */}
            {field.type === "file" && (
              <input
                {...register(field.id, { required: field.required })}
                type="file"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Hidden input field */}
            {field.type === "hidden" && (
              <input
                {...register(field.id, { required: field.required })}
                type="hidden"
                value={field.value || ""}
              />
            )}

            {/* Checkbox input field */}
            {field.type === "checkbox" && (
              <input
                {...register(field.id, { required: field.required })}
                type="checkbox"
                className="p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Radio input field */}
            {field.type === "radio" && (
              <div>
                {field.options?.map((option) => (
                  <label key={option.value} className="inline-flex items-center">
                    <input
                      {...register(field.id, { required: field.required })}
                      type="radio"
                      value={option.value}
                      className="p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
                    />
                    <span className="ml-2">{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Submit input field */}
            {field.type === "submit" && (
              <input
                type="submit"
                value={field.label || "Submit"}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              />
            )}

            {/* Reset input field */}
            {field.type === "reset" && (
              <input
                type="reset"
                value={field.label || "Reset"}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              />
            )}

            {/* Button input field */}
            {field.type === "button" && (
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {field.label || "Button"}
              </button>
            )}

            {/* Image input field */}
            {field.type === "image" && (
              <input
                type="image"
                src={field.src || ""}
                alt={field.alt || "Image"}
                className="w-full"
              />
            )}

            {/* Search input field */}
            {field.type === "search" && (
              <input
                {...register(field.id, { required: field.required })}
                type="search"
                placeholder={field.placeholder}
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Textarea input field */}
            {field.type === "textarea" && (
              <textarea
                {...register(field.id, {
                  required: field.required,
                  minLength: field.validation?.minLength,
                  maxLength: field.validation?.maxLength,
                })}
                placeholder={field.placeholder}
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            )}

            {/* Select input field */}
            {field.type === "select" && (
              <select
                {...register(field.id, { required: field.required })}
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
    </div>
  );
};

export default FormPreview;
