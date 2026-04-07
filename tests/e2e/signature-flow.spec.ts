import { test, expect } from "@playwright/test";

/**
 * TEST 1: Signature flow — Guest signs an action and lands on /merci.
 *
 * The demo defaults to "member" role, so we switch to "anonymous"
 * via the DemoToolbar to get the guest signature form.
 */
test.describe("Signature flow", () => {
  test("guest can sign action act-001 and reach merci page", async ({ page }) => {
    // Navigate to action detail
    await page.goto("/fr/actions/act-001");

    // Verify hero title
    await expect(page.getByRole("heading", { name: /cobayes/i })).toBeVisible();

    // Switch to anonymous role via DemoToolbar
    await page.getByLabel("Demo controls").click();
    await page.getByRole("button", { name: /anonyme/i }).click();

    // The page has two SignatureForms: mobile (lg:hidden) and desktop sidebar.
    // On Desktop Chrome the visible one is the last (sidebar). Use .last() to target it.
    const prenomInput = page.getByPlaceholder("Prenom").last();
    await prenomInput.scrollIntoViewIfNeeded();

    // Fill signature form (guest path)
    await prenomInput.fill("Jean");
    await page.getByPlaceholder("Nom").last().fill("Test");
    await page.getByPlaceholder("Votre adresse email").last().fill("jean@test.com");

    // Click sign button
    await page.getByRole("button", { name: /signer gratuitement/i }).last().click();

    // Wait for redirect to merci page
    await page.waitForURL(/\/merci/, { timeout: 10_000 });

    // Verify merci page content
    await expect(page.getByRole("heading", { name: /merci/i })).toBeVisible();

    // Verify upsell section "Allez plus loin"
    await expect(page.getByText(/allez plus loin/i)).toBeVisible();

    // Verify share button exists
    await expect(page.getByRole("link", { name: /partager cette action/i })).toBeVisible();
  });
});
