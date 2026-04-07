import { test, expect } from "@playwright/test";

/**
 * TEST 2: Tarifs page — Plan cards, Maxi badge, don libre, FAQ, Organisations.
 */
test.describe("Tarifs flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/fr/tarifs");
  });

  test("displays 4 plan cards with Maxi recommended", async ({ page }) => {
    // Verify the 4 plan names are visible
    await expect(page.getByText("Mini", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Plus", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Maxi", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Aura", { exact: true }).first()).toBeVisible();

    // Verify Maxi has the "Recommande" badge
    await expect(page.getByText(/Recommandé/)).toBeVisible();
  });

  test("clicking Choisir on Maxi shows don libre step", async ({ page }) => {
    // Click the third Choisir button (Mini=0, Plus=1, Maxi=2)
    const choisirButtons = page.getByRole("button", { name: /choisir/i });
    await choisirButtons.nth(2).click();

    // Verify don libre section appears
    await expect(page.getByText(/don libre/i).first()).toBeVisible({ timeout: 5_000 });
  });

  test("FAQ section has 6 questions", async ({ page }) => {
    // Use button role for FAQ question items (they are clickable buttons)
    await expect(page.getByRole("button", { name: /différence entre signer/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /changer de forfait/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /tarif réduit/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /forfait groupe/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /déductible des impôts/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /ne renouvelle pas/ })).toBeVisible();
  });

  test("Organisations section is visible", async ({ page }) => {
    await expect(page.getByText(/organisations/i).first()).toBeVisible();
  });
});
