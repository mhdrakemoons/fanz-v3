export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-sky-400 to-blue-600 py-20 md:py-32">
      <div className="absolute inset-0 bg-[url('/fanz-home10.png')] opacity-10 bg-cover bg-center bg-no-repeat mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      <div className="w-full max-w-[87.5rem] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">Your Social Media Resource</span>
          <h1 className="scroll-m-20 text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-white drop-shadow-sm md:whitespace-nowrap">
            Strategies that help you <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200">grow</span>
        </h1>
          <p className="text-lg md:text-xl leading-relaxed mb-8 text-white/90">We're here to share what works. Thoughtful articles, honest reviews, and proven strategies, all created to support your journey as a creator or brand.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-sky-700 shadow-md transition-all hover:bg-sky-50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" href="#categories">
              Find the Best Comparisons
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
            <a className="inline-flex h-12 items-center justify-center rounded-md border border-white/40 backdrop-blur-sm px-8 text-sm font-medium text-white shadow transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" href="/reviews">Read Our Reviews</a>
          </div>
        </div>
      </div>
    </section>
  );
}


