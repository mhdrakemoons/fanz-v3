import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Fanzsocial",
  description: "Learn how Fanzsocial collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 md:px-8 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: October 30, 2025</p>

      <section className="mt-8 space-y-4 text-gray-700 leading-relaxed">
        <p>
          This Privacy Policy explains how Fanzsocial ("we", "us", or "our") collects, uses, and shares
          information about you when you use our website and services (collectively, the "Services").
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Information We Collect</h2>
        <p>
          We may collect information you provide directly to us, such as your name, email address, and any
          content you submit. We also collect certain information automatically, including device information,
          log data, and cookies or similar technologies to improve the Services.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">How We Use Information</h2>
        <p>
          We use the information we collect to provide and improve the Services, personalize content, analyze
          usage, communicate with you, and comply with legal obligations.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Sharing of Information</h2>
        <p>
          We may share information with service providers who perform services on our behalf, comply with
          applicable laws, protect our rights, or in connection with a business transaction. We do not sell
          your personal information.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Cookies and Tracking</h2>
        <p>
          We use cookies and similar technologies to remember your preferences and understand how you interact
          with the Services. You can control cookies through your browser settings.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Your Choices</h2>
        <p>
          You may opt out of certain communications and request access to or deletion of your information,
          subject to applicable law. To make a request, contact us at the email below.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Data Security</h2>
        <p>
          We implement reasonable safeguards to protect your information. However, no method of transmission
          over the Internet or electronic storage is 100% secure.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Children’s Privacy</h2>
        <p>
          Our Services are not directed to children under 13. We do not knowingly collect personal information
          from children under 13.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will post the updated version on this page
          and update the "Last updated" date above.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at
          <span className="whitespace-nowrap"> support@fanzsocial.com</span>.
        </p>
      </section>
    </main>
  );
}


