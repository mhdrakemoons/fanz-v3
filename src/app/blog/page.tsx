import Link from "next/link";
import { getAllPostSummaries } from "@/lib/blog";
import BlogGrid from "@/components/BlogGrid";

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = getAllPostSummaries();
  const estDate = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-[87.5rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <section className="relative bg-white pb-6 md:pb-10">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[900px] md:w-[1100px] md:h-[1100px] opacity-25"
              style={{ backgroundImage: 'radial-gradient(#138aec 5%, transparent 60%)' }}
            />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center py-6 md:py-10">
            <div className="z-10 flex flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-1">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span aria-hidden>›</span>
                <span className="text-gray-600">Blog</span>
              </div>
              <h1 className="text-[#111827] text-5xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tighter max-w-4xl text-balance">
                Articles & Insights
              </h1>
              <h2 className="text-gray-600 text-lg font-normal leading-normal max-w-2xl text-balance">
                Explore our collection of articles covering the latest trends, tips, and ideas to help you grow your presence online.
              </h2>
              <div className="mt-2 flex items-center justify-center gap-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow ring-1 ring-black/5">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
                    </svg>
                  </span>
                  <div className="flex flex-col leading-tight text-left">
                    <span className="text-sm font-semibold text-gray-900">Fanzsocial Experts</span>
                    <span className="text-xs text-gray-500">Reviewed By</span>
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
                  <div className="flex flex-col leading-tight text-left">
                    <span className="text-sm font-semibold text-gray-900">{estDate}</span>
                    <span className="text-xs text-gray-500">Last Update</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Keep grid inside the hero so the blue gradient sits behind cards */}
          <div className="relative z-10 mt-2 md:mt-4">
            <BlogGrid posts={posts} pageSize={9} hrefBase="/blog" />
          </div>
        </section>
      </div>
    </div>
  );
}


