# HubSpot form integration

Portal: 149663853 (EU). Existing custom website forms use the public Forms Submission API through same-origin server routes. No private CRM API token is needed.

| Submission | HubSpot form ID |
| --- | --- |
| Newsletter / Approach signup | c206e748-9d59-40d4-a56d-9a1809268d32 |
| Buyer checklist | 502d654b-6e33-4e22-a72d-70fd21fdfc7b |
| Private viewing | a471e334-eeae-449c-9804-7e3b2889bb6d |
| Benchmarkers | d7bdb57b-77c2-45b6-be23-f3774892cb5b |

Email subscription: Newsletters and property updates, ID 4013175565. Only actual opt-ins are submitted as communications consent. Enquiries without an opt-in remain CRM records without a new newsletter subscription. Existing subscriptions are not revoked by a later enquiry.

All forms include a processing notice, email validation, same-origin checks and a honeypot. The server reports success only after HubSpot accepts a submission. Failed upstream requests are not retried automatically. Contact details never enter GA4 or Meta event parameters. Newsletter signups use GA4 sign_up and Meta CompleteRegistration; viewing, checklist and Benchmarkers requests use generate_lead and Meta Lead, distinguished by form name.

Run server behaviour tests with Node 24:
`node --test tests/hubspot-forms.test.mjs`

## Follow-up work before email launch

- Authenticate the sending domain and verify updates@criterionhomesltd.com.
- Configure welcome/acknowledgement emails and test them before enabling.
- Supply the actual buyer-checklist file or hosted URL before enabling its delivery email.
- Configure and verify the intended team notification recipients in the account before launch.
- Confirm full campaign attribution separately. Forms submit the actual page URL/title and any existing HubSpot cookie. This change does not install the HubSpot tracking script or create a new cookie policy.
- Test each form through the deployed website, verify the contact and submission in HubSpot, and verify actual event receipt in GA4/Meta. Cloud build success alone is not an end-to-end test.

The old Brevo configuration is no longer read by these routes; do not remove unrelated provider settings until rollout is verified.
