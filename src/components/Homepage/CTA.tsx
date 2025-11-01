import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-sky-400 to-blue-600 py-16 md:py-20 rounded-2xl border border-gray-200 shadow-lg">
      <div className="absolute inset-0 bg-[url('/fanz-hero4.png')] opacity-10 bg-cover bg-center bg-no-repeat mix-blend-overlay"></div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

      <div className="w-full max-w-[87.5rem] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white drop-shadow-sm">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200">grow your presence</span>?
          </h2>

          <p className="text-lg md:text-xl leading-relaxed mb-8 text-white/90">
            We're here to share what works. Thoughtful articles, honest reviews, and proven strategies, all created to support your journey as a creator or brand.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/reviews" 
              className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-sky-700 shadow-md transition-all hover:bg-sky-50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Explore Reviews
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>

            <Link 
              href="/comparisons" 
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/40 backdrop-blur-sm px-8 text-sm font-medium text-white shadow transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Discover Comparisons
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

