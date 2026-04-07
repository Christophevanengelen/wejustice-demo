import { test, expect } from "@playwright/test";

/**
 * TEST 3: Espace membre — Dashboard, signatures list, profile fields.
 *
 * The demo defaults to "member" role (Jean Dupont).
 * The /compte pages use mock data and mock auth.
 */
test.describe("Espace membre", () => {
  test("dashboard shows greeting and 3 KPI cards", async ({ page }) => {
    await page.goto("/fr/compte");

    // Verify greeting
    await expect(page.getByText(/Bonjour Jean/)).toBeVisible();

    // Verify 3 KPI card labels (use .first() since text may appear elsewhere)
    await expect(page.getByText("Actions rejointes").first()).toBeVisible();
    await expect(page.getByText("Seats utilises").first()).toBeVisible();
    await expect(page.getByText("Signatures gratuites").first()).toBeVisible();
  });

  test("signatures page shows list", async ({ page }) => {
    await page.goto("/fr/compte/signatures");

    // Verify page heading
    await expect(page.getByRole("heading", { name: /mes signatures/i })).toBeVisible();

    // Verify at least one signed action is rendered
    await expect(page.getByText(/signee/i).first()).toBeVisible();
  });

  test("profile page shows disabled fields", async ({ page }) => {
    await page.goto("/fr/compte/profil");

    // Verify heading "Mon profil"
    await expect(page.getByRole("heading", { name: /mon profil/i })).toBeVisible({
      timeout: 10_000,
    });

    // Verify disabled fields are present
    const prenomInput = page.locator("input[value='Jean']");
    await expect(prenomInput).toBeVisible();
    await expect(prenomInput).toBeDisabled();

    const nomInput = page.locator("input[value='Dupont']");
    await expect(nomInput).toBeVisible();
    await expect(nomInput).toBeDisabled();

    const emailInput = page.locator("input[value='jean.dupont@example.com']");
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeDisabled();
  });
});
