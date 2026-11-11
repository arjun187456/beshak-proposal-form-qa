class ComparisonEnginePage {
  constructor(page) {
    this.page = page;
  }

  heading() {
    return this.page.getByRole('heading', { level: 1 });
  }

  section(name) {
    return this.page.getByText(name, { exact: false }).first();
  }
}

module.exports = { ComparisonEnginePage };