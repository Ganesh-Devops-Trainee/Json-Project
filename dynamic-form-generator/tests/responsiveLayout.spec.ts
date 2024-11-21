// import { expect, test } from "@playwright/test";

// test.describe("Responsive Layout", () => {
//   test("should stack editor and form preview on smaller screens", async ({ page }) => {
//     await page.setViewportSize({ width: 480, height: 800 });
//     await page.goto("/");

//     const editor = await page.locator(".json-editor");
//     const preview = await page.locator(".form-preview");

//     const editorBox = await editor.boundingBox();
//     const previewBox = await preview.boundingBox();

//     expect(editorBox!.y).toBeLessThan(previewBox!.y); // Stacked vertically
//   });
// });