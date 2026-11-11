# Beshak Site QA

Small Playwright suite for the public Beshak site and the two proposal form entry screens. The suite currently checks eight read-only page journeys; it does not complete either application.

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

## Project files

- `pages/` contains page objects for site navigation, content, plan listings, comparison pages, and proposal forms.
- `tests/proposal-forms.spec.js` checks the initial screen of each form.
- `tests/site-workflows.spec.js` checks article/video pages, plan directories, product details, and a comparison page.
- `docs/qa-findings.md` contains observations from the November 11 run, test limits, and cases still to test.
- `docs/email-acknowledgment.md` is an unsent email draft asking for working video access.

## Current coverage and safety boundary

The form tests only inspect visible fields. They do not enter data, click Continue, upload files, or submit proposals. No test clicks “Discuss with expert” or “Book a consultation.” The site tests open a video dialog and read a static comparison page; they do not finish the comparison tray flow.

This is smoke coverage, not an end-to-end test. Drive playback was unavailable during review, and later form steps have not been tested. Use an approved test identity or staging environment before progressing live forms. The comparison tray’s two-plan limit and contradictory prompt are described in the findings document.

The tests depend on the public pages being reachable and their accessible names remaining stable. They make no backend or persistence assertions.