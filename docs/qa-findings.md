# Beshak QA Notes

**Run date:** November 11, 2026

**Browser:** Chromium, desktop viewport

**Site:** Live Beshak.org

## What I checked

I ran the Playwright suite against the article feed, video library, both plan directories, the HDFC Ergo product page, a health-plan comparison page, and the opening screen of each proposal form. All eight automated checks passed. I also selected plans in the health listing manually to inspect the comparison tray.

I could not play the Drive recording myself: the preview stayed on “Loading,” and its play control was disabled. I used the workflow breakdown included with the assignment as the requested scope, but I have not independently confirmed each step against the video.

## Findings

| ID | Priority | Status | What I observed |
| --- | --- | --- | --- |
| BUG-01 | P2 | Reproduced | Selecting two plans displays “Add 1 more plan to compare.” Selecting another shows “Can not add more than 2 products!” The page invites a third selection and then refuses it. The assignment walkthrough says a third plan is added later, so the expected behavior needs clarification. |
| OBS-01 | Informational | Confirm against recording | Form 1 opens with six progress stages and basic proposer details. Form 2 opens with four stages and extra fields: parents’ names, height, weight, place of birth, and political-exposure/COVID questions. I did not treat the difference as a bug because the two links appear to represent different form variants. |
| OBS-02 | Low | Unconfirmed accessibility concern | In the Form 2 accessibility snapshot, the Education textbox name appeared as “Education Education”; Form 1 showed “Education.” This needs checking with the rendered accessibility tree or a screen reader before filing as a defect. |
| OBS-03 | Needs confirmation | Not reproduced | The supplied breakdown mentions an “Add product to compare” modal. The comparison page I reached showed two plans and comparison sections, plus links to similar comparisons; I did not find that modal in this route. It may belong to another entry point or a different version of the site. |
| BLOCK-01 | Blocking | Open | Drive playback was unavailable during my review. I need a working link or access permission to verify the video’s exact page sequence and expected results. |

The form pages also logged a generic 403 resource error and a duplicate Meta Pixel ID warning in the browser console. I did not see a user-facing failure tied to either message, so I have not logged them as bugs.

## Automated coverage

The tests verify that:

- Form 1 shows its proposer heading, name fields, required contact/address fields, and Continue control.
- Form 2 shows the shared fields plus its additional family, birth, and yes/no question fields.
- The article feed, term/health directories, HDFC product overview tabs, and a two-plan comparison page render.
- Clicking a featured video opens an iframe dialog without navigating away from the Videos page.

The form checks stop at the initial screen. They do not input personal information, click Continue, upload a file, or submit either proposal. Tests also avoid “Discuss with expert” and “Book a consultation.” The manual comparison-tray check is not yet automated because the listing uses duplicate responsive controls.

## Form cases still to run

These are proposed checks, not observed defects. Run them with synthetic data in staging or with an approved test identity.

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

1. Ask Karan to clarify the three-plan flow versus the live two-plan cap and, if possible, provide access to the walkthrough.
2. Verify the article and guide routes named in the recording; this run checked the article feed, not every linked article.
3. Use an approved test identity or staging site before exercising form navigation and uploads.
4. Automate the remaining form branches and comparison selection once the expected behavior is confirmed.
5. Check the Form 2 Education accessible name with assistive technology before deciding whether OBS-02 is a defect.

## Result

`npm test` passed **8 of 8 tests** in Chromium on November 11, 2026. Passing indicates the tested page elements rendered; it does not mean either proposal form was completed end to end.