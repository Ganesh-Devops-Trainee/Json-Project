import { expect, test } from "@playwright/test";

test.describe("Form Preview", () => {
  test("should dynamically generate form fields from JSON", async ({ page }) => {
    await page.goto("/"); // Base URL from playwright.config.ts

    // Input valid JSON
    const validJson = JSON.stringify({
      formTitle: "Dynamic Form",
      formDescription: "Fill in the details",
      fields: [{ id: "email", label: "Email Address", type: "email", required: true }],
    });

    await page.fill("textarea", validJson);

    // Validate form preview
    const formTitle = await page.locator("h2").textContent();
    expect(formTitle).toBe("Dynamic Form");

    const emailField = await page.locator('input[type="email"]');
    expect(emailField).toBeVisible();
  });
});