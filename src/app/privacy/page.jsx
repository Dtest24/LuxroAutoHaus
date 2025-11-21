export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 p-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-[#00FF00] mb-6">
          Privacy Notice
        </h1>

        <p className="mb-4">
          Luxro Autohaus is committed to protecting your privacy and personal information.
          This notice explains what data we collect and how we use it.
        </p>

        <h2 className="text-2xl font-bold text-[#00FF00] mt-8 mb-2">
          Information We Collect
        </h2>
        <p className="mb-4">
          We may collect personal information such as contact details, messages,
          purchasing interests, and browsing behavior when interacting with our website.
        </p>

        <h2 className="text-2xl font-bold text-[#00FF00] mt-8 mb-2">
          How Your Data Is Used
        </h2>
        <p className="mb-4">
          Your information is used to improve customer service, manage inquiries,
          provide support, and improve the user experience. We do not sell or
          trade personal data to third parties.
        </p>

        <h2 className="text-2xl font-bold text-[#00FF00] mt-8 mb-2">
          Data Protection
        </h2>
        <p className="mb-4">
          We implement strict protection protocols to ensure your data is secure
          and protected from misuse, unauthorized access, or alteration.
        </p>

        <h2 className="text-2xl font-bold text-[#00FF00] mt-8 mb-2">
          Policy Updates
        </h2>
        <p className="mb-10">
          This Privacy Notice may be updated occasionally. Continued use of our
          services indicates acceptance of the latest version.
        </p>

        <a
          href="/"
          className="inline-block mt-6 bg-[#00FF00] text-black font-bold py-3 px-6 rounded-full hover:bg-[#00dd00] transition-all"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
