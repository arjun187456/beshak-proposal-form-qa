const path = require('node:path');
const { test, expect } = require('@playwright/test');
const { ProposalFormPage } = require('../pages/proposal-form.page');

const form2Url = process.env.FORM2_TEST_URL || 'https://www.beshak.org/insurance/forms/proposal/36db064a-5415-4e38-a412-0f33378b2bd7/';
const uploadFile = path.join(__dirname, 'fixtures', 'synthetic-upload.pdf');

test('Form 2 advances through nominee details and uploads a synthetic file', async ({ page }) => {
  test.skip(
    process.env.RUN_LIVE_FORM_JOURNEY !== '1',
    'Opt-in only: advancing this live proposal can create a server-side draft.',
  );

  const form = new ProposalFormPage(page);
  await page.goto(form2Url, { waitUntil: 'domcontentloaded' });
  const pageState = await Promise.race([
    form.heading.waitFor({ state: 'visible' }).then(() => 'form'),
    page.getByText(/Proposal submitted successfully/i).waitFor({ state: 'visible' }).then(() => 'submitted'),
  ]);
  if (pageState === 'submitted') {
    test.skip(true, 'This proposal URL is already submitted; use a fresh approved test URL.');
  }

  await form.textbox('First Name').fill('QA');
  await form.textbox('Last Name').fill('Sample');
  await page.getByText('Male', { exact: true }).click();
  await form.textbox('DOB *').fill('01-01-1990');
  await form.textbox('Mobile Number *').fill('9999999999');
  await form.textbox('Email *').fill('qa.sample@example.com');
  await form.textbox('Address *').fill('1 Test Lane');
  await form.textbox('Pincode *').fill('110001');

  const basicSelects = form.comboboxes();
  await basicSelects.nth(0).selectOption({ label: 'Unmarried' });
  await basicSelects.nth(1).selectOption({ label: '6 ft' });
  await basicSelects.nth(2).selectOption({ label: '70 kg' });
  await form.textbox("Father's Name").fill('Test Father');
  await form.textbox("Mother's Name").fill('Test Mother');
  await form.textbox('Place of Birth').fill('Test City');

  const yesNo = page.getByRole('radio');
  await yesNo.nth(1).check({ force: true });
  await yesNo.nth(3).check({ force: true });
  await form.continueButton.click();
  await expect(page.getByText('KYC Information', { exact: true })).toBeVisible();

  await form.comboboxes().nth(0).selectOption({ label: 'Student' });
  await form.textbox(/Annual Income/i).fill('500000');
  await form.textbox(/Organization Name/i).fill('QA Sample Organization');
  await form.comboboxes().nth(1).selectOption({ label: 'Private LTD' });
  await form.textbox(/Designation/i).fill('QA Tester');
  await form.textbox(/Industry/i).fill('Information Technology');
  await form.continueButton.click();
  await expect(page.getByText('Nominee Details', { exact: true })).toBeVisible();

  await form.textbox(/Nominee Name/i).fill('Test Nominee');
  await form.comboboxes().nth(0).selectOption({ label: 'Father' });
  await form.textbox(/Nominee Date of Birth|Nominee DOB/i).fill('01-01-1960');
  await form.continueButton.click();
  await expect(page.getByText('Upload Documents', { exact: true })).toBeVisible();

  const uploadInputs = page.locator('input[type="file"]');
  await expect(uploadInputs.first()).toBeAttached();
  await uploadInputs.first().setInputFiles(uploadFile);
  await expect(page.getByText(/Selected File:.*synthetic-upload\.pdf/i)).toBeVisible();
});