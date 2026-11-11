class ContentPage {
  constructor(page) {
    this.page = page;
  }

  heading(name) {
    return this.page.getByRole('heading', { name, exact: true });
  }

  async openVideo(title) {
    const url = this.page.url();
    await this.page.locator('.thumbnail-wrapper.loaded').first().waitFor({ state: 'visible' });
    await this.page.getByText(title, { exact: true }).first().click({ force: true });
    await this.page.getByRole('dialog').waitFor({ state: 'visible' });
    return url;
  }
}

module.exports = { ContentPage };