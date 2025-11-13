import { notFound } from "next/navigation";
import { getAllStrategySummaries, getStrategyBySlug } from "@/lib/strategies";
import TOCNav from "@/components/TOCNav";

type PageParams = { slug: string };

export async function generateStaticParams() {
  // Exclude platform category pages from dynamic route
  const platformSlugs = ['tiktok', 'instagram', 'youtube', 'twitter-x', 'reddit'];
  return getAllStrategySummaries()
    .filter((p) => !platformSlugs.includes(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const strategy = await getStrategyBySlug(slug);
  if (!strategy) return {};
  return {
    title: `${strategy.title} — Fanzsocial Comparisons`,
    description: strategy.excerpt,
    openGraph: {
      title: strategy.title,
      description: strategy.excerpt,
      images: strategy.image ? [strategy.image] : undefined,
      type: "article",
    },
  };
}

export default async function StrategyPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const strategy = await getStrategyBySlug(slug);
  if (!strategy) notFound();

  const estDate = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 xl:px-0 pt-12 pb-20">
        {/* Hero Image */}
        {strategy.image ? (
          <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={strategy.image}
              alt={strategy.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}
        
        {/* Header Section */}
        <header className="mb-8">
          {strategy.badge ? (
            <span className={`inline-flex items-center text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${strategy.badgeClass ?? "bg-blue-100 text-blue-800"}`}>
              {strategy.badge}
            </span>
          ) : null}
          <h1 className="text-gray-900 text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 leading-tight">
            {strategy.title}
          </h1>
          {strategy.excerpt && (
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              {strategy.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="mt-6 flex items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
                </svg>
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-gray-900">Fanzsocial Experts</span>
                <span className="text-xs text-gray-500">Reviewed By</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-gray-900">{estDate}</span>
                <span className="text-xs text-gray-500">Last Update</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <article className="col-span-12 lg:col-span-8">
            <div className="prose prose-lg max-w-none">
              {strategy.content}
            </div>
          </article>
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 h-max">
              {strategy.headings.length > 0 && (
                <TOCNav headings={strategy.headings} />
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}


