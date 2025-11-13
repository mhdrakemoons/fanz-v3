import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Fanzsocial",
  description: "Read the terms and conditions for using Fanzsocial.",
};

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 md:px-8 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: October 30, 2025</p>

      <section className="mt-8 space-y-4 text-gray-700 leading-relaxed">
        <p>
          These Terms of Service ("Terms") govern your access to and use of the Fanzsocial website
          and services (the "Services"). By accessing or using the Services, you agree to be bound
          by these Terms.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Use of Services</h2>
        <p>
          You agree to use the Services only for lawful purposes and in accordance with these Terms.
          You are responsible for all activity that occurs under your account.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Accounts</h2>
        <p>
          You may be required to create an account to access certain features. You must provide
          accurate information and keep your account credentials secure. You are responsible for
          all activities that occur under your account.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Intellectual Property</h2>
        <p>
          The Services and all content, features, and functionality are owned by Fanzsocial and are
          protected by intellectual property laws. You may not copy, modify, distribute, or create
          derivative works without prior written consent.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Prohibited Conduct</h2>
        <p>
          You agree not to misuse the Services, including engaging in unlawful, harassing, or
          fraudulent activities, attempting to gain unauthorized access, or interfering with the
          proper operation of the Services.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Disclaimers</h2>
        <p>
          The Services are provided on an "as is" and "as available" basis without warranties of any
          kind. Fanzsocial disclaims all warranties to the fullest extent permitted by law.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Fanzsocial shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Termination</h2>
        <p>
          We may suspend or terminate access to the Services immediately, without prior notice, for any
          reason, including if you breach these Terms.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Changes to the Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the Services after changes
          take effect constitutes acceptance of the revised Terms.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws applicable in your
          jurisdiction, without regard to its conflict of law principles.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Contact</h2>
        <p>
          For questions regarding these Terms, please contact us at
          <span className="whitespace-nowrap"> support@fanzsocial.com</span>.
        </p>
      </section>
    </main>
  );
}


