import { Link } from 'wouter';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { Eyebrow, Section } from '@/components/site/primitives';
import { useDocumentMeta } from '@/hooks/use-document-meta';

const TITLE = 'Terms of Use — Airavoto Gaming POS';
const DESCRIPTION = 'Terms of use for Airavoto Gaming POS.';

const sections = [
  {
    title: '1. Acceptance of terms',
    body: `By downloading, installing or using Airavoto Gaming POS ("the Software"), you agree to be bound by these Terms of Use. If you do not agree, do not install or use the Software.`,
  },
  {
    title: '2. License grant',
    body: `Subject to these terms, Airavoto grants you a worldwide, non-exclusive, royalty-free license to download, install and use the Software for your own commercial or non-commercial purposes.\n\nYou may not:\n• Resell or sublicense the Software as a standalone product\n• Remove or alter copyright notices within the source code\n• Represent the Software as your own original work when distributing it`,
  },
  {
    title: '3. Free of charge',
    body: `The Software is provided free of charge. There are no subscription fees, seat licence fees, module unlock fees or any other charges associated with downloading, installing or using the Software. Future updates are also free.`,
  },
  {
    title: '4. Self-hosted deployment',
    body: `The Software is designed to be installed and operated on hardware you own or control. You are solely responsible for:\n\n• The security and integrity of your installation\n• Maintaining regular database backups\n• Keeping dependencies (Node.js, PostgreSQL) up to date\n• Complying with all applicable laws and regulations in your jurisdiction, including data protection laws relating to your customers' personal data`,
  },
  {
    title: '5. No warranty',
    body: `THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.\n\nAiravoto does not warrant that the Software will be error-free, uninterrupted, or free of security vulnerabilities. You use the Software at your own risk.`,
  },
  {
    title: '6. Limitation of liability',
    body: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, AIRAVOTO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, LOSS OF REVENUE OR LOSS OF BUSINESS, ARISING OUT OF OR IN CONNECTION WITH THE USE OR INABILITY TO USE THE SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.\n\nIn no event shall Airavoto's total liability to you exceed the amount you paid for the Software (which is zero).`,
  },
  {
    title: '7. Third-party components',
    body: `The Software includes open-source third-party libraries (React, Express, Drizzle ORM, PostgreSQL, etc.) each governed by their own licenses. A full list of dependencies and their licenses is available in the package.json file distributed with the Software.`,
  },
  {
    title: '8. Modifications and contributions',
    body: `You are welcome to modify the Software for your own use. If you submit contributions to the project (via pull requests or issues), you grant Airavoto a perpetual, worldwide, royalty-free license to use, modify and distribute those contributions as part of the Software.`,
  },
  {
    title: '9. Termination',
    body: `Your license to use the Software is effective until terminated. It terminates automatically if you breach any of these terms. Upon termination, you must cease using the Software and delete all copies from your systems.`,
  },
  {
    title: '10. Governing law',
    body: `These Terms are governed by the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in India.`,
  },
  {
    title: '11. Café responsibilities and data accuracy',
    body: `You are responsible for providing accurate and current information about your café, including its name, address, contact details, equipment, prices, opening hours, happy-hour schedules, operating status and seat availability. You must promptly correct information that is false, stale, incomplete or misleading.\n\nYou must operate the café and the Software lawfully. You must not use Airavoto to facilitate illegal activity, fraud, violence, exploitation, unauthorized access, harassment, unsafe conduct or any activity that could harm customers, staff, another café, Airavoto or its systems.\n\nYou are responsible for your staff, devices, internet connection, local network, account credentials and compliance with applicable laws, licenses, safety requirements, payment rules and data-protection obligations.`,
  },
  {
    title: '12. Required data synchronization',
    body: `Airavoto POS is designed to send operational information to the Airavoto Gaming platform so customers can see whether participating cafés and their PC, PS5, Xbox, VR or other gaming seats are currently available. Required synchronization may include the café's online or offline status, device and seat availability, occupancy status, opening hours, pricing and other information needed to provide live availability features.\n\nYou must not intentionally disable, falsify, manipulate, delay or interfere with required synchronization, heartbeat, availability or status data. You must reasonably cooperate with troubleshooting requests when required data stops arriving.\n\nThe Software must not be used to upload customer passwords, payment-card data, staff credentials or other sensitive personal information into fields intended only for café and equipment data. Airavoto may process operational data to provide synchronization, public listings, support, security, fraud prevention and service improvement in accordance with the Privacy Policy.`,
  },
  {
    title: '13. Offline cafés and missing data',
    body: `A temporary internet outage, power failure, hardware failure or other technical problem does not automatically constitute misconduct. When valid data stops arriving, Airavoto may mark the café as Offline or Data unavailable, hide its live availability from customer-facing pages and display the last successful synchronization time in the POS or administrator dashboard.\n\nWhere circumstances allow, Airavoto may notify the café and provide a reasonable correction period of 24, 48 or 72 hours, as appropriate to the issue. The café should restore connectivity, update the Software, verify its device and network configuration, or contact support with an explanation.\n\nIf the café restores synchronization or provides a satisfactory explanation, Airavoto may restore its public listing and live features. Airavoto may continue hiding stale availability when publishing it would risk misleading customers.`,
  },
  {
    title: '14. Suspension for violations, security risks or persistent non-cooperation',
    body: `Airavoto may temporarily suspend, restrict, disable or remove a café's POS access, public listing, live availability or related account features when Airavoto reasonably believes that the café has violated these Terms, engaged in illegal or harmful activity, supplied false or misleading information, manipulated live data, created a security risk, or persistently failed to provide required data and cooperate with recovery efforts.\n\nAiravoto may act immediately without prior notice when reasonably necessary to prevent illegal activity, protect people or systems, preserve evidence, prevent fraud, address an urgent security or safety risk, or comply with a lawful order or third-party requirement. In other cases, Airavoto will normally give notice and an opportunity to correct the issue.\n\nA missing heartbeat or temporary technical outage should normally result in an Offline or Data unavailable status first. It should not automatically be labelled illegal or treated as a permanent ban. The response may range from a warning or limited feature access to temporary suspension or termination depending on the seriousness, frequency and risk of the conduct.`,
  },
  {
    title: '15. Suspension notice, review and appeal',
    body: `Unless immediate action is justified, Airavoto will provide notice through the registered email address, POS notification, dashboard message or another reasonable communication method. The notice will normally identify the general reason, affected features, effective time, requested corrective action and available review process. Airavoto may withhold information that would compromise an investigation, reveal security-sensitive methods, violate another person's privacy or conflict with a legal requirement.\n\nThe café may request a review within 7 or 14 days, as stated in the notice, by contacting the published Airavoto support or compliance address. The request should include the café name, POS identifier, contact person, description of the issue, relevant screenshots or logs and corrective steps already taken.\n\nAiravoto will review credible requests in good faith and may ask for additional information, a Software update, device verification, proof of authorization or a test synchronization. If the issue is corrected and no continuing risk remains, Airavoto may restore the affected service. Restoration is not guaranteed for serious, repeated, unlawful or unverifiable violations.`,
  },
  {
    title: '16. Cooperation between the café and Airavoto',
    body: `The café agrees to maintain authorized access to its POS device, install required security or compatibility updates, respond to reasonable support requests and promptly report suspected account compromise or data errors.\n\nAiravoto agrees to provide reasonable technical guidance, identify the general reason for an avoidable suspension where permitted, protect account and operational data according to its Privacy Policy and review credible correction or appeal requests. Airavoto does not guarantee uninterrupted service, continuous internet connectivity or that every café will remain visible in the public directory at all times.`,
  },
  {
    title: '17. Changes to these terms',
    body: `We may update these Terms from time to time. Material changes will be noted in the Changelog. Continued use of the Software after an update constitutes acceptance of the revised Terms.`,
  },
];

export default function Terms() {
  useDocumentMeta({ title: TITLE, description: DESCRIPTION, image: '/airavoto-logo.png' });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative overflow-hidden pb-12 pt-36 sm:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(60% 45% at 50% 0%, oklch(0.75 0.10 290/0.18), transparent 70%)' }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 text-center">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mx-auto mt-8 max-w-3xl text-balance text-5xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
            Terms of Use
          </h1>
          <p className="mx-auto mt-4 text-sm text-muted-foreground">Last updated: July 2026</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">TL;DR</p>
            <p className="mt-3 text-base leading-relaxed text-foreground/90">
              Airavoto POS is free to use, but cafés must provide accurate information, cooperate with required data synchronization and follow the law. Temporary technical outages normally make a café offline rather than automatically suspended. Airavoto may suspend access or hide a listing for serious violations, security risks, manipulated data or persistent non-cooperation, with notice and a review process where circumstances allow.
            </p>
          </div>

          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-lg font-semibold tracking-tight">{s.title}</h2>
                <div className="mt-3 space-y-3">
                  {s.body.split('\n\n').map((para, i) => (
                    <p key={i} className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4 border-t border-border/60 pt-8 text-sm">
            <Link href="/privacy" className="text-foreground/80 hover:text-foreground">
              Privacy Policy →
            </Link>
            <Link href="/faq" className="text-foreground/80 hover:text-foreground">
              FAQ →
            </Link>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
