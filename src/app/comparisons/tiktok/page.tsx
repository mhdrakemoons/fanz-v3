import SectionTwo from '@/components/SectionTwo'
import { getStrategiesByCategory, getStrategyMetasByCategory } from '@/lib/strategies'
import { FaTiktok } from "react-icons/fa6";

export const metadata = {
  title: "Top 10 Platforms for TikTok | Fanzsocial",
  description: "Compare the best platforms for TikTok marketing, growth, and engagement. Find the right tools for your needs.",
};

export default function TikTokPage() {
  const category = "TikTok";
  const metas = getStrategyMetasByCategory(category);

  const sectionCards = metas.map((m, idx) => ({
    id: idx + 1,
    badge: m.badge,
    badgeClass: m.badgeClass,
    image: m.image,
    subtitle: m.excerpt ?? '',
    title: m.title,
    toc: m.toc ?? m.title,
    slug: m.slug,
  }));

  const sectionArticles = metas.map((m, idx) => ({
    id: idx + 1,
    kicker: (m.kicker || (m.badge === 'Strategy' ? 'Comparison' : m.badge) || 'Comparison').toUpperCase(),
    title: m.title,
    description: [m.excerpt, (m.takeaways && m.takeaways[0]) || '']
      .filter(Boolean)
      .join(' '),
    takeaways: m.takeaways ?? [m.excerpt ?? ''],
    slug: m.slug,
    imageCaption: m.badge || 'Featured comparison',
  }));

  const estDate = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-[87.5rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-5">
        <main className="flex flex-col gap-12 md:gap-16">
          {/* Custom Hero Section for TikTok */}
          <section id="tiktok-hero" className="relative bg-white pb-6 md:pb-10">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[900px] md:w-[1100px] md:h-[1100px] opacity-25"
                style={{ backgroundImage: 'radial-gradient(#138aec 5%, transparent 60%)' }}
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center py-6 md:py-10">
              <div className="z-10 flex flex-col items-center gap-3">
                {/* Platform Icon */}
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white text-sky-400 shadow-lg ring-1 ring-black/5 mb-2">
                  <FaTiktok className="h-10 w-10" />
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-1">
                  <a href="/" className="hover:text-primary transition-colors">Home</a>
                  <span aria-hidden>›</span>
                  <a href="/comparisons" className="hover:text-primary transition-colors">Comparisons</a>
                  <span aria-hidden>›</span>
                  <span className="text-gray-600">TikTok</span>
                </div>

                <h1 className="text-[#111827] text-5xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tighter max-w-4xl text-balance">
                  Top 10 Platforms
                  <span className="block">for TikTok</span>
                </h1>
                <h2 className="text-gray-600 text-lg font-normal leading-normal max-w-2xl text-balance">
                  Compare the best platforms for TikTok marketing, growth, and engagement. Find the right tools for your needs.
                </h2>

                {/* Review/Update Badges */}
                <div className="mt-6 flex items-center justify-center gap-8">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow ring-1 ring-black/5">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
                      </svg>
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold text-gray-900">Fanzsocial Experts</span>
                      <span className="text-xs text-gray-500 text-left">Reviewed By</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow ring-1 ring-black/5">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M16 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold text-gray-900">{estDate}</span>
                      <span className="text-xs text-gray-500 text-left">Last Update</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Move the cards grid inside the hero to inherit the gradient */}
            {metas.length > 0 ? (
              <div className="relative z-10 mt-2 md:mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {sectionCards.map((card) => (
                    <a key={card.id} className="group flex flex-col h-full rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all" href={`/comparisons/article/${card.slug}`}>
                      <div className="relative">
                        <div className="bg-cover bg-center" style={{ backgroundImage: `url(${card.image})`, height: 200 }} />
                        {card.badge ? (
                          <span className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${card.badgeClass ?? "bg-primary text-white"}`}>{card.badge}</span>
                        ) : null}
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-[#111827] font-bold text-lg leading-tight group-hover:text-primary transition-colors">{card.title}</h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{card.subtitle}</p>
                      </div>
                      <div className="px-4 py-3 border-t border-gray-100 bg-sky-50 group-hover:bg-sky-100 transition-colors">
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                          Read comparison <span aria-hidden>{">"}</span>
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </section>

          {/* Section 2: Details + TOC */}
          {metas.length > 0 ? (
            <SectionTwo articles={sectionArticles as any} cardData={sectionCards as any} hrefBase="/comparisons/article" />
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No comparisons found for TikTok yet. Check back soon!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
