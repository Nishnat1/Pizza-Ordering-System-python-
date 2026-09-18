import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Pizza",
  description:
    "Read the Terms and Conditions governing your use of Pizza's food ordering platform and services.",
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: [
      {
        heading: "Agreement to Terms",
        body: 'By accessing or using the Pizza platform (website, mobile app, or any related service), you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services. Your continued use of the platform constitutes your acceptance of any updates to these terms.',
      },
      {
        heading: "Eligibility",
        body: "You must be at least 13 years of age to use our platform. By using Pizza, you represent and warrant that you meet this age requirement and have the legal capacity to enter into a binding agreement.",
      },
    ],
  },
  {
    id: "account",
    title: "2. Account Registration",
    content: [
      {
        heading: "Account Creation",
        body: "To place orders, you may need to create an account. You are responsible for providing accurate, current, and complete information during registration and for keeping your account information updated.",
      },
      {
        heading: "Account Security",
        body: "You are solely responsible for maintaining the confidentiality of your password and account credentials. You agree to notify us immediately of any unauthorised access to your account. Pizza is not liable for any loss or damage arising from your failure to maintain account security.",
      },
      {
        heading: "One Account Per Person",
        body: "Each person may only maintain one active account. Creating multiple accounts to abuse promotional offers is prohibited and may result in account suspension.",
      },
    ],
  },
  {
    id: "ordering",
    title: "3. Ordering & Payment",
    content: [
      {
        heading: "Order Placement",
        body: "When you place an order through our platform, you are making an offer to purchase the selected items. Your order is confirmed only when you receive a confirmation notification from us.",
      },
      {
        heading: "Pricing",
        body: "All prices displayed on our platform are in Indian Rupees (INR) and include applicable taxes unless stated otherwise. Prices are subject to change without prior notice. The price charged at checkout is final.",
      },
      {
        heading: "Payment Methods",
        body: "We accept UPI, credit/debit cards, net banking, and cash on delivery. By providing payment information, you represent that you are authorised to use the payment method and authorise us to charge the applicable amount.",
      },
      {
        heading: "Order Cancellation",
        body: "Orders may be cancelled within 5 minutes of placement if they have not yet been confirmed by our kitchen. Once preparation begins, cancellations are not guaranteed. Refunds for cancelled orders will be processed within 5–7 business days.",
      },
    ],
  },
  {
    id: "delivery",
    title: "4. Delivery",
    content: [
      {
        heading: "Delivery Area",
        body: "We deliver to select areas as indicated on our platform. Delivery availability is subject to your location. We reserve the right to modify delivery areas at any time.",
      },
      {
        heading: "Delivery Times",
        body: "Estimated delivery times provided are approximate and not guaranteed. Actual delivery times may vary due to factors such as order volume, traffic, weather conditions, and other circumstances beyond our control.",
      },
      {
        heading: "Failed Delivery",
        body: "If a delivery fails due to the customer being unavailable or providing incorrect address details, re-delivery charges may apply. In such cases, refunds will not be provided for perishable items.",
      },
    ],
  },
  {
    id: "refunds",
    title: "5. Refunds & Returns",
    content: [
      {
        heading: "Quality Issues",
        body: "If you receive an order that is incorrect or of unacceptable quality, please contact our support team within 1 hour of delivery with photographic evidence. We will assess each case and offer an appropriate remedy.",
      },
      {
        heading: "Refund Process",
        body: "Approved refunds are credited to the original payment method within 5–7 business days, or as store credit within 24 hours. We reserve the right to decide the appropriate refund method on a case-by-case basis.",
      },
      {
        heading: "Non-Refundable Items",
        body: "Promotional discounts, delivery fees (unless the delay was due to our error), and items that have been consumed cannot be refunded.",
      },
    ],
  },
  {
    id: "conduct",
    title: "6. User Conduct",
    content: [
      {
        heading: "Prohibited Activities",
        body: "You agree not to: use the platform for any unlawful purpose; attempt to gain unauthorised access to our systems; submit fraudulent orders or payment information; abuse promotional codes or loyalty rewards; harass our staff or delivery partners; or scrape, crawl, or extract data from our platform without permission.",
      },
      {
        heading: "Content Standards",
        body: "Any content you submit (including reviews and feedback) must be truthful, respectful, and free from offensive, defamatory, or unlawful material. We reserve the right to remove content that violates these standards.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "7. Intellectual Property",
    content: [
      {
        heading: "Ownership",
        body: "All content on the Pizza platform, including logos, images, text, software, and design, is owned by or licensed to Pizza and is protected by applicable intellectual property laws.",
      },
      {
        heading: "Limited Licence",
        body: "We grant you a limited, non-exclusive, non-transferable licence to access and use our platform for personal, non-commercial purposes. You may not reproduce, distribute, modify, or create derivative works without our express written consent.",
      },
    ],
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    content: [
      {
        heading: "Disclaimer",
        body: 'Our platform and services are provided on an "as is" and "as available" basis without any warranties, express or implied. We do not guarantee that the platform will be error-free, uninterrupted, or free from viruses.',
      },
      {
        heading: "Limitation",
        body: "To the maximum extent permitted by law, Pizza shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability to you shall not exceed the amount paid for the specific order giving rise to the claim.",
      },
    ],
  },
  {
    id: "termination",
    title: "9. Account Termination",
    content: [
      {
        heading: "Termination by Us",
        body: "We reserve the right to suspend or terminate your account at any time, without notice, if we believe you have violated these Terms & Conditions, engaged in fraudulent activity, or for any other reason at our sole discretion.",
      },
      {
        heading: "Termination by You",
        body: "You may delete your account at any time by contacting support@pizza.com. Upon deletion, your data will be handled in accordance with our Privacy Policy.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "10. Governing Law & Disputes",
    content: [
      {
        heading: "Governing Law",
        body: "These Terms & Conditions are governed by the laws of India. Any disputes arising from these terms or your use of our platform shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.",
      },
      {
        heading: "Dispute Resolution",
        body: "We encourage you to contact us first to resolve any disputes informally. If informal resolution is not possible, disputes shall be settled through binding arbitration in accordance with Indian arbitration law.",
      },
    ],
  },
  {
    id: "changes",
    title: "11. Changes to Terms",
    content: [
      {
        heading: "Updates",
        body: "We may update these Terms & Conditions at any time. Significant changes will be communicated via email or a prominent notice on the platform. Your continued use after changes are posted constitutes acceptance of the revised terms.",
      },
    ],
  },
  {
    id: "contact",
    title: "12. Contact Us",
    content: [
      {
        heading: "Legal Enquiries",
        body: "For any questions about these Terms & Conditions, please contact us at: legal@pizza.com or Pizza Legal Team, 123 Baker Street, Mumbai, Maharashtra 400001, India. Phone: +91 98765 43210 | Hours: Monday–Friday, 9 AM – 6 PM IST",
      },
    ],
  },
];

export default function TermsPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-4">
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Legal Document
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Terms &amp; Conditions</h1>
          <p className="text-gray-500">
            Last updated: <strong>June 7, 2026</strong> · Effective: <strong>June 7, 2026</strong>
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
            Please read these Terms &amp; Conditions carefully before using the Pizza platform.
            These terms govern your access to and use of our website, mobile applications, and
            food ordering services. By using our services, you agree to be bound by these terms.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Table of Contents</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
        <div className="space-y-8">
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
        <div className="mt-10 rounded-2xl bg-amber-50 border border-amber-100 p-6 text-center">
          <p className="text-sm text-amber-800">
            Questions about these terms?{" "}
            <a href="mailto:legal@pizza.com" className="font-semibold underline hover:no-underline">
              legal@pizza.com
            </a>
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-amber-700">
            <Link href="/privacy" className="hover:underline font-medium">Privacy Policy</Link>
            <Link href="/consumer" className="hover:underline font-medium">Back to Home</Link>
            <Link href="/consumer/order" className="hover:underline font-medium">Order Now</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
