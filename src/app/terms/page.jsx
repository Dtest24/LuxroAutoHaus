export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 p-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-[#00FF00] mb-6">
          Terms & Conditions
        </h1>

        <p className="mb-4">
          Welcome to Luxro Autohaus. By accessing or using our website or services,
          you agree to the following terms. Please read them carefully.
        </p>

        <h2 className="text-2xl font-bold text-[#00FF00] mt-8 mb-2">
          Vehicle Information
        </h2>
        <p className="mb-4">
          All vehicle specifications provided are based on available information 
          from manufacturers and sources at the time of listing. Some details may 
          change due to upgrades or market variations.
        </p>

        <h2 className="text-2xl font-bold text-[#00FF00] mt-8 mb-2">
          Pricing & Payments
        </h2>
        <p className="mb-4">
          All advertised prices are subject to change without notice. Deposits 
          may be non-refundable depending on circumstances.
        </p>

        <h2 className="text-2xl font-bold text-[#00FF00] mt-8 mb-2">
          Liability
        </h2>
        <p className="mb-4">
          Luxro Autohaus is not responsible for damages, loss, or accidents caused 
          by improper use of vehicles, delayed service, third-party issues, or natural 
          causes.
        </p>

        <h2 className="text-2xl font-bold text-[#00FF00] mt-8 mb-2">
          Amendments
        </h2>
        <p className="mb-10">
          These Terms & Conditions may be updated at any time. Continued use of 
          our website means acceptance of revised terms.
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
