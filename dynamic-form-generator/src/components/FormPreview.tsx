import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormSchema } from "../types/schema";

const FormPreview: React.FC<{ json: string }> = ({ json }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const parsedSchema: FormSchema | null = (() => {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  })();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Form Submitted:", data);
    alert("Form submitted successfully!");
  };

  if (!parsedSchema) return <p>Enter valid JSON to preview the form.</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl">{parsedSchema.formTitle}</h2>
      <p>{parsedSchema.formDescription}</p>
      {parsedSchema.fields.map((field) => (
        <div key={field.id}>
          <label className="block mb-1 font-bold">{field.label}</label>
          {field.type === "text" && (
            <input
              {...register(field.id, { required: field.required })}
              className="w-full p-2 border rounded"
              placeholder={field.placeholder}
            />
          )}
          {field.type === "email" && (
            <input
              {...register(field.id, { required: field.required })}
              className="w-full p-2 border rounded"
              placeholder={field.placeholder}
            />
          )}
          {errors[field.id] && (
            <p className="text-red-600 mt-1">This field is required.</p>
          )}
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default FormPreview;