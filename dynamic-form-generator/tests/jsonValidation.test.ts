import validateJson from "../src/utils/validateJson";

describe("JSON Validation Utility", () => {
  it("should validate correct JSON schema", () => {
    const validJson = {
      formTitle: "Sample Form",
      formDescription: "Fill out the form",
      fields: [{ id: "name", label: "Name", type: "text", required: true }],
    };
    expect(validateJson(validJson)).toBe(true);
  });

  it("should fail for invalid JSON schema", () => {
    const invalidJson = {
      formTitle: "Invalid Form",
      fields: [{ label: "Name", type: "text" }], // Missing "id"
    };
    expect(validateJson(invalidJson)).toBe(false);
  });
});