# Form 1 Manual Test Cases

These cases are derived from the screenshots in `Form 1 Manual Testing Log.docx`. The screenshots show entered sample data, but its values are intentionally not repeated here. Treat these as test scenarios, not confirmed pass results or defects. Use synthetic values in an approved test environment. Do not click the final Submit button.

**Form:** https://www.beshak.org/insurance/forms/proposal/e6e1a19a-b059-409d-aea5-ca5331151163/  
**Observed progress labels:** Basic Details, Bank Details, KYC Information, Nominee Details, Upload Documents, Insured Member Details. A review summary page is also shown.  
**Evidence source:** User-provided screenshots embedded in the local Form 1 manual testing log.

| ID | Screen / area | Test steps | Expected result to verify | Status |
| --- | --- | --- | --- | --- |
| F1-01 | Basic Details - required fields | Leave required name, DOB, mobile, email, address, and pincode fields blank; click Continue. | Required fields are identified, errors are understandable, and progression is blocked. | Not run from screenshots |
| F1-02 | Basic Details - format and boundaries | Try malformed email, mobile with too few/many digits, nonnumeric pincode, impossible/future DOB, and names/address with punctuation or long text. | Invalid inputs are rejected clearly; valid punctuation and supported lengths are preserved. | Not run from screenshots |
| F1-03 | Basic Details - selections | Select each gender and marital-status option; move away and back. | Selected values remain correct and are shown in the review summary. | Not run from screenshots |
| F1-04 | Bank Details | Leave each required bank field blank; then try malformed account/IFSC values and valid synthetic values. | Required validation and accepted formats are clear; values persist after Back/Continue. | Screen shown; behavior not verified |
| F1-05 | KYC Information | Inspect occupation and annual-income selectors. Change occupation and check for dependent fields; navigate Back and Continue. | Available choices are usable; conditional fields and retained values behave consistently. | Screen shown; behavior not verified |
| F1-06 | Nominee Details - required fields | Leave nominee name blank and try Continue; then provide synthetic name, relationship, DOB, and mobile. | Required fields are identified; valid nominee data advances and remains in the summary. | Screen shown; behavior not verified |
| F1-07 | Nominee Details - relationship and age | Exercise relationship options and DOB boundaries, including nominee younger/older than proposer where allowed. | Supported relationships and age rules are enforced with clear feedback. | Not run from screenshots |
| F1-08 | Upload Documents - required documents | Check Aadhaar front/back, PAN card, and cancelled cheque upload controls; continue with a required file missing, then attach dummy files. | Required uploads are clearly marked; missing documents block progression; selected filenames are visible. | Screens shown; behavior not verified |
| F1-09 | Upload Documents - file handling | For each upload control, try allowed PDF/JPG/PNG, unsupported type, oversize file, cancel, remove, and replace. | Accepted types/size are consistent with helper text; invalid files show errors; cancel/replace works without losing other data. | Not run from screenshots |
| F1-10 | Insured Member Details - proposer relationship | Leave “Is the proposer same as insured member?” unanswered and attempt to continue/review. | Required validation appears and progression is blocked. Screenshot evidence shows a required message for this unanswered question. | Error visible in screenshot; retest needed |
| F1-11 | Insured Member Details - member records | Choose proposer-is-member Yes and No; test Add Member, member name, gender, DOB, marital status, relationship, occupation, address, pincode, and State. | The correct member fields appear for each branch; adding members updates the count/pagination and does not overwrite existing members. | Screen shown; behavior not verified |
| F1-12 | Insured Member Details - accordions | Open Basic Details, Lifestyle Details, Medical History, and Hospitalization History. | Each section expands/collapses; answers are retained when switching sections. | Sections visible in screenshot; behavior not verified |
| F1-13 | Lifestyle questions | Select alcohol, cigarette/bidi, and tobacco answers, including changing Yes to No and back. | Conditional follow-up questions appear only when relevant; changed answers do not leave stale values. | Screen shown; behavior not verified |
| F1-14 | Medical History | Select a synthetic pre-existing condition, enter details and diagnosis date, and attach a dummy supporting document. | Condition selection, detail/date validation, and conditional upload behave as expected. | Fields shown in screenshot; behavior not verified |
| F1-15 | Hospitalization History | Answer Yes/No for past hospitalization; inspect any follow-up fields on Yes and switch back to No. | Follow-ups appear/clear correctly and requiredness is communicated. | Question shown in screenshot; behavior not verified |
| F1-16 | Review summary | Compare Basic Details, Bank Details, KYC Information, Nominee Details, and uploaded files with entered synthetic values; use each edit icon and return. | Summary matches saved answers; edit returns to the correct section and changes persist. | Review summary shown; behavior not verified |
| F1-17 | Final action safety | On Insured Member Details/review, verify the final action is present, but do not activate it. | Record the button label and any declaration/consent requirements without submitting the proposal. | Deliberately not submitted |

## Run record

Record each case as Pass, Fail, Blocked, or Not Run only after executing it. Add the screenshot filename, browser, date, and bug ID for any failure. The screenshots currently establish which fields and sections exist; they do not prove validation or save behavior except for the required message shown in F1-10.
