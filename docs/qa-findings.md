# Beshak QA Notes

**Run date:** November 11, 2026

**Browser:** Chromium, desktop viewport; local MP4 sampled by seeking

**Site:** Live Beshak.org

## What I checked

I sampled the local 1:34 recording by seeking through it, and checked the visible browser content at each position. The clip shows a homepage, guide and article pages, plan directories and product details, plan comparison, then the video library and its player overlay. The player’s displayed time sometimes lagged after a seek; timestamps below are approximate and refer to the sought position, not a frame-accurate edit list.

I also ran the Playwright suite against the article feed, video library, both plan directories, the HDFC Ergo product page, a static health-plan comparison URL, and both proposal form opening screens. All eight automated checks passed.

## Walkthrough trace

| Approx. position | Frame content |
| --- | --- |
| 00:01 | Beshak homepage and primary navigation. |
| 00:14 | “Term Insurance for Housewives” guide page, with explanatory text and plan content below. |
| 00:21 | “How Does Term Insurance Work?” term article. |
| 00:28 | Health Insurance featured-articles feed. |
| 00:35 | Article view titled “Why Does Beshak Recommend the Same 3 Health Insurance Plans?”; the Term menu is also shown open in a sampled frame. |
| 00:42 | Best Term Life Insurance Plans of 2026 directory; TATA AIA Sampoorna Raksha Promise is visible with its Compare control. |
| 00:49 | HDFC Ergo Optima Secure+ product page, with “Detailed Overview” selected. The other visible tabs are Introduction, Quick Overview, and FAQs. |
| 00:56 | Health plan directory with Compare choices selected. |
| 01:03 | Health comparison table with three plan columns, including product benefits and limits/exclusions. |
| 01:07-01:11 | Comparison state with an “Add product to compare” slot. |
| 01:13 | Centered “Add To Compare” dialog with plan choices, plus/minus controls, and a Compare button. |
| 01:15-01:17 | Comparison table continues with three plan columns, followed by similar-plan comparisons. |
| 01:24-01:31 | Health Videos page. A thumbnail opens a centered overlay with an X and embedded player; the underlying video cards remain visible. |

The comparison modal is a state reached from the plan-selection journey in the video. Opening a static comparison URL directly in the browser shows a two-plan comparison and similar-plan links, but does not show the add-product slot. The automated test currently covers that static route; it does not yet recreate the stateful route shown in the recording.

## Findings

| ID | Priority | Status | What I observed |
| --- | --- | --- | --- |
| OBS-01 | Informational | Confirm against recording | Form 1 opens with six progress stages and basic proposer details. Form 2 opens with four stages and extra fields: parents’ names, height, weight, place of birth, and political-exposure/COVID questions. I did not treat the difference as a bug because the two links appear to represent different form variants. |
| OBS-02 | Low | Unconfirmed accessibility concern | In the Form 2 accessibility snapshot, the Education textbox name appeared as “Education Education”; Form 1 showed “Education.” This needs checking with the rendered accessibility tree or a screen reader before filing as a defect. |
| OBS-03 | Informational | Confirmed in recording | The comparison page's “Add product to compare” tile opens a centered “Add To Compare” dialog with plan options, plus/minus controls, and a Compare button. After a selection, the clip shows a three-plan table. |
| OBS-04 | Informational | Confirmed in recording | A video thumbnail opens a centered overlay with an X close control and embedded player. The underlying Health Videos page remains visible. |
| OBS-05 | Informational | Manual listing observation | The plan-listing tray enforces its own selection limit. The recording proceeds from the listing into a comparison page before adding another plan, so this listing limit alone is not being reported as a defect. |

The form pages also logged a generic 403 resource error and a duplicate Meta Pixel ID warning in the browser console. I did not see a user-facing failure tied to either message, so I have not logged them as bugs.

## Automated coverage

The tests verify that:

- Form 1 shows its proposer heading, name fields, required contact/address fields, and Continue control.
- Form 2 shows the shared fields plus its additional family, birth, and yes/no question fields.
- The article feed, term/health directories, HDFC product overview tabs, and a two-plan comparison page render.
- Clicking a featured video opens an iframe dialog without navigating away from the Videos page.

The manual screenshots in the Word log show Form 2 through Proposer Details, KYC Information, Nominee Details, and the Upload Documents declaration. A later automated navigation to that same URL displayed “Proposal submitted successfully,” so the opening-screen check now skips rather than replaying it. An opt-in Form 2 journey is implemented but was not run; with a fresh approved URL it uses synthetic values and the dummy PDF, then stops at Upload Documents before Submit. No test interacts with “Discuss with expert” or “Book a consultation.” The comparison test checks a static URL and does not yet reproduce the stateful add-plan dialog.

## Form cases still to run

These are proposed checks, not observed defects. Run them with synthetic data in staging or with an approved test identity.

Screenshot-derived Form 1 cases, including the review summary, upload step, and Insured Member Details screen, are listed in [form1-test-cases.md](form1-test-cases.md). The screenshot shows a required error for the unanswered “Is the proposer same as insured member?” question; the other expected behaviors in that checklist still need execution.

| Form | Try | Check |
| --- | --- | --- |
| Both | Leave starred fields blank or enter spaces for a name | Error appears beside the relevant field; the step does not advance |
| Both | Invalid email, mobile with letters/too few digits, or alternate number matching mobile | Input is rejected clearly and is not silently changed |
| Both | Pincode with letters, too few digits, or a leading zero | Validation and any location lookup handle it correctly |
| Both | Future or impossible DOB, leap-day date, age at the supported limits | Invalid dates and unsupported ages receive understandable feedback |
| Both | Long address/name and names with apostrophes or hyphens | Valid content remains intact and fits the layout |
| Form 2 | Choose minimum/maximum height and weight; change each yes/no answer | Allowed ranges are clear; conditional fields update and stale answers are cleared |
| Form 2 | Leave parents’ names blank or enter punctuation/long values | Actual requiredness is clear and valid punctuation is accepted |
| Later steps | Wrong file type, oversize/corrupt file, cancel then retry | Upload error is useful and entered form state remains intact |
| Both | Refresh, browser back, repeat Continue, or interrupt network | User can recover without duplicate submission or losing saved answers |

## Next steps

1. Get a fresh approved Form 2 test URL before running the opt-in journey; the current link is already submitted.
2. Recreate the stateful comparison journey from the health directory through “Compare Now,” then automate the add-plan dialog seen in the recording.
3. Verify the guide/article links and expected menu behavior against the named pages in the recording; this run sampled their visible states, not every link or hover.
4. Use an approved test identity or staging site before exercising form navigation and uploads.
5. Automate form validation branches and uploads after expected rules are confirmed.
6. Check the Form 2 Education accessible name with assistive technology before deciding whether OBS-02 is a defect.

## Result

Latest `npm test` run: **7 passed, 2 skipped** in Chromium. The Form 2 opening-screen check skipped because the public link shows a submission-success state; the opt-in multi-step journey also skipped because its environment gate was unset. Passing the default suite does not mean either proposal form was completed end to end.