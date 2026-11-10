# Beshak Proposal Form QA

Read-only Playwright smoke tests for the two proposal form variants from the QA assignment.

## Requirements

- Node.js 20 or newer
- npm

## Install and run

```bash
npm ci
npx playwright install chromium
npm test
```

For a visible browser, run `npm run test:headed`.

## Layout

- `pages/proposal-form.page.js` contains shared page locators and navigation.
- `tests/proposal-forms.spec.js` checks the initial state of both forms.
- `docs/qa-findings.md` records current observations, limitations, and the broader test strategy.
- `docs/email-acknowledgment.md` is a draft response about the inaccessible walkthrough.

## Current coverage and safety boundary

The tests navigate to the live proposal URLs and verify the proposer heading, visible controls, and form-specific fields. They do not enter personal data, click Continue, upload documents, or submit a proposal. They also do not interact with “Discuss with expert” or “Book a consultation.”

This is smoke coverage, not end-to-end coverage of the full proposal journeys. The supplied Drive video remained in a loading state with playback disabled in the review session, so its later steps and expected outcomes could not be verified. Do not extend these tests to progress or submit live forms without an agreed test account or a safe staging environment.

The tests depend on the public pages being reachable and their accessible names remaining stable. They make no backend or persistence assertions.