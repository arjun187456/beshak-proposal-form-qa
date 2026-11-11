# QA Findings and Test Strategy

**Review date:** 2026-11-11

**Scope:** Homepage resources, article/video feeds, term/health plan directories and product pages, health comparison page, and Form 1/Form 2 initial states

**Environment:** Chromium, desktop default viewport, live site

## Summary

The article/video feeds, plan directories, product details, comparison view, and both form initial screens rendered in Chromium. A comparison tray copy mismatch was reproduced. The supplied Drive video remained in a loading state with playback disabled, so the detailed breakdown supplied in the assignment was used as the intended scope. Findings below distinguish direct observations from items that still need confirmation.

## Findings

| ID | Type | Priority | Status | Observation / evidence |
| --- | --- | --- | --- | --- |
| OBS-01 | Form variation | Informational | Expected behavior needs walkthrough confirmation | Form 1 displayed six progress stages and the basic proposer fields. Form 2 displayed four stages and additional proposer fields, including father’s and mother’s names, height, weight, place of birth, and political-exposure/COVID questions. This may be intentional variation; confirm against the recording before treating it as a discrepancy. |
| OBS-02 | Accessibility candidate | To triage | Unconfirmed | The Form 2 browser accessibility snapshot exposed the Education textbox name as “Education Education”; Form 1 exposed “Education”. Confirm in the rendered accessibility tree and with a screen reader. If the duplicate is announced, consolidate the associated label and placeholder naming. |
| BUG-01 | Comparison tray copy | P2 | Reproduced on live page | After two plans are selected, the tray says “Add 1 more plan to compare”; selecting a third produces “Can not add more than 2 products!” The current listing flow therefore rejects the extra selection while its copy invites it. Confirm whether three plans should be supported; otherwise update the prompt to reflect the two-plan limit. |
| OBS-03 | Comparison add-product modal | P2 | Needs walkthrough confirmation | The supplied walkthrough describes an “Add product to compare” modal after opening comparison. The public comparison page reached from the plan listing rendered a static two-plan comparison and similar-plan links; the described modal was not present in the observed page state. Confirm whether this flow is behind a different entry point or whether the walkthrough reflects a previous site version. |
| BLOCK-01 | Test access | Blocking | Open | The Google Drive page showed “Loading”; the play control was disabled and the transcript was unavailable. Later journey expectations could not be compared with the assignment walkthrough. Request a working video link or access permission. |

### Non-actionable console observations

The browser session logged a generic 403 resource response on both form pages and a duplicate Meta Pixel ID warning. No user-visible impact was established, so these are not reported as product bugs. Identify the failing request and confirm analytics behavior in an authorized environment before triage.

## Automated coverage

The Playwright suite currently checks:

- Form 1 loads the proposer heading, name fields, starred contact/address fields, and Continue control.
- Form 2 loads the proposer heading, shared fields, its additional family/birth fields, three select controls, two yes/no question groups, and Continue control.
- The article feed, term/health plan directories, HDFC Ergo detail tabs/FAQ tab, and an Aditya Birla versus HDFC comparison page render expected content.
- A featured video opens a dialog with a visible iframe and does not change the Videos URL.

The proposal tests remain read-only: no personal data is entered, no documents are uploaded, and neither form is advanced or submitted. The plan-selection tray was explored manually to reproduce BUG-01; its responsive custom controls are not automated yet. No test interacts with “Discuss with expert” or “Book a consultation.”

## Form Edge Cases

These are recommended tests, not confirmed defects. Use synthetic values and an approved staging/test identity before advancing forms.

| Form | Edge case | Expected behavior to verify |
| --- | --- | --- |
| Both | Required fields blank; whitespace-only names | Field-level errors, focus to the first invalid field, no advancement |
| Both | Malformed email; mobile too short/long, letters, leading zero, country code; alternate number equals primary | Clear format/range feedback without silent truncation |
| Both | Pincode too short/long, non-numeric, or leading zero | Correct validation and location lookup behavior |
| Both | Future/impossible DOB, leap day, minimum/maximum supported age | Invalid dates rejected and age boundaries explained |
| Both | Apostrophes, hyphens, accents, long names/address | Valid input preserved without layout clipping or destructive truncation |
| Both | Gender/marital status via keyboard; back/forward and refresh | Correct selection and persistence across navigation |
| Form 2 | Height/weight minimum, maximum, blank and boundary values | Clear units and correctly enforced ranges |
| Form 2 | Yes/no answers for political exposure/COVID | Conditional fields appear only when applicable and answer changes do not leave stale values |
| Form 2 | Parent names empty, long, punctuation | Confirm requiredness against expected rules and support valid punctuation |
| Later steps | Invalid/missing uploads, file type/size boundaries, cancel/replace/retry | Actionable upload feedback, retained form state, unsupported files rejected |
| Both | Network failure, repeated Continue, session expiry, browser back/refresh | Recoverable state, no duplicate record creation |

## Recommended follow-up test matrix

| Area | Scenarios | Priority |
| --- | --- | --- |
| Homepage navigation | Hover Term/Health/Decode Plans; verify menu links, dismissal, keyboard access, and destinations | P1 |
| Guides and articles | Article discovery from guide pages, long-form scroll, bullets/table layout, category switching and back navigation | P2 |
| Plan details | Introduction/Quick Overview/Detailed Overview/FAQs tabs, accordion state, sticky navigation and content alignment | P1 |
| Comparison | One/two/three-plan selection, tray messaging and limits, add-product modal, removal, clear-all and comparison sections | P1 |
| Video modal | Open cards, close/Escape, iframe load failure, focus/scroll lock, URL stability | P2 |
| Form validation and navigation | Required fields, formats, age/pincode boundaries, next/back, refresh, preserved values and duplicate submit | P1 |
| Conditional/numeric form fields | Yes/no branches, height/weight boundaries, keyboard selection and stale hidden values | P1 |
| Uploads and resilience | File type/size, corrupt file, cancel/replace/retry, network interruption, session expiry and recovery | P1 |
| Accessibility and responsive UI | Labels, keyboard-only flow, focus/error announcement, zoom, narrow viewport and mobile layout | P1 |
| Privacy and completion | Consent, data minimization, confirmation, no unexpected contact/booking side effects | P1 |

## Test approach

1. Reconcile the walkthrough's three-plan/modal sequence with the current listing limit and resolve BUG-01.
2. Obtain working walkthrough access and confirm guide/article routes and form field rules.
3. Use a staging environment or explicit test identity before testing progression or uploads.
4. Prefer role/name POM locators where exposed; use visible-card controls for custom widgets.
5. Cover each form's branches, boundary values, recovery paths, and representative upload types.
6. Capture traces/screenshots on failure without storing real personal data or documents.
7. Re-run page-level smoke tests, then full form journeys in staging.

## Run record

The local Playwright suite passed **8/8 tests** on 2026-11-11 in Chromium. The forms are covered only at their initial state; later form journeys remain untested.