import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — MOH Pulse',
  description: 'Terms governing your use of the MOH Pulse platform.',
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

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-[#4a5568] text-sm">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <div
          className="rounded-2xl border border-white/[0.06] p-8 mb-8"
          style={{ backgroundColor: '#0a0f1e' }}
        >
          <p className="text-[#8892a4] text-sm leading-relaxed">
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of the MOH Pulse
            platform operated by The MOH Media (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
            By creating an account or using MOH Pulse, you agree to be bound by these Terms.
            If you do not agree, do not use the service.
          </p>
        </div>

        <Section title="1. Service Description">
          <p>
            MOH Pulse is a marketing analytics and reporting platform that connects to your
            advertising accounts (Meta Ads, Google Ads) to aggregate performance data, display
            dashboards, and generate AI-powered weekly briefs.
          </p>
          <p>
            We reserve the right to modify, suspend, or discontinue any part of the service at any
            time with reasonable notice. We will not be liable to you or any third party for any
            modification or discontinuation of the service.
          </p>
        </Section>

        <Section title="2. Eligibility & Account Registration">
          <p>
            You must be at least 18 years of age and have the legal capacity to enter into a binding
            agreement to use MOH Pulse. By registering, you represent that you meet these requirements.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and
            for all activity that occurs under your account. You must notify us immediately of any
            unauthorized use at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
              {CONTACT_EMAIL}
            </a>.
          </p>
          <p>
            You may not share your account with others or create multiple accounts to circumvent any
            restrictions or limitations of the service.
          </p>
        </Section>

        <Section title="3. User Obligations">
          <p>By using MOH Pulse, you agree to:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-1">
            <li>Provide accurate and complete information when registering and connecting ad accounts</li>
            <li>Use the platform only for lawful purposes and in accordance with these Terms</li>
            <li>Ensure you have the necessary rights and permissions to connect any ad account to MOH Pulse</li>
            <li>Not attempt to reverse-engineer, scrape, or circumvent any security measures</li>
            <li>Not use automated means to access the service beyond normal usage patterns</li>
            <li>Not upload or transmit malicious code, spam, or any harmful content</li>
            <li>Comply with the terms and policies of any third-party platforms you connect (Meta, Google)</li>
          </ul>
          <p>
            Violation of these obligations may result in immediate suspension or termination of your account.
          </p>
        </Section>

        <Section title="4. Connected Ad Accounts">
          <p>
            When you connect a third-party ad account, you grant MOH Pulse permission to access and
            retrieve data from that account via its official API. You represent that you are authorized
            to grant this access.
          </p>
          <p>
            MOH Pulse acts as a data processor on your behalf. We do not modify, pause, or manage
            your campaigns. We are not responsible for any changes to your ad accounts made outside
            of our platform.
          </p>
          <p>
            You may disconnect any ad account at any time from the Connect page or directly through
            the respective platform&apos;s settings. Disconnecting an account will stop future data
            syncs but will not automatically delete historical data already stored.
          </p>
        </Section>

        <Section title="5. Payment Terms">
          <p>
            MOH Pulse may offer subscription plans with recurring billing. Where paid plans are
            offered, the following terms apply:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-1">
            <li>
              <span className="text-white font-medium">Billing cycle:</span> Subscriptions are billed
              monthly or annually in advance, depending on the plan selected.
            </li>
            <li>
              <span className="text-white font-medium">Automatic renewal:</span> Subscriptions
              automatically renew at the end of each billing period unless cancelled before the
              renewal date.
            </li>
            <li>
              <span className="text-white font-medium">Cancellation:</span> You may cancel your
              subscription at any time. Cancellation takes effect at the end of the current billing
              period. No partial refunds are issued for unused time.
            </li>
            <li>
              <span className="text-white font-medium">Price changes:</span> We will notify you at
              least 14 days in advance of any price changes. Continued use after the effective date
              constitutes acceptance of the new pricing.
            </li>
            <li>
              <span className="text-white font-medium">Refunds:</span> Subscription fees are
              non-refundable except where required by applicable law.
            </li>
          </ul>
          <p>
            For billing questions, contact us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
              {CONTACT_EMAIL}
            </a>.
          </p>
        </Section>

        <Section title="6. Intellectual Property">
          <p>
            All content, features, and functionality of MOH Pulse — including the software, design,
            text, graphics, and logos — are owned by The MOH Media and protected by applicable
            intellectual property laws.
          </p>
          <p>
            You retain ownership of all data you provide to MOH Pulse, including your ad account
            data. You grant us a limited, non-exclusive license to use this data solely to provide
            the service to you.
          </p>
          <p>
            You may not copy, modify, distribute, or create derivative works of any part of MOH
            Pulse without our explicit written consent.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>
            MOH Pulse is provided on an &quot;as is&quot; and &quot;as available&quot; basis without
            warranties of any kind, either express or implied, including but not limited to
            warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>
          <p>
            We do not warrant that the service will be uninterrupted, error-free, or completely
            secure. Ad data displayed in MOH Pulse is sourced from third-party APIs; we are not
            responsible for inaccuracies in data provided by Meta, Google, or other platforms.
          </p>
          <p>
            To the fullest extent permitted by law, The MOH Media shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, including but not
            limited to loss of profits, data, or goodwill, arising from your use of or inability
            to use the service — even if we have been advised of the possibility of such damages.
          </p>
          <p>
            Our total liability to you for any claims arising from these Terms or your use of MOH
            Pulse shall not exceed the greater of (a) the amount you paid us in the 12 months
            preceding the claim, or (b) USD $50.
          </p>
        </Section>

        <Section title="8. Indemnification">
          <p>
            You agree to indemnify, defend, and hold harmless The MOH Media and its officers,
            directors, employees, and agents from any claims, liabilities, damages, losses, and
            expenses (including reasonable legal fees) arising from your use of the service, your
            violation of these Terms, or your violation of any third-party rights.
          </p>
        </Section>

        <Section title="9. Termination">
          <p>
            We may suspend or terminate your account at any time if you breach these Terms, engage
            in fraudulent activity, or if we are required to do so by law. We will make reasonable
            efforts to notify you in advance unless the breach is severe.
          </p>
          <p>
            You may terminate your account at any time by contacting us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
              {CONTACT_EMAIL}
            </a>. Upon termination, your right to use the service ceases immediately.
          </p>
        </Section>

        <Section title="10. Governing Law">
          <p>
            These Terms are governed by and construed in accordance with the laws of India, without
            regard to its conflict of law principles. Any disputes arising under these Terms shall
            be subject to the exclusive jurisdiction of the courts located in India.
          </p>
        </Section>

        <Section title="11. Changes to These Terms">
          <p>
            We may update these Terms from time to time. When we do, we will update the effective
            date and notify you by email if the changes are material. Your continued use of MOH Pulse
            after changes are posted constitutes acceptance of the updated Terms.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <p>
            If you have any questions about these Terms, please contact us at:
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
            <Link href="/privacy" className="text-[#4a5568] text-xs hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-indigo-400 text-xs hover:text-indigo-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
