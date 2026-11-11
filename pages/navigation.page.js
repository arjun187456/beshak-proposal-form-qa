class NavigationBar {
  constructor(page) {
    this.page = page;
    this.destinations = {
      home: 'https://www.beshak.org/',
      articles: 'https://www.beshak.org/articles/',
      videos: 'https://www.beshak.org/videos/',
      termPlans: 'https://www.beshak.org/insurance/term-life-insurance/best-term-insurance-plans/',
      healthPlans: 'https://www.beshak.org/insurance/health-insurance/best-health-insurance-plans/',
    };
  }

  async open(destination) {
    await this.page.goto(this.destinations[destination], { waitUntil: 'domcontentloaded' });
  }

  async openFooterResource(name) {
    await this.page.getByRole('contentinfo').getByRole('link', { name, exact: true }).click();
  }
}

module.exports = { NavigationBar };