
import React from 'react';
import { ArrowLeft, FileText, Shield, RefreshCw, Building, Cookie, Globe, Scale } from 'lucide-react';
import Logo from './Logo';

type LegalPageType = 'terms' | 'privacy' | 'refund';

interface LegalPageProps {
  page: LegalPageType;
  onBack: () => void;
  onNavigate: (page: LegalPageType) => void;
}

const TABS: { id: LegalPageType; label: string; icon: React.ReactNode }[] = [
  { id: 'terms',   label: 'Terms of Service', icon: <FileText size={16} /> },
  { id: 'privacy', label: 'Privacy & GDPR',   icon: <Shield size={16} />   },
  { id: 'refund',  label: 'Refund Policy',    icon: <RefreshCw size={16} />},
];

/* ── Content sections ─────────────────────────────────────────────────────── */

const TermsContent: React.FC = () => (
  <div className="space-y-10 max-w-3xl mx-auto">
    <div className="border-b border-slate-100 pb-6">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-slate-500">Last updated: May 20, 2024 &nbsp;·&nbsp; Dat-assist Kft., Budapest, Hungary</p>
    </div>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2"><FileText size={18} className="text-blue-600"/> 1. Introduction</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Welcome to <strong>Fraud Radar</strong>. These Terms of Service ("Terms") govern your access to and use of
        the AI-powered anomaly detection application operated by <strong>Dat-assist Kft.</strong> ("we", "us", or
        "our"), registered in Budapest, Hungary under Hungarian company law. By accessing or using our Service, you
        confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2"><Shield size={18} className="text-blue-600"/> 2. Nature of Service &amp; Liability</h2>
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
        Fraud Radar uses artificial intelligence (Google Gemini models) to identify potential financial anomalies and
        suspicious patterns in your accounting data. You acknowledge and agree that:
      </p>
      <ul className="list-disc list-outside ml-5 text-sm space-y-2 text-slate-600">
        <li><strong>AI Limitations:</strong> Suggestions are probabilistic insights. We do not guarantee 100% accuracy.</li>
        <li><strong>User Responsibility:</strong> You are solely responsible for reviewing and acting on any alerts.</li>
        <li><strong>No Professional Advice:</strong> The Service does not constitute accounting, tax, or legal advice.</li>
        <li><strong>No Liability for Losses:</strong> Dat-assist Kft. shall not be liable for any financial loss arising from reliance on AI-generated insights.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2"><Scale size={18} className="text-blue-600"/> 3. Data Processing Agreement (DPA)</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        For users in the EU/EEA: you act as the <strong>Data Controller</strong> of the financial data you synchronise,
        and Dat-assist Kft. acts as the <strong>Data Processor</strong>. We process data solely to provide the
        anomaly detection service as per your configuration and do not sell or share data with third parties beyond
        the sub-processors listed in our Privacy Policy.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">4. Subscription &amp; Trial</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Fraud Radar offers a 7-day free trial limited to detection and insights. Full resolution features (bulk-clear,
        export, audit trail) require a paid subscription. All payments are processed by our Merchant of Record,
        <strong> Paddle.com</strong>, and are subject to their terms and our Refund Policy.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">5. Acceptable Use</h2>
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">You agree not to:</p>
      <ul className="list-disc list-outside ml-5 text-sm space-y-2 text-slate-600">
        <li>Use the Service to process data of third parties without their explicit consent.</li>
        <li>Attempt to reverse-engineer, decompile, or extract AI model weights.</li>
        <li>Use automated tools to scrape or overload our API endpoints.</li>
        <li>Share account credentials with users outside your licensed organisation.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">6. Termination</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Either party may terminate the subscription at any time. Upon termination, your access to the Service ceases
        at the end of the current billing period. We reserve the right to suspend accounts that violate these Terms
        without prior notice.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">7. Governing Law</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        These Terms are governed by the laws of <strong>Hungary</strong>. Any disputes shall be subject to the
        exclusive jurisdiction of the courts in Budapest, Hungary. EU consumer protection regulations remain
        unaffected.
      </p>
    </section>
  </div>
);

const PrivacyContent: React.FC = () => (
  <div className="space-y-10 max-w-3xl mx-auto">
    <div className="border-b border-slate-100 pb-6">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Privacy Policy &amp; GDPR</h1>
      <p className="text-sm text-slate-500">Effective Date: May 20, 2024 &nbsp;·&nbsp; Dat-assist Kft., Budapest, Hungary</p>
      <span className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
        <Globe size={12}/> GDPR Compliant
      </span>
    </div>

    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex items-start space-x-4">
      <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
        <Building className="text-blue-600" size={24}/>
      </div>
      <div className="text-sm text-slate-700 leading-relaxed">
        <strong>Data Controller:</strong> Dat-assist Kft.<br/>
        <strong>Registered Office:</strong> 1051 Budapest, Hungary.<br/>
        <strong>Data Protection Officer (DPO):</strong>{' '}
        <a href="mailto:dpo@fraudradar.com" className="text-blue-600 hover:underline">dpo@fraudradar.com</a>
      </div>
    </div>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">1. Legal Basis for Processing</h2>
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">Under GDPR Article 6, we process your data based on:</p>
      <ul className="list-disc list-outside ml-5 text-sm space-y-2 text-slate-600">
        <li><strong>Contractual Necessity (Art. 6.1.b):</strong> To provide the software service and anomaly detection.</li>
        <li><strong>Legitimate Interest (Art. 6.1.f):</strong> To improve fraud detection algorithms and overall security.</li>
        <li><strong>Legal Obligation (Art. 6.1.c):</strong> To comply with Hungarian tax and accounting laws regarding data retention.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">2. Data We Collect</h2>
      <ul className="list-disc list-outside ml-5 text-sm space-y-2 text-slate-600">
        <li><strong>Account data:</strong> Name, email address, company name.</li>
        <li><strong>Financial transaction metadata:</strong> Amounts, dates, vendor names, account codes — imported from QuickBooks/Xero with your explicit authorisation.</li>
        <li><strong>Usage data:</strong> Log entries, scan timestamps, feature interactions (no personal content).</li>
        <li><strong>Billing data:</strong> Handled entirely by Paddle.com; we never store raw card numbers.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">3. Sub-processors</h2>
      <p className="text-sm text-slate-600 mb-3">We share data only with strictly necessary providers:</p>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-slate-50 font-semibold text-slate-700">
            <tr>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Purpose</th>
              <th className="px-4 py-3">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            <tr><td className="px-4 py-3">Google Cloud (Vertex AI)</td><td className="px-4 py-3">AI Processing</td><td className="px-4 py-3">EU (Belgium)</td></tr>
            <tr><td className="px-4 py-3">Intuit / Xero</td><td className="px-4 py-3">Source Integration</td><td className="px-4 py-3">US / Global</td></tr>
            <tr><td className="px-4 py-3">Paddle.com</td><td className="px-4 py-3">Billing &amp; Payments</td><td className="px-4 py-3">UK</td></tr>
            <tr><td className="px-4 py-3">Render.com</td><td className="px-4 py-3">Cloud Hosting</td><td className="px-4 py-3">US (Oregon)</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">4. Your Rights (GDPR)</h2>
      <p className="text-sm text-slate-600 mb-3">Under GDPR, you have the right to:</p>
      <ul className="list-disc list-outside ml-5 text-sm space-y-2 text-slate-600">
        <li><strong>Access</strong> the personal data we hold about you.</li>
        <li><strong>Rectify</strong> inaccurate data.</li>
        <li><strong>Erase</strong> your data ("right to be forgotten").</li>
        <li><strong>Restrict</strong> or <strong>object</strong> to processing.</li>
        <li><strong>Data portability</strong> — receive your data in a machine-readable format.</li>
        <li><strong>Lodge a complaint</strong> with the Hungarian National Authority for Data Protection (NAIH).</li>
      </ul>
      <p className="text-sm text-slate-500 mt-3">To exercise any of these rights, contact: <a href="mailto:dpo@fraudradar.com" className="text-blue-600 hover:underline">dpo@fraudradar.com</a></p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">5. Data Retention</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        We retain account and transaction data for as long as your subscription is active, plus 30 days after cancellation
        to allow data export. Billing records are retained for 8 years as required by Hungarian accounting law.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2"><Cookie size={18} className="text-orange-500"/> 6. Cookie Policy</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Fraud Radar uses only <strong>essential cookies</strong> required for authentication session management and
        security (CSRF protection). We do not use third-party advertising or tracking cookies. No cookie consent
        banner is required as we rely solely on strictly necessary cookies.
      </p>
    </section>
  </div>
);

const RefundContent: React.FC = () => (
  <div className="space-y-10 max-w-3xl mx-auto">
    <div className="border-b border-slate-100 pb-6">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Refund Policy</h1>
      <p className="text-sm text-slate-500">Last updated: May 20, 2024 &nbsp;·&nbsp; Dat-assist Kft., Budapest, Hungary</p>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800 leading-relaxed">
      <strong>Summary:</strong> We offer a full refund within <strong>14 days</strong> of your first paid charge, no questions asked.
      Subsequent months are non-refundable but you may cancel anytime.
    </div>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">1. 14-Day Money-Back Guarantee</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        If you are not satisfied with Fraud Radar for any reason, you may request a full refund within <strong>14 calendar
        days</strong> of the date your first paid subscription charge was processed. This applies to all plans (Starter,
        Professional, Enterprise).
      </p>
      <ul className="list-disc list-outside ml-5 text-sm space-y-2 text-slate-600 mt-3">
        <li>No reason required — simply contact support within the 14-day window.</li>
        <li>Refunds are processed to the original payment method within <strong>5–10 business days</strong>.</li>
        <li>The refund covers the full subscription amount, excluding any applicable VAT already remitted to tax authorities.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">2. Subsequent Billing Periods</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        After the 14-day guarantee period, subscription fees are <strong>non-refundable</strong> for the current billing
        cycle. You may cancel at any time and you will retain access to the Service until the end of the paid period.
        No partial-month refunds are issued.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">3. Exceptions &amp; Special Cases</h2>
      <ul className="list-disc list-outside ml-5 text-sm space-y-2 text-slate-600">
        <li><strong>Service Outages:</strong> If a verified outage caused your Service to be unavailable for more than 72 consecutive hours in a billing period, you may be eligible for a pro-rated credit upon request.</li>
        <li><strong>Duplicate Charges:</strong> Any duplicate or erroneous charges will be refunded in full, regardless of the 14-day window.</li>
        <li><strong>Annual Plans:</strong> Annual subscriptions may be refunded pro-rated (for unused complete months) within 30 days of purchase.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">4. EU Consumer Rights</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        As a company registered in Hungary (EU), we comply with the EU Consumer Rights Directive. Consumers in the
        EU/EEA have the right to withdraw from digital service contracts within 14 days of purchase. By starting to
        use the Service immediately after purchase, you acknowledge that the right of withdrawal may be forfeited for
        the consumed portion of the service, but we still honour our full 14-day money-back guarantee as a commercial
        commitment.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">5. How to Request a Refund</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        To request a refund, email us at{' '}
        <a href="mailto:billing@fraudradar.com" className="text-blue-600 hover:underline">billing@fraudradar.com</a>{' '}
        with:
      </p>
      <ul className="list-disc list-outside ml-5 text-sm space-y-2 text-slate-600 mt-3">
        <li>Your registered email address.</li>
        <li>The Paddle order ID (found in your payment confirmation email).</li>
        <li>Reason for refund (optional, but helps us improve).</li>
      </ul>
      <p className="text-sm text-slate-600 mt-3 leading-relaxed">
        Refunds are processed by our Merchant of Record <strong>Paddle.com</strong>. Paddle may contact you directly
        to verify the request.
      </p>
    </section>
  </div>
);

/* ── Page shell ───────────────────────────────────────────────────────────── */

const LegalPage: React.FC<LegalPageProps> = ({ page, onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top nav */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={18}/> Back to Home
          </button>
          <Logo variant="light" />
        </div>
      </nav>

      {/* Tab bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors ${
                page === tab.id
                  ? 'border-blue-600 text-blue-600 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {page === 'terms'   && <TermsContent   />}
        {page === 'privacy' && <PrivacyContent />}
        {page === 'refund'  && <RefundContent  />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-slate-400 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-xs opacity-60">&copy; 2026 Dat-assist Kft. All rights reserved.</p>
          <div className="flex gap-6">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`hover:text-white transition-colors ${page === tab.id ? 'text-white font-semibold' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalPage;
