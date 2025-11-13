import Link from "next/link";
import { getLatestPosts } from "@/lib/blog";

export default function BlogMini() {
  const posts = getLatestPosts(3);
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="block text-sm md:text-base font-semibold tracking-widest uppercase text-primary">From the Blog</span>
          <h2 className="text-[#111827] text-3xl md:text-4xl font-extrabold tracking-tight">Insights, news, and ideas</h2>
          <p className="text-gray-600 mt-1">Short reads to keep you sharp.</p>
        </div>
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm md:text-base font-medium text-primary hover:underline">
          View all posts <span aria-hidden>{">"}</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col h-full rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
            {p.image ? (
              <div className="bg-cover bg-center" style={{ backgroundImage: `url(${p.image})`, height: 160 }} />
            ) : (
              <div className="h-[160px] bg-gray-100" />
            )}
            <div className="p-5 flex-1">
              {p.badge ? (
                <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${p.badgeClass || "bg-primary text-white"}`}>{p.badge}</span>
              ) : null}
              <h3 className="mt-2 text-lg font-bold text-[#111827] group-hover:underline line-clamp-2">{p.title}</h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-3">{p.excerpt}</p>
            </div>
            <div className="px-5 py-3 border-t border-gray-100 bg-sky-50 group-hover:bg-sky-100 transition-colors">
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read article <span aria-hidden>{">"}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}


