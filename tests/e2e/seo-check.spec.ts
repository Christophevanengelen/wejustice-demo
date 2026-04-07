import { test, expect } from "@playwright/test";

/**
 * TEST 4: SEO endpoints — robots.txt, sitemap.xml, og:title, JSON-LD.
 *
 * Uses Playwright request context for raw HTTP checks on static endpoints,
 * and page context for DOM-based checks.
 */
test.describe("SEO checks", () => {
  test("robots.txt contains User-Agent rules", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain("User-Agent");
  });

  test("sitemap.xml contains urlset", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain("<urlset");
  });

  test("action detail page has og:title meta tag", async ({ page }) => {
    await page.goto("/fr/actions/act-001");
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", /./);
  });

  test("tarifs page has FAQPage JSON-LD", async ({ page }) => {
    await page.goto("/fr/tarifs");
    // Find all JSON-LD scripts and check that at least one contains FAQPage
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    let foundFaq = false;
    for (let i = 0; i < count; i++) {
      const content = await scripts.nth(i).textContent();
      if (content && content.includes("FAQPage")) {
        foundFaq = true;
        break;
      }
    }
    expect(foundFaq).toBeTruthy();
  });
});
