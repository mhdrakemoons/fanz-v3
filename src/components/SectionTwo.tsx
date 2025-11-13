'use client'

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Article, Card } from "@/lib/content";

type SectionTwoProps = {
  articles: (Article & { slug?: string; imageCaption?: string })[];
  cardData: (Card & { slug?: string })[];
  hrefBase?: string; // default "/comparisons"
};

export default function SectionTwo({ articles, cardData, hrefBase = "/comparisons" }: SectionTwoProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const ids = useMemo(() => articles.map((a) => `post-${a.id}`), [articles]);

  // IntersectionObserver for scroll-spy
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        } else {
          const fromTop = els
            .filter((el) => el.getBoundingClientRect().top <= 120)
            .pop();
          if (fromTop) setActiveId(fromTop.id);
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  // Smooth scrolling
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="section-2" className="pt-16">
      {/* IMPORTANT: Use grid, NO overflow on this container */}
      <div className="grid grid-cols-12 gap-8">
        {/* Content column */}
        <div className="col-span-12 lg:col-span-8 xl:col-span-9 flex flex-col gap-16">
          {articles.map((article) => {
            const card = cardData.find((c) => c.id === article.id);
            return (
              <article key={article.id} id={`post-${article.id}`} className="flex flex-col gap-5 scroll-mt-28">
                <p className="text-primary text-sm font-bold uppercase tracking-widest">{article.kicker}</p>
                <h3 className="text-4xl font-black text-[#111827] tracking-tighter text-balance">{article.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{article.description}</p>

                {card?.image ? (
                  <figure className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={card.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100 bg-gray-50/70">
                      {article.imageCaption ?? "Featured image"}
                    </figcaption>
                  </figure>
                ) : null}

                <div className="relative p-6 border-l-2 border-primary bg-white shadow-sm rounded-lg my-4">
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full size-8 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                  </div>
                  <h4 className="font-bold text-[#111827] text-lg mb-3">Key Takeaways:</h4>
                  <ul className="list-none space-y-2">
                    {article.takeaways.map((t, i) => (
                      <li key={i} className="flex items-start">
                        <span className="material-symbols-outlined text-primary text-lg mr-3 mt-0.5">check_circle</span>
                        <span className="text-gray-700">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-1">
                  <Link
                    href={article.slug ? `${hrefBase}/${article.slug}` : hrefBase}
                    className="inline-flex items-center gap-2 rounded-full bg-[#111827] text-white px-5 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-black/10 hover:-translate-y-0.5 hover:shadow-md transition-all"
                  >
                    Read the article
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        {/* Sidebar column (right) */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
          {/* Sticky box with h-max (height: max-content) */}
          <div className="sticky top-24 h-max">
            <nav aria-label="Table of contents" className="rounded-2xl border border-gray-100 bg-gray-50/80 backdrop-blur-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <h3 className="text-base font-semibold text-gray-900 tracking-tight">On this page</h3>
              </div>
              <ul className="space-y-1">
                {cardData.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => scrollToSection(`post-${c.id}`)}
                      className={`block w-full text-left py-2 px-3 rounded-lg transition-all text-sm ${
                        activeId === `post-${c.id}`
                          ? 'bg-primary text-white font-medium shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {c.toc}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </section>
  );
}


