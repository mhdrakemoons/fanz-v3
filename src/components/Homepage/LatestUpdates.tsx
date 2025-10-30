import Link from "next/link";
import { getLatestPosts } from "@/lib/blog";

export default function LatestUpdates() {
  const latest = getLatestPosts(9);
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="block text-sm md:text-base font-semibold tracking-widest uppercase text-primary">Latest Updates</span>
          <h2 className="text-[#111827] text-3xl md:text-4xl font-extrabold tracking-tight">Our Latest Articles</h2>
        </div>
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm md:text-base font-medium text-primary hover:underline">
          View all articles <span aria-hidden>{">"}</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {latest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
            {post.image ? (
              <div className="bg-cover bg-center" style={{ backgroundImage: `url(${post.image})`, height: 180 }} />
            ) : (
              <div className="h-[180px] bg-gray-100" />
            )}
            <div className="p-5">
              {post.badge ? (
                <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${post.badgeClass || "bg-primary text-white"}`}>{post.badge}</span>
              ) : null}
              <h3 className="mt-2 text-lg font-bold text-[#111827] group-hover:underline line-clamp-2">{post.title}</h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}


