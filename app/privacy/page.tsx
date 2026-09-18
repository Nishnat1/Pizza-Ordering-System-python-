import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Pizza",
  description:
    "Learn how Pizza collects, uses, and protects your personal information when you use our ordering platform.",
};

const sections = [
  {
    id: "information-collected",
    title: "1. Information We Collect",
    content: [
      {
        heading: "Personal Information",
        body: "When you create an account or place an order, we collect your name, email address, phone number, and delivery address. This information is necessary to fulfil your orders and communicate with you about your account.",
      },
      {
        heading: "Order & Payment Data",
        body: "We collect details about your orders, including items ordered, order amounts, payment method type (we do not store full card numbers), and delivery preferences. This helps us personalise your experience and process transactions securely.",
      },
      {
        heading: "Usage Information",
        body: "We automatically collect information about how you interact with our platform, such as pages visited, features used, device type, IP address, browser type, and referral URLs. This helps us improve our service.",
      },
      {
        heading: "Cookies & Tracking Technologies",
        body: "We use cookies and similar technologies to maintain your session, remember your preferences, and analyse traffic patterns. You can control cookie settings through your browser, but disabling certain cookies may affect functionality.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: [
      {
        heading: "Order Fulfilment",
        body: "Your information is primarily used to process and deliver your orders, send order confirmations and delivery updates, and handle customer support queries.",
      },
      {
        heading: "Account Management",
        body: "We use your data to manage your account, verify your identity, and maintain security of the platform.",
      },
      {
        heading: "Marketing & Promotions",
        body: "With your consent, we may send you promotional emails about offers, new menu items, and special deals. You can opt out at any time via the unsubscribe link in any email or through your account settings.",
      },
      {
        heading: "Service Improvement",
        body: "Aggregated, anonymised data may be used to analyse trends, troubleshoot issues, and improve the overall user experience of our platform.",
      },
    ],
  },
  {
    id: "data-sharing",
    title: "3. Data Sharing & Disclosure",
    content: [
      {
        heading: "Delivery Partners",
        body: "We share necessary information (name, phone number, and delivery address) with our delivery partners to ensure your order reaches you.",
      },
      {
        heading: "Payment Processors",
        body: "Payment information is handled by secure, PCI-DSS-compliant third-party payment processors. We do not store full card details on our servers.",
      },
      {
        heading: "Legal Requirements",
        body: "We may disclose your information if required by law, court order, or governmental authority, or to protect the rights, property, or safety of Pizza, our customers, or the public.",
      },
      {
        heading: "No Sale of Data",
        body: "We do not sell, rent, or trade your personal information to third parties for their marketing purposes.",
      },
    ],
  },
  {
    id: "data-security",
    title: "4. Data Security",
    content: [
      {
        heading: "Security Measures",
        body: "We implement industry-standard security measures including SSL/TLS encryption, secure data storage, access controls, and regular security audits to protect your personal information from unauthorised access.",
      },
      {
        heading: "Breach Notification",
        body: "In the event of a data breach that affects your personal information, we will notify you as required by applicable law and take immediate steps to mitigate any harm.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "5. Your Rights",
    content: [
      {
        heading: "Access & Correction",
        body: "You have the right to access the personal information we hold about you and to request corrections if any information is inaccurate or incomplete.",
      },
      {
        heading: "Deletion",
        body: "You may request deletion of your account and associated personal data at any time by contacting us at privacy@pizza.com. Some data may be retained as required by law.",
      },
      {
        heading: "Data Portability",
        body: "You may request a copy of your personal data in a structured, commonly used format.",
      },
      {
        heading: "Opt-Out",
        body: "You can opt out of marketing communications at any time. You cannot opt out of transactional emails related to your orders.",
      },
    ],
  },
  {
    id: "retention",
    title: "6. Data Retention",
    content: [
      {
        heading: "Retention Period",
        body: "We retain your personal information for as long as your account is active, or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our agreements. Order data is typically retained for 7 years for tax and legal compliance.",
      },
    ],
  },
  {
    id: "children",
    title: "7. Children's Privacy",
    content: [
      {
        heading: "Age Restriction",
        body: "Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.",
      },
    ],
  },
  {
    id: "changes",
    title: "8. Changes to This Policy",
    content: [
      {
        heading: "Policy Updates",
        body: "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our platform or sending an email. Your continued use of our services after changes constitutes acceptance of the updated policy.",
      },
    ],
  },
  {
    id: "contact",
    title: "9. Contact Us",
    content: [
      {
        heading: "Privacy Queries",
        body: "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Privacy Team at privacy@pizza.com or write to us at: Pizza Privacy Team, 123 Baker Street, Mumbai, Maharashtra 400001, India.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg width="36" height="36" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000">
              <path d="M519.232137 503.49783l267.977124-443.100669s195.514642 98.992076 221.338662 334.724454C594.799146 485.36457 519.232137 503.49783 519.232137 503.49783z" fill="#EBA824" />
              <path d="M426.872459 568.340109l209.202784-354.198305c-61.314408-36.26652-132.789086-57.151519-209.202784-57.151519-227.194929 0-411.349824 184.154896-411.349824 411.349824s184.154896 411.349824 411.349824 411.349824 411.349824-184.154896 411.349824-411.349824c0-31.609729-3.668986-62.302212-10.442499-91.865776L426.872459 568.340109z" fill="#EBA824" />
            </svg>
            <span className="text-xl font-bold">Pizza</span>
          </Link>
          <Link href="/consumer" className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold mb-4">
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Legal Document
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-gray-500">
            Last updated: <strong>June 7, 2026</strong> · Effective: <strong>June 7, 2026</strong>
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
            At Pizza, we are committed to protecting your privacy and handling your personal information
            with care. This Privacy Policy explains what data we collect, why we collect it, how we use
            it, and your rights regarding your personal information.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Table of Contents</h2>
          <ol className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-green-900 hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 scroll-mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                {section.title}
              </h2>
              <div className="space-y-5">
                {section.content.map((item) => (
                  <div key={item.heading}>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1.5">{item.heading}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-10 rounded-2xl bg-green-50 border border-green-100 p-6 text-center">
          <p className="text-sm text-green-800">
            Have a privacy concern?{" "}
            <a href="mailto:privacy@pizza.com" className="font-semibold underline hover:no-underline">
              privacy@pizza.com
            </a>
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-green-700">
            <Link href="/terms" className="hover:underline font-medium">Terms &amp; Conditions</Link>
            <Link href="/consumer" className="hover:underline font-medium">Back to Home</Link>
            <Link href="/consumer/order" className="hover:underline font-medium">Order Now</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
