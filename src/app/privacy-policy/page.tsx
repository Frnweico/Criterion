import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { CONTACT } from "@/lib/site";
import styles from "./privacy-policy.module.css";

export const metadata: Metadata = pageMetadata(
  "/privacy-policy",
  "Privacy Policy",
  "Read how Criterion Homes Limited collects and uses personal data submitted through its website and communication channels.",
);

export default function PrivacyPolicyPage() {
  return (
    <>
      <main>
        <article className={styles.policy}>
          <header className={styles.header}>
            <SectionHeader text="Legal" className={styles.eyebrow} />
            <h1>Privacy Policy</h1>
            <p>
              Criterion Homes Limited respects your privacy and is committed to
              handling your personal data responsibly.
            </p>
            <p>
              This Privacy Policy explains how we collect and use information
              when you visit criterionhomesltd.com, submit an enquiry, request
              information about a development, subscribe to updates or
              communicate with us through another channel.
            </p>
            <p>
              This policy applies to information collected through the Criterion
              Homes website. Additional notices or contractual terms may apply
              when you enter into a transaction or formal relationship with
              Criterion Homes.
            </p>
          </header>

          <div className={styles.content}>
            <section>
              <h2>1. Who we are</h2>
              <p>
                Criterion Homes Limited is a property development company
                operating in Abuja, Nigeria, and is responsible for determining
                how personal data collected through this website is used.
              </p>
              <p>
                For questions about this Privacy Policy or your personal data,
                contact us at:
              </p>
              <address>
                <strong>Criterion Homes Limited</strong>
                <br />
                Machima Plaza, Mambolo Junction
                <br />
                Wuse Zone 2, FCT, Abuja
                <br />
                Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                <br />
                Phone: <a href={`tel:${CONTACT.phone}`}>+234 805 857 3915</a>
              </address>
            </section>

            <section>
              <h2>2. Information we collect</h2>
              <p>Depending on how you interact with us, we may collect:</p>
              <ul>
                <li>Your name</li>
                <li>Email address</li>
                <li>Telephone number</li>
                <li>Country or location</li>
                <li>Property interests and preferences</li>
                <li>
                  Information submitted through enquiry, viewing or subscription
                  forms
                </li>
                <li>Messages and records of your communication with us</li>
                <li>Any other information you choose to provide</li>
              </ul>
              <p>
                When you visit the website, certain technical information may
                also be collected automatically, including:
              </p>
              <ul>
                <li>IP address</li>
                <li>Browser and device type</li>
                <li>Referring website or campaign</li>
                <li>Pages visited</li>
                <li>Date and duration of your visit</li>
                <li>General location and website interaction data</li>
              </ul>
              <p>
                Please do not submit sensitive personal information unless it is
                specifically requested and necessary for your enquiry.
              </p>
            </section>

            <section>
              <h2>3. How we collect information</h2>
              <p>We may collect information when you:</p>
              <ul>
                <li>Complete a form on our website</li>
                <li>Subscribe to email updates</li>
                <li>Request information about a development</li>
                <li>Contact us by email, telephone or WhatsApp</li>
                <li>Attend a viewing or communicate with our team</li>
                <li>Browse or interact with our website</li>
              </ul>
              <p>
                Some technical information may be collected automatically
                through cookies and analytics tools.
              </p>
            </section>

            <section>
              <h2>4. How we use your information</h2>
              <p>We may use your information to:</p>
              <ul>
                <li>Respond to enquiries</li>
                <li>Provide information about our developments</li>
                <li>Arrange property viewings or follow-up conversations</li>
                <li>Understand your property interests</li>
                <li>
                  Maintain relationships with prospective and existing buyers
                </li>
                <li>
                  Send newsletters, development updates and relevant
                  opportunities where requested
                </li>
                <li>Improve our website, communications and services</li>
                <li>Measure website and campaign performance</li>
                <li>Conduct research and analysis relating to our business</li>
                <li>Prevent or investigate fraudulent activity</li>
                <li>Maintain business, transaction and compliance records</li>
                <li>Meet legal and regulatory obligations</li>
              </ul>
              <p>
                Submitting an enquiry does not create a property reservation,
                sale agreement or other contractual commitment.
              </p>
            </section>

            <section>
              <h2>5. Our lawful basis for processing</h2>
              <p>
                Depending on the circumstances, we may process your personal
                data based on:
              </p>
              <ul>
                <li>Your consent</li>
                <li>
                  Steps taken at your request before entering into a contract
                </li>
                <li>The performance of a contract</li>
                <li>
                  Our legitimate business interests, where those interests do
                  not override your rights
                </li>
                <li>Compliance with a legal or regulatory obligation</li>
              </ul>
              <p>
                You may withdraw your consent to marketing communications at any
                time.
              </p>
            </section>

            <section>
              <h2>6. Marketing communications</h2>
              <p>
                If you subscribe to our updates, we may send you information
                about developments, company news, industry insights and relevant
                opportunities.
              </p>
              <p>
                You may unsubscribe using the link provided in an email or by
                contacting us at{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
              </p>
              <p>
                Unsubscribing from marketing messages will not prevent us from
                sending necessary communications relating to an active enquiry,
                transaction or existing relationship.
              </p>
            </section>

            <section>
              <h2>7. Cookies and analytics</h2>
              <p>Our website may use cookies and similar technologies to:</p>
              <ul>
                <li>Keep the website functioning properly</li>
                <li>Understand how visitors use the website</li>
                <li>Measure traffic and campaign performance</li>
                <li>Improve the website experience</li>
              </ul>
              <p>
                We may use services such as Google Analytics and Google Tag
                Manager for these purposes.
              </p>
              <p>
                Where required, non-essential cookies will only be used with your
                consent.
              </p>
              <p>
                You can control cookies through your browser settings. Disabling
                some cookies may affect how parts of the website function.
              </p>
            </section>

            <section>
              <h2>8. Service providers and other parties</h2>
              <p>
                We may share relevant information with service providers that
                help us operate the website and manage communications, including:
              </p>
              <ul>
                <li>Website hosting providers</li>
                <li>
                  Customer relationship management and email platforms
                </li>
                <li>Analytics providers</li>
                <li>Communication services</li>
                <li>Professional advisers</li>
                <li>Contractors supporting our operations</li>
              </ul>
              <p>
                These may include Netlify, HubSpot, Google and WhatsApp or Meta
                services.
              </p>
              <p>We do not sell your personal data.</p>
              <p>
                We may also disclose information where required by law, a
                regulatory authority or a court order, or where necessary to
                protect our legal rights and prevent fraudulent activity.
              </p>
            </section>

            <section>
              <h2>9. Electronic communications</h2>
              <p>
                Emails, form submissions, WhatsApp messages and other electronic
                communications sent to Criterion Homes may be recorded and
                retained as part of our enquiry, customer relationship and
                transaction records.
              </p>
              <p>
                Access to these communications may be provided to authorised
                members of our team or service providers where reasonably
                necessary to respond to an enquiry, maintain records, manage a
                transaction or meet a legal obligation.
              </p>
            </section>

            <section>
              <h2>10. How long we retain information</h2>
              <p>
                We retain personal data only for as long as it is reasonably
                necessary for the purpose for which it was collected, including:
              </p>
              <ul>
                <li>Responding to and following up on enquiries</li>
                <li>Managing transactions and customer relationships</li>
                <li>
                  Maintaining financial, contractual and compliance records
                </li>
                <li>Resolving disputes</li>
                <li>Meeting legal or regulatory requirements</li>
              </ul>
              <p>
                When personal data is no longer required, we will delete it,
                anonymise it or restrict its further use where appropriate.
              </p>
            </section>

            <section>
              <h2>11. Your rights</h2>
              <p>
                Subject to applicable law, you may have the right to:
              </p>
              <ul>
                <li>Be informed about how your personal data is used</li>
                <li>Request access to your personal data</li>
                <li>
                  Request correction of inaccurate or incomplete information
                </li>
                <li>Withdraw consent</li>
                <li>Object to certain processing</li>
                <li>
                  Request restriction or deletion of your personal data
                </li>
                <li>Request data portability where applicable</li>
                <li>
                  Request human review of certain automated decisions
                </li>
                <li>
                  Submit a complaint to the Nigeria Data Protection Commission
                </li>
              </ul>
              <p>
                To exercise any of these rights, email{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
              </p>
              <p>
                We may request information necessary to confirm your identity
                before acting on a request.
              </p>
            </section>

            <section>
              <h2>12. Third-party websites</h2>
              <p>
                Our website may contain links to websites and services operated
                by third parties, including maps, social platforms and messaging
                services.
              </p>
              <p>
                This Privacy Policy does not apply to unaffiliated third-party
                websites or services. Criterion Homes is not responsible for
                their content or privacy practices.
              </p>
              <p>
                You should review the privacy policy of any third-party service
                before providing personal information.
              </p>
            </section>

            <section>
              <h2>13. Changes to this policy</h2>
              <p>
                We may update this Privacy Policy to reflect changes in our
                website, operations or legal obligations.
              </p>
              <p>
                The latest version will be published on this page with its
                revision date.
              </p>
            </section>

            <section>
              <h2>14. Questions and complaints</h2>
              <p>
                If you have questions or concerns about how Criterion Homes
                handles your personal data, contact:
              </p>
              <p>
                Email:{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                <br />
                Phone:{" "}
                <a href={`tel:${CONTACT.phone}`}>+234 805 857 3915</a>
              </p>
              <p>
                You may also submit a complaint to the Nigeria Data Protection
                Commission through its official channels.
              </p>
            </section>

            <p className={styles.updated}>Last updated: 4 November 2026</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
