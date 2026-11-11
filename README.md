# Beshak Proposal Form QA

Playwright smoke tests for Beshak content, plan pages, the comparison view, video modal, and two proposal form variants.

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

- `pages/` contains page objects for navigation, content, plan listings, comparison, and proposal forms.
- `tests/proposal-forms.spec.js` checks the initial state of both forms.
- `tests/site-workflows.spec.js` checks article/video pages, plan directories, plan details, and a comparison page.
- `docs/qa-findings.md` records observations, form edge cases, limitations, and the broader test strategy.
- `docs/email-acknowledgment.md` is a draft response about the inaccessible walkthrough.

## Current coverage and safety boundary

The proposal tests navigate to the live form URLs and verify the proposer heading, visible controls, and form-specific fields. They do not enter personal data, click Continue, upload documents, or submit a proposal. No test interacts with “Discuss with expert” or “Book a consultation.” Site smoke tests exercise content routes, the video dialog, and a static comparison page. The comparison tray observation is documented in the QA report.

This is smoke coverage, not full end-to-end coverage. Drive playback remained unavailable during direct review; the supplied walkthrough breakdown informed the page scope, but later form steps remain untested. Do not advance or submit live forms without an agreed test identity and safe staging environment. The comparison tray's two-plan limit/copy mismatch is recorded for triage.

The tests depend on the public pages being reachable and their accessible names remaining stable. They make no backend or persistence assertions.