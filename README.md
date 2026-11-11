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
- `tests/form2-live-journey.spec.js` is an opt-in Form 2 journey through document upload; it stops before final submission.
- `tests/site-workflows.spec.js` checks article/video pages, plan directories, product details, and a comparison page.
- `docs/qa-findings.md` contains observations from the November 11 run, test limits, and cases still to test.

## Current coverage and safety boundary

The form tests only inspect visible fields. They do not enter data, click Continue, upload files, or submit proposals. No test clicks “Discuss with expert” or “Book a consultation.” The site tests open a video dialog and read a static comparison page; they do not finish the comparison tray flow.

The Form 2 live journey is skipped by default because continuing a public proposal may create a server-side draft. The current Form 2 URL displays “Proposal submitted successfully”; the tests detect this and skip rather than replaying it. To use a fresh, approved test URL and explicitly run the journey in headed mode with synthetic values and the included dummy PDF, set both environment variables in PowerShell:

```powershell
$env:FORM2_TEST_URL = 'https://www.beshak.org/insurance/forms/proposal/<fresh-approved-test-id>/'
$env:RUN_LIVE_FORM_JOURNEY = '1'
npx playwright test tests/form2-live-journey.spec.js --headed
Remove-Item Env:RUN_LIVE_FORM_JOURNEY
Remove-Item Env:FORM2_TEST_URL
```

It stops at the Upload Documents screen and does not click Submit. Obtain approval for live testing before enabling it.

This is smoke coverage, not an end-to-end test. The Word log contains manual Form 2 screenshots through the upload/declaration stage; the current public Form 2 URL now shows a success state. Form 1 has not been progressed beyond its opening screen. Use an approved test identity or staging environment before running further live form tests. The report distinguishes the static comparison URL covered by automation from the stateful add-product dialog shown in the recording.

The tests depend on the public pages being reachable and their accessible names remaining stable. They make no backend or persistence assertions.