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
    <div className="min-h-screen">
      <div className="w-full max-w-[87.5rem] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {review.image ? (
          <div className="mb-8 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <div
              className="w-full h-[220px] sm:h-[260px] md:h-[360px] bg-gray-100 bg-center bg-cover"
              style={{ backgroundImage: `url(${review.image})` }}
            />
          </div>
        ) : null}
        <header className="mb-8">
          {review.badge ? (
            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${review.badgeClass ?? "bg-primary text-white"}`}>{review.badge}</span>
          ) : null}
          <h1 className="text-[#111827] text-4xl md:text-6xl font-black tracking-tighter text-balance mt-3">{review.title}</h1>
          <p className="text-gray-600 mt-3 text-lg max-w-3xl">{review.excerpt}</p>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <article className="col-span-12 lg:col-span-8 xl:col-span-9">
            <div className="prose max-w-none">
              {review.content}
            </div>
          </article>
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 h-max">
              <TOCNav headings={review.headings} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}


