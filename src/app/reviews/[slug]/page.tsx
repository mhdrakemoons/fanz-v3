import { notFound } from "next/navigation";
import { getAllReviewSummaries, getReviewBySlug } from "@/lib/reviews";
import TOCNav from "@/components/TOCNav";

type PageParams = { slug: string };

export async function generateStaticParams() {
  return getAllReviewSummaries().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) return {};
  return {
    title: `${review.title} — Fanzsocial Reviews`,
    description: review.excerpt,
    openGraph: {
      title: review.title,
      description: review.excerpt,
      images: review.image ? [review.image] : undefined,
      type: "article",
    },
  };
}

export default async function ReviewPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="w-full max-w-[87.5rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        {/* Hero Image */}
        {review.image ? (
          <div className="mb-12 rounded-2xl overflow-hidden border border-gray-200/60 shadow-xl bg-gradient-to-br from-gray-50 to-white">
            <div
              className="w-full h-[240px] sm:h-[300px] md:h-[420px] bg-gray-100 bg-center bg-cover relative"
              style={{ backgroundImage: `url(${review.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          </div>
        ) : null}
        
        {/* Header Section */}
        <header className="mb-12 relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/60 to-transparent rounded-full opacity-60"></div>
          <div className="pl-6">
            {review.badge ? (
              <span className={`inline-flex items-center text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm ${review.badgeClass ?? "bg-primary text-white"}`}>
                {review.badge}
              </span>
            ) : null}
            <h1 className="text-[#111827] text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-balance mt-4 leading-[1.1] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {review.title}
            </h1>
            <p className="text-gray-600 mt-5 text-lg md:text-xl max-w-3xl leading-relaxed font-medium">
              {review.excerpt}
            </p>
            
            {/* Decorative line */}
            <div className="mt-6 h-px w-32 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent"></div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <article className="col-span-12 lg:col-span-8 xl:col-span-9">
            <div className="prose prose-lg max-w-none">
              {review.content}
            </div>
          </article>
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-28 h-max">
              <TOCNav headings={review.headings} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}


