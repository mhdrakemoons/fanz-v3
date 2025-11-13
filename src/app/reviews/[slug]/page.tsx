import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllReviewSummaries, getReviewBySlug } from "@/lib/reviews";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import TOCNav from "@/components/TOCNav";
import RatingDisplay from "@/components/Reviews/RatingDisplay";
import ProsCons from "@/components/Reviews/ProsCons";

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

  // Calculate reading time from raw content
  const readingTime = review.rawContent 
    ? calculateReadingTime(review.rawContent)
    : calculateReadingTime(review.excerpt || '');

  // Format date
  const formattedDate = formatDate(review.date);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Pastel Blue Background - Full Width */}
      <div className="bg-blue-50 pt-6 md:pt-16 pb-6 md:pb-8">
        <div className="mx-auto max-w-6xl px-6 xl:px-0">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8 flex items-center gap-2 text-sm">
            <Link 
              href="/" 
              className="text-[#4A236C] hover:text-[#4A236C]/80 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </Link>
            <span className="text-[#4A236C]">/</span>
            <Link 
              href="/reviews" 
              className="text-[#4A236C] hover:text-[#4A236C]/80 transition-colors"
            >
              Reviews
            </Link>
            <span className="text-[#4A236C]">/</span>
            <span className="text-[#4A236C] font-medium">{review.title}</span>
          </nav>

          {/* Hero Section */}
          <header className="mb-12">
            <h1 className="text-[#111827] text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-balance mb-8 leading-[1.1]">
              {review.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-8 md:gap-12 mb-8">
              {/* Reviewed By */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/30">
                  <svg className="w-6 h-6 text-[#4A236C]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#4A236C] font-bold text-sm">Fanzsocial Team</span>
                  <span className="text-[#4A236C] text-xs">Reviewed By</span>
                </div>
              </div>

              {/* Last Update */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/30">
                  <svg className="w-6 h-6 text-[#4A236C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#4A236C] font-bold text-sm">{formattedDate}</span>
                  <span className="text-[#4A236C] text-xs">Last Update</span>
                </div>
              </div>

              {/* Read Time */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/30">
                  <svg className="w-6 h-6 text-[#4A236C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#4A236C] font-bold text-sm">{readingTime} Minutes</span>
                  <span className="text-[#4A236C] text-xs">Read Time</span>
                </div>
              </div>
            </div>

            {/* Rating Display in Hero */}
            {review.rating && (
              <div className="mt-8">
                <RatingDisplay rating={review.rating} ratings={review.ratings} variant="compact" />
              </div>
            )}

            {/* Pros/Cons Section in Hero */}
            {(review.pros && review.pros.length > 0) || (review.cons && review.cons.length > 0) ? (
              <div className="mt-8">
                <ProsCons pros={review.pros} cons={review.cons} />
              </div>
            ) : null}
          </header>
        </div>
      </div>

      {/* Main Content Grid - White Background */}
      <div className="mx-auto max-w-6xl px-6 xl:px-0 pb-10 md:pb-16 pt-8">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <article className="col-span-12 lg:col-span-8">
            <div className="prose prose-lg max-w-none">
              {review.content}
            </div>
          </article>

          {/* Right Column - TOC */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28">
              {/* Table of Contents */}
              {review.headings.length > 0 && (
                <TOCNav headings={review.headings} />
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
