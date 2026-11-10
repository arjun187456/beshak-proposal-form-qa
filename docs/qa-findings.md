# QA Findings and Test Strategy

**Review date:** 2026-11-10

**Scope:** Form 1 and Form 2 proposal entry URLs, initial state only

**Environment:** Chromium, desktop default viewport, live site

## Summary

No confirmed user-facing functional bug was established in the read-only review. Both form URLs rendered a “Proposer Details” page with a visible Continue control. The supplied walkthrough could not be reviewed: Google Drive showed the file as loading and its playback control was disabled. Findings below distinguish direct observations from items that need confirmation.

## Findings

| ID | Type | Priority | Status | Observation / evidence |
| --- | --- | --- | --- | --- |
| OBS-01 | Form variation | Informational | Expected behavior needs walkthrough confirmation | Form 1 displayed six progress stages and the basic proposer fields. Form 2 displayed four stages and additional proposer fields, including father’s and mother’s names, height, weight, place of birth, and political-exposure/COVID questions. This may be intentional variation; confirm against the recording before treating it as a discrepancy. |
| OBS-02 | Accessibility candidate | To triage | Unconfirmed | The Form 2 browser accessibility snapshot exposed the Education textbox name as “Education Education”; Form 1 exposed “Education”. Confirm in the rendered accessibility tree and with a screen reader. If the duplicate is announced, consolidate the associated label and placeholder naming. |
| BLOCK-01 | Test access | Blocking | Open | The Google Drive page showed “Loading”; the play control was disabled and the transcript was unavailable. Later journey expectations could not be compared with the assignment walkthrough. Request a working video link or access permission. |

### Non-actionable console observations

The browser session logged a generic 403 resource response on both form pages and a duplicate Meta Pixel ID warning. No user-visible impact was established, so these are not reported as product bugs. Identify the failing request and confirm analytics behavior in an authorized environment before triage.

## Automated coverage

The Playwright suite currently checks:

- Form 1 loads the proposer heading, name fields, starred contact/address fields, and Continue control.
- Form 2 loads the proposer heading, shared fields, its additional family/birth fields, three select controls, and Continue control.

The current tests are intentionally read-only. They assert visible state; they do not prove that the fields reject invalid values or that advancing works. No personal data is entered, no documents are uploaded, and no proposal is advanced or submitted. The prohibited “Discuss with expert” and “Book a consultation” actions are not used.

## Recommended follow-up test matrix

| Area | Scenarios | Priority |
| --- | --- | --- |
| Required fields and formats | Empty step, whitespace-only names, malformed email, phone lengths, invalid/edge DOB, pincode length and characters | P1 |
| Step navigation | Valid step progression, back/next, refresh behavior, retained values, duplicate submission prevention | P1 |
| Conditional questions | Yes/no branches for political exposure, COVID, health, tobacco, and dependent/family sections; verify hidden values do not leak into submission | P1 |
| Numeric and select inputs | Height/weight boundaries, keyboard selection, blank/default behavior, unit consistency | P2 |
| Uploads | Allowed extensions, size boundary, corrupt file, cancel/replace/remove, upload retry and accessible error | P1 |
| Resilience | Network interruption, slow response, server validation errors, session expiration, double-click handling | P1 |
| Accessibility and responsive UI | Labels and required state, keyboard-only flow, focus/error announcement, zoom, narrow viewport and mobile layout | P1 |
| Privacy and completion | Consent copy, data minimization, confirmation state, no unexpected contact/booking side effects | P1 |

## Test approach

1. Obtain a working walkthrough and confirm the intended step sequence and expected field rules.
2. Request a staging environment or explicit test identities before exercising multi-step submission or uploads.
3. Keep POM locators role/name based; add validation and journey tests only after expected outcomes are confirmed.
4. Cover each form’s distinct branches, boundary values, recovery paths, and representative upload types.
5. Capture traces and screenshots on failure; avoid storing real personal data or uploaded documents in artifacts.
6. Re-run a small smoke suite on both forms after changes, then run the full journey suite in staging.

## Run record

The local Playwright smoke suite passed **2/2 tests** on 2026-11-10 after installing Chromium. It covered only the initial states described above.