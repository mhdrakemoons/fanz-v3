import SectionOne from '@/components/SectionOne'
import SectionTwo from '@/components/SectionTwo'
import { getLatestStrategies, getAllStrategyMeta } from '@/lib/strategies'

export default async function ComparisonsPage() {
  const latest = getLatestStrategies(12);
  const homeCards = latest.map((p, idx) => ({
    id: idx + 1,
    title: p.title,
    subtitle: p.excerpt,
    image: p.image,
    badge: p.badge,
    badgeClass: p.badgeClass,
    slug: p.slug,
  }));

  // Build Section 2 data from MDX frontmatter
  const metas = getAllStrategyMeta().slice(0, 12);
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
    imageCaption: m.badge || 'Featured insight',
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
          {/* Breadcrumb moved into hero (SectionOne) */}

          {/* Section 1: Title + 12 Posts */}
          <SectionOne cardData={homeCards} hrefBase="/comparisons/article" />

          {/* Section 2: Details + TOC */}
          <SectionTwo articles={sectionArticles as any} cardData={sectionCards as any} hrefBase="/comparisons/article" />
        </main>
      </div>
    </div>
  );
}


