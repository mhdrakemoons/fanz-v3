'use client'

import Link from "next/link";
import { useMemo, useState } from "react";

type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  badge?: string;
  badgeClass?: string;
};

type BlogGridProps = {
  posts: PostCard[];
  pageSize?: number; // default 9
  hrefBase?: string; // default "/blog"
};

export default function BlogGrid({ posts, pageSize = 9, hrefBase = "/blog" }: BlogGridProps) {
  const [visible, setVisible] = useState(pageSize);
  const canLoadMore = visible < posts.length;
  const items = useMemo(() => posts.slice(0, visible), [posts, visible]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((post) => (
          <Link
            key={post.slug}
            href={`${hrefBase}/${post.slug}`}
            className="group flex flex-col h-full rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative">
              {post.image ? (
                <div className="bg-cover bg-center" style={{ backgroundImage: `url(${post.image})`, height: 200 }} />
              ) : (
                <div className="h-[200px] bg-gray-100" />
              )}
              {post.badge ? (
                <span className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${post.badgeClass ?? "bg-primary text-white"}`}>{post.badge}</span>
              ) : null}
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-[#111827] font-bold text-lg leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{post.excerpt}</p>
            </div>
            <div className="px-4 py-3 border-t border-gray-100 bg-sky-50 group-hover:bg-sky-100 transition-colors">
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                {hrefBase === "/reviews" ? "Read full review" : "Read article"} <span aria-hidden>{">"}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {canLoadMore ? (
        <div className="flex justify-center">
          <button
            onClick={() => setVisible((n) => n + pageSize)}
            className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[-0.01em] hover:bg-opacity-90 transition-all"
          >
            Load more
          </button>
        </div>
      ) : null}
    </div>
  );
}


