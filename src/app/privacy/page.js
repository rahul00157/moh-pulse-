import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — MOH Pulse',
  description: 'How MOH Pulse collects, uses, and protects your data.',
};

const CONTACT_EMAIL = 'rahul@themohmedia.com';
const EFFECTIVE_DATE = 'May 27, 2026';

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold text-white mb-3">{title}</h2>
      <div className="space-y-3 text-[#8892a4] text-sm leading-relaxed">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#060b18' }}>
      {/* Top bar */}
      <header className="border-b border-white/[0.06]" style={{ backgroundColor: '#060b18' }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
            <span className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-xs font-black">M</span>
            MOH Pulse
          </Link>
          <Link href="/login" className="text-[#8892a4] hover:text-white text-sm transition-colors">
            Sign in
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-[#4a5568] text-sm">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <div
          className="rounded-2xl border border-white/[0.06] p-8 mb-8"
          style={{ backgroundColor: '#0a0f1e' }}
        >
          <p className="text-[#8892a4] text-sm leading-relaxed">
            MOH Pulse (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you use our marketing analytics platform. Please read it carefully. If you disagree
            with its terms, please discontinue use of the service.
          </p>
        </div>

        <Section title="1. Information We Collect">
          <p>
            <span className="text-white font-medium">Account information:</span> When you register,
            we collect your name, email address, and password (stored as a secure hash via Supabase Auth).
          </p>
          <p>
            <span className="text-white font-medium">Ad platform data:</span> When you connect an ad
            account (Meta Ads, Google Ads), we access campaign metrics such as spend, impressions,
            clicks, reach, and conversion data via the respective platform APIs. We store only the
            data needed to display your dashboard and generate reports.
          </p>
          <p>
            <span className="text-white font-medium">Usage data:</span> We automatically collect
            information about how you interact with MOH Pulse, including pages visited, features used,
            and timestamps. This data is used solely to improve the service.
          </p>
          <p>
            <span className="text-white font-medium">Cookies:</span> We use essential session cookies
            to keep you logged in. We do not use third-party advertising or tracking cookies.
          </p>
        </Section>

        <Section title="2. How We Use Your Data">
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-1">
            <li>Provide, operate, and maintain the MOH Pulse platform</li>
            <li>Sync and display your advertising performance data</li>
            <li>Generate AI-powered weekly briefs and recommendations</li>
            <li>Send transactional emails (account verification, password resets)</li>
            <li>Detect and prevent fraud, abuse, or security incidents</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal information or ad account data to any third
            party for marketing purposes.
          </p>
        </Section>

        <Section title="3. Third-Party Services">
          <p>MOH Pulse integrates with the following third-party services to deliver its functionality:</p>

          <div className="space-y-4 mt-2">
            <div className="rounded-xl border border-white/[0.06] p-4" style={{ backgroundColor: '#060b18' }}>
              <p className="text-white font-medium mb-1">Meta (Facebook & Instagram Ads)</p>
              <p>
                When you connect your Meta Ads account, we use the Meta Marketing API to retrieve
                campaign performance data. Your Meta credentials (access tokens) are stored encrypted
                and used only to fetch your data. MOH Pulse operates under Meta&apos;s Platform Terms
                and Data Policy. You may revoke access at any time via
                your <a href="https://www.facebook.com/settings?tab=business_tools" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">Meta Business Settings</a>.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] p-4" style={{ backgroundColor: '#060b18' }}>
              <p className="text-white font-medium mb-1">Google Ads</p>
              <p>
                When you connect your Google Ads account, we use the Google Ads API under OAuth 2.0.
                Your Google credentials are stored encrypted and used solely to retrieve your ad
                performance metrics. You may revoke access at any time via
                your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">Google Account Permissions</a>.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] p-4" style={{ backgroundColor: '#060b18' }}>
              <p className="text-white font-medium mb-1">Supabase</p>
              <p>
                We use Supabase for authentication and database storage. Your data is stored in
                Supabase-managed infrastructure on AWS. Supabase is SOC 2 compliant.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] p-4" style={{ backgroundColor: '#060b18' }}>
              <p className="text-white font-medium mb-1">Anthropic (AI)</p>
              <p>
                We use Anthropic&apos;s Claude API to generate your weekly marketing briefs. Aggregated
                ad metrics may be sent to the API to produce insights. We do not send personally
                identifiable information to Anthropic.
              </p>
            </div>
          </div>
        </Section>

        <Section title="4. Data Retention">
          <p>
            We retain your account data for as long as your account is active. Ad performance data
            synced from connected platforms is retained for up to 24 months to support historical
            trend analysis. You may request deletion of your data at any time (see Section 5).
          </p>
        </Section>

        <Section title="5. Your Rights">
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-1">
            <li><span className="text-white font-medium">Access</span> — request a copy of the data we hold about you</li>
            <li><span className="text-white font-medium">Correction</span> — request that inaccurate data be corrected</li>
            <li><span className="text-white font-medium">Deletion</span> — request that your account and associated data be deleted</li>
            <li><span className="text-white font-medium">Portability</span> — request an export of your data in a machine-readable format</li>
            <li><span className="text-white font-medium">Objection</span> — object to certain processing of your personal data</li>
          </ul>
          <p>
            To exercise any of these rights, email us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
              {CONTACT_EMAIL}
            </a>. We will respond within 30 days.
          </p>
        </Section>

        <Section title="6. Data Security">
          <p>
            We implement industry-standard security measures including TLS encryption in transit,
            AES-256 encryption at rest for sensitive credentials, and role-based access controls.
            However, no method of transmission over the internet is 100% secure. We cannot guarantee
            absolute security.
          </p>
        </Section>

        <Section title="7. Children's Privacy">
          <p>
            MOH Pulse is not directed to individuals under the age of 18. We do not knowingly collect
            personal information from minors. If you believe a minor has provided us with personal
            data, please contact us immediately.
          </p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update the
            effective date at the top of this page and notify you by email if the changes are
            material. Your continued use of MOH Pulse after changes are posted constitutes your
            acceptance of the updated policy.
          </p>
        </Section>

        <Section title="9. Contact Us">
          <p>
            If you have any questions or concerns about this Privacy Policy or your data, please
            contact us at:
          </p>
          <div className="rounded-xl border border-white/[0.06] p-5 mt-3" style={{ backgroundColor: '#060b18' }}>
            <p className="text-white font-semibold mb-1">MOH Pulse / The MOH Media</p>
            <p>
              Email:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </Section>
      </main>

      <footer className="border-t border-white/[0.06] mt-8">
        <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#4a5568] text-xs">© 2026 MOH Pulse. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-indigo-400 text-xs hover:text-indigo-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[#4a5568] text-xs hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
