class ProposalFormPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Proposer Details' });
    this.continueButton = page.getByRole('button', { name: /Continue/ });
  }

  async open(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.heading.waitFor({ state: 'visible' });
  }

  textbox(name) {
    return this.page.getByRole('textbox', { name });
  }

  comboboxes() {
    return this.page.getByRole('combobox');
  }
}

module.exports = { ProposalFormPage };