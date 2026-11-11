class PlanListingPage {
  constructor(page) {
    this.page = page;
  }

  heading() {
    return this.page.getByRole('heading', { level: 1 });
  }

  planLink(name) {
    return this.page.getByRole('link', { name: new RegExp(name, 'i') }).first();
  }

  async selectPlanCard(index) {
    await this.page.locator('.mobile-compare-check label.custom-checkbox').nth(index).click();
  }

  async compareSelectedPlans() {
    await this.page.locator('.pfc-compare-btn:visible').click();
  }
}

module.exports = { PlanListingPage };