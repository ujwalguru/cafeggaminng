import { Link } from 'wouter';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { Eyebrow, Section } from '@/components/site/primitives';
import { useDocumentMeta } from '@/hooks/use-document-meta';

const TITLE = 'Privacy Policy — Airavoto Gaming POS';
const DESCRIPTION = 'Privacy policy for Airavoto Gaming POS.';

const sections = [
  {
    title: '1. Overview',
    body: `Airavoto Gaming POS is a self-hosted, locally installed software application. By design, no data you enter into the application — customer names, phone numbers, booking records, financial transactions or staff accounts — is ever transmitted to Airavoto or any third party.\n\nAll data is stored exclusively in the PostgreSQL database that you install and operate on your own hardware or server. You have complete ownership and control over your data at all times.`,
  },
  {
    title: '2. Data we do not collect',
    body: `Because the software runs entirely on your local network, Airavoto does not collect, access, store or process any of the following:\n\n• Customer names, phone numbers or WhatsApp contacts\n• Booking and session records\n• Financial data — revenue, expenses or reports\n• Staff account credentials\n• Food and inventory records\n• Activity logs or audit trails\n• Any other operational data entered through the application`,
  },
  {
    title: '3. The website (this site)',
    body: `This marketing website (airavoto.com) may use standard web analytics to understand aggregate visitor traffic — such as page views and referral sources. This data is anonymous and not linked to any individual. We do not use third-party advertising trackers.\n\nIf you subscribe to release update emails via the footer form, we store only your email address for the purpose of sending release notifications. You can unsubscribe at any time.`,
  },
  {
    title: '4. Your data responsibilities',
    body: `As the operator of a self-hosted installation, you are responsible for:\n\n• Securing access to the machine or server running the application\n• Backing up your PostgreSQL database regularly\n• Complying with applicable data protection laws (such as India's DPDP Act) with respect to your customers' personal data stored in the system\n• Restricting staff access using the built-in role-based access control\n\nAiravoto provides the software tools (RBAC, activity logging, bcrypt hashing) to help you meet these obligations, but the operational responsibility rests with you as the data controller.`,
  },
  {
    title: '5. Third-party services',
    body: `The current release of Airavoto Gaming POS does not integrate with any third-party cloud services by default. Optional integrations that may be added in future releases (such as WhatsApp Business API or payment gateways) will have their own privacy disclosures, which will be clearly documented at the time of integration.`,
  },
  {
    title: '6. Security',
    body: `The software includes the following security features to help protect data on your installation:\n\n• Bcrypt password hashing for all staff accounts\n• Role-based access control (Owner, Manager, Staff)\n• Secure session management\n• Full activity log for every staff action\n\nWe recommend you additionally: keep your Node.js and PostgreSQL installations up to date, restrict network access to the server to your local LAN, and perform regular database backups.`,
  },
  {
    title: '7. Changes to this policy',
    body: `We may update this privacy policy from time to time. Material changes will be noted in the Changelog. Continued use of the software after an update constitutes acceptance of the revised policy.`,
  },
  {
    title: '8. Contact',
    body: `If you have questions about this privacy policy, please open an issue on the GitHub repository or contact us via the support email listed in the project README.`,
  },
];

export default function Privacy() {
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
            Privacy Policy
          </h1>
          <p className="mx-auto mt-4 text-sm text-muted-foreground">Last updated: July 2026</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">TL;DR</p>
            <p className="mt-3 text-base leading-relaxed text-foreground/90">
              Airavoto Gaming POS is self-hosted software. Your data never leaves your machine — we
              cannot access it, we do not store it and we do not sell it. You are in full control.
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
            <Link href="/terms" className="text-foreground/80 hover:text-foreground">
              Terms of Use →
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
