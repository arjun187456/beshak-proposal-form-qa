const { test, expect } = require('@playwright/test');
const { NavigationBar } = require('../pages/navigation.page');
const { ContentPage } = require('../pages/content.page');
const { PlanListingPage } = require('../pages/plan-listing.page');
const { ComparisonEnginePage } = require('../pages/comparison-engine.page');

test.describe('Content and navigation', () => {
  test('article feed route renders the featured content', async ({ page }) => {
    const navigation = new NavigationBar(page);
    const content = new ContentPage(page);
    await navigation.open('articles');

    await expect(page).toHaveURL(/\/articles\/$/);
    await expect(content.heading('Featured Articles')).toBeVisible();
  });

  test('video thumbnail opens an inline player dialog', async ({ page }) => {
    const navigation = new NavigationBar(page);
    const content = new ContentPage(page);
    await navigation.open('videos');
    await expect(content.heading('Featured Videos')).toBeVisible();

    const originalUrl = await content.openVideo(
      'How Much Health Insurance Cover Do I Need? | Insurappa with Mahavir Chopra',
    );

    await expect(page).toHaveURL(originalUrl);
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.locator('iframe:visible')).toHaveCount(1);
  });
});

test.describe('Plan directories and comparison', () => {
  test('term plan directory shows the expected first product', async ({ page }) => {
    const navigation = new NavigationBar(page);
    const listing = new PlanListingPage(page);
    await navigation.open('termPlans');

    await expect(listing.heading()).toHaveText('Best Term Life Insurance Plans of 2026');
    await expect(listing.planLink('TATA AIA Sampoorna Raksha Promise')).toBeVisible();
  });

  test('health plan directory shows the expected product listing', async ({ page }) => {
    const navigation = new NavigationBar(page);
    const listing = new PlanListingPage(page);
    await navigation.open('healthPlans');

    await expect(listing.heading()).toHaveText('Best Health Insurance Plans of 2026');
    await expect(listing.planLink('HDFC Ergo Optima Secure')).toBeVisible();
  });

  test('health comparison page renders side-by-side sections', async ({ page }) => {
    const comparison = new ComparisonEnginePage(page);
    await page.goto(
      'https://www.beshak.org/insurance/health-insurance/compare/aditya-birla-activ-one-nxt-vs-hdfc-ergo-optima-secure/',
      { waitUntil: 'domcontentloaded' },
    );

    await expect(comparison.heading()).toContainText('vs');
    await expect(comparison.section('Aditya Birla Activ One (NXT)')).toBeVisible();
    await expect(comparison.section('HDFC Ergo Optima Secure')).toBeVisible();
    await expect(comparison.section('Product Benefits')).toBeVisible();
    await expect(comparison.section('Claims Experience')).toBeVisible();
  });

  test('HDFC product detail exposes overview tabs and FAQs', async ({ page }) => {
    await page.goto(
      'https://www.beshak.org/insurance/health-insurance/best-health-insurance-plans/hdfc-ergo-optima-secure/',
      { waitUntil: 'domcontentloaded' },
    );

    await expect(page.getByRole('heading', { name: 'HDFC Ergo Optima Secure + Key Add-ons' })).toBeVisible();
    await expect(page.getByText('Introduction', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Quick Overview', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Detailed Overview', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('FAQs', { exact: true }).first()).toBeVisible();
  });
});