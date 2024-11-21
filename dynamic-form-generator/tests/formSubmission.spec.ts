import { expect, test } from "@playwright/test";

test.describe("Form Submission", () => {
  test("should show validation error for required fields", async ({ page }) => {
    await page.goto("/");

    const jsonInput = JSON.stringify({
      formTitle: "Validation Test",
      formDescription: "Test required fields",
      fields: [{ id: "name", label: "Name", type: "text", required: true }],
    });

    await page.fill("textarea", jsonInput);
    await page.click("button:has-text('Submit')");

    const errorMessage = await page.locator("p.text-red-600").textContent();
    expect(errorMessage).toContain("This field is required");
  });

  test("should successfully submit valid data", async ({ page }) => {
    await page.goto("/");

    const jsonInput = JSON.stringify({
      formTitle: "Submission Test",
      fields: [{ id: "name", label: "Name", type: "text", required: true }],
    });

    await page.fill("textarea", jsonInput);

    // Fill the form
    await page.fill('input[name="name"]', "John Doe");
    await page.click("button:has-text('Submit')");

    const successMessage = await page.locator("alert").textContent();
    expect(successMessage).toContain("Form submitted successfully!");
  });
});