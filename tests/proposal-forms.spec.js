const { test, expect } = require('@playwright/test');
const { ProposalFormPage } = require('../pages/proposal-form.page');

const formUrls = {
  form1: 'https://www.beshak.org/insurance/forms/proposal/e6e1a19a-b059-409d-aea5-ca5331151163/',
  form2: 'https://www.beshak.org/insurance/forms/proposal/36db064a-5415-4e38-a412-0f33378b2bd7/',
};

test.describe('Proposal form initial state', () => {
  test('Form 1 shows proposer fields and required-field markers', async ({ page }) => {
    const form = new ProposalFormPage(page);
    await form.open(formUrls.form1);

    await expect(form.heading).toBeVisible();
    await expect(form.textbox('First Name')).toBeVisible();
    await expect(form.textbox('Last Name')).toBeVisible();
    await expect(form.textbox('DOB *')).toBeVisible();
    await expect(form.textbox('Mobile Number *')).toBeVisible();
    await expect(form.textbox('Email *')).toBeVisible();
    await expect(form.textbox('Address *')).toBeVisible();
    await expect(form.textbox('Pincode *')).toBeVisible();
    await expect(form.continueButton).toBeVisible();
  });

  test('Form 2 includes its additional proposer details', async ({ page }) => {
    const form = new ProposalFormPage(page);
    await form.open(formUrls.form2);

    await expect(form.heading).toBeVisible();
    await expect(form.textbox('First Name')).toBeVisible();
    await expect(form.textbox('Mobile Number *')).toBeVisible();
    await expect(form.textbox("Father's Name")).toBeVisible();
    await expect(form.textbox("Mother's Name")).toBeVisible();
    await expect(form.textbox('Place of Birth')).toBeVisible();
    await expect(form.page.getByText('Are you a politically exposed person?')).toBeVisible();
    await expect(form.page.getByText('Infected with Covid?')).toBeVisible();
    await expect(form.page.getByRole('radio')).toHaveCount(4);
    await expect(form.comboboxes()).toHaveCount(3);
    await expect(form.continueButton).toBeVisible();
  });
});