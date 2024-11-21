// import { render, screen } from "@testing-library/react";
// import FormPreview from "../src/components/FormPreview";

// describe("Error Scenarios", () => {
//   it("should show error for invalid JSON", () => {
//     render(<FormPreview json="{ invalidJson }" />);
//     expect(screen.getByText("Invalid JSON schema")).toBeInTheDocument();
//   });

//   it("should handle missing fields in JSON schema gracefully", () => {
//     const incompleteJson = JSON.stringify({ formTitle: "Incomplete Schema" });
//     render(<FormPreview json={incompleteJson} />);
//     expect(screen.getByText("Invalid JSON schema")).toBeInTheDocument();
//   });
// });