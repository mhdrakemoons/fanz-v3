import Link from "next/link";
import { getEditorsChoice, getAllPostMeta, deriveCategory } from "@/lib/blog";

export default function EditorsChoice() {
  const post = getEditorsChoice();
  if (!post) return null;
  const meta = getAllPostMeta().find((m) => m.slug === post.slug);
  const category = meta ? deriveCategory(meta) : undefined;

  return (
    <section className="mt-12">
      <div className="rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-blue-500 via-sky-600 to-blue-600 overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center md:justify-between gap-8">
          {/* Left: text */}
          <div className="md:max-w-md w-full">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-white/20 text-white mb-4">
              {/* star icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              Editor's Choice
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{post.title}</h3>
            <p className="text-white/90 mb-6 line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center gap-3">
              <Link href={`/blog/${post.slug}`} className="inline-flex h-10 items-center justify-center rounded-md px-6 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-white text-sky-700 hover:bg-blue-100">
                Read article
              </Link>
              <Link href={`/blog${category ? `?category=${encodeURIComponent(category)}` : ""}`} className="inline-flex h-10 items-center justify-center rounded-md px-6 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 border border-white/40 bg-white/10 text-white hover:bg-white/15">
                View more in {category ?? "Blog"}
              </Link>
            </div>
          </div>
          {/* Right: image */}
          <div className="md:w-1/3 w-full relative">
            <div className="aspect-[600/315] rounded-lg overflow-hidden shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
                src={post.image || "/placeholder.png"}
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-white rounded-full px-4 py-1 font-bold text-sky-700 shadow-lg">
              {category ?? "Featured"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


