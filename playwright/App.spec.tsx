// @ts-ignore
import type { Locator } from "@playwright/test";
import { test, expect } from "@playwright/experimental-ct-react";

import App from "../src/App";

const invalidName = "Ed"; // Below minimum length of three
const validName = "Eduardo";
const colorError = "rgb(200, 44, 44)";
const colorSuccess = "rgb(42, 199, 104)";
const colorFocus = "rgb(0, 113, 235)";
const colorDefault = "rgb(148, 149, 150)";
let cleanUpText: Locator; // Used so we can see is the input fields have the correct UI color, as Playwright uses blue to indicate which component is asserting.
let input1: Locator;
let input2: Locator;
let submitButton: Locator;

test.beforeEach(async ({ mount }) => {
  // Arrange
  const component = await mount(<App />);

  cleanUpText = component.getByText("Created with Formisch");
  input1 = component.getByRole("textbox", { name: "Full name" });
  input2 = component.getByRole("textbox", { name: "E-mail" });
  submitButton = component.getByRole("button", { name: "Submit" });
});

test.afterEach(async () => {
  await expect(cleanUpText).toBeVisible();
});

test("1. Should show error state when submitting empty form", async () => {
  // Act
  await submitButton.click();

  // Assert
  await expect(input1).toHaveCSS("border-color", colorError);
  await expect(input2).toHaveCSS("border-color", colorError);
});

test("2. Should show active state when input is focused and untouched", async () => {
  // Act
  await input1.focus();

  // Assert
  await expect(input1).toHaveCSS("border-color", colorFocus);
  await expect(input2).toHaveCSS("border-color", colorDefault);
});

test("3. Should return to default state when input is focused and then blurred without typing", async () => {
  // Act
  await input1.focus();
  await input1.blur();

  // Assert
  await expect(input1).toHaveCSS("border-color", colorDefault);
  await expect(input2).toHaveCSS("border-color", colorDefault);
});

test("4. Should remain active while typing invalid value without blurring", async () => {
  // Act
  await input1.fill(invalidName);

  // Assert
  await expect(input1).toHaveCSS("border-color", colorFocus);
  await expect(input2).toHaveCSS("border-color", colorDefault);
});

test("5. Should show error state when invalid value is entered and input is blurred", async () => {
  // Act
  await input1.fill(invalidName);
  await input1.blur();

  // Assert
  await expect(input1).toHaveCSS("border-color", colorError);
  await expect(input2).toHaveCSS("border-color", colorDefault);
});

test("6. Should remain active while typing valid value without blurring", async () => {
  // Act
  await input1.fill(validName);

  // Assert
  await expect(input1).toHaveCSS("border-color", colorFocus);
  await expect(input2).toHaveCSS("border-color", colorDefault);
});

test("7. Should show success state when valid value is entered and input is blurred", async () => {
  // Act
  await input1.fill(validName);
  await input1.blur();

  // Assert
  await expect(input1).toHaveCSS("border-color", colorSuccess);
  await expect(input2).toHaveCSS("border-color", colorDefault);
});

test("8. Should keep error state when focusing a field that already has an error", async () => {
  await test.step("fill invalid data", async () => {
    // Act
    await input1.fill(invalidName);
    await input1.blur();

    // Assert
    await expect(input1).toHaveCSS("border-color", colorError);
    await expect(input2).toHaveCSS("border-color", colorDefault);
  });

  await test.step("fill valid data", async () => {
    // Act
    await input1.focus();

    // Assert
    await expect(input1).toHaveCSS("border-color", colorError);
    await expect(input2).toHaveCSS("border-color", colorDefault);
  });
});

test("9. Should keep error state while correcting invalid field without blurring", async () => {
  await test.step("fill invalid data", async () => {
    // Act
    await input1.fill(invalidName);
    await input1.blur();

    // Assert
    await expect(input1).toHaveCSS("border-color", colorError);
    await expect(input2).toHaveCSS("border-color", colorDefault);
  });

  await test.step("fill valid data", async () => {
    // Act
    await input1.fill(validName);

    // Assert
    await expect(input1).toHaveCSS("border-color", colorError);
    await expect(input2).toHaveCSS("border-color", colorDefault);
  });
});

test("10. Should transition from error to success when valid value is entered and input is blurred", async () => {
  await test.step("fill invalid data", async () => {
    // Act
    await input1.fill(invalidName);
    await input1.blur();

    // Assert
    await expect(input1).toHaveCSS("border-color", colorError);
    await expect(input2).toHaveCSS("border-color", colorDefault);
  });

  await test.step("fill valid data", async () => {
    // Act
    await input1.fill(validName);
    await input1.blur();

    // Assert
    await expect(input1).toHaveCSS("border-color", colorSuccess);
    await expect(input2).toHaveCSS("border-color", colorDefault);
  });
});

test("11. Second field should not validate while active after first field has been interacted with", async () => {
  await test.step("first input: fill valid data", async () => {
    // Act
    await input1.fill(validName);
    await input1.blur();

    // Assert
    await expect(input1).toHaveCSS("border-color", colorSuccess);
    await expect(input2).toHaveCSS("border-color", colorDefault);
  });

  await test.step("second input: fill invalid data", async () => {
    // Act
    await input2.fill("e"); // just one character is enough to see if it will fail, remember we are still on focus inside input 2

    // Assert
    await expect(input1).toHaveCSS("border-color", colorSuccess);
    await expect(input2).toHaveCSS("border-color", colorFocus);
  });
});
