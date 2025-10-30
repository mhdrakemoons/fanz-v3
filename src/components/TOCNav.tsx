'use client'

import { useEffect, useMemo, useState } from "react";
import type { TocHeading } from "@/lib/markdown";

type TOCNavProps = {
  headings: TocHeading[];
};

export default function TOCNav({ headings }: TOCNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const ids = useMemo(() => headings.map((h) => h.id), [headings]);

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

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-gray-100 bg-gray-50/80 backdrop-blur-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <h3 className="text-base font-semibold text-gray-900 tracking-tight">On this page</h3>
      </div>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} className={h.depth > 2 ? "ml-3" : undefined}>
            <button
              onClick={() => handleClick(h.id)}
              className={`block w-full text-left py-2 px-3 rounded-lg transition-all text-sm ${
                activeId === h.id
                  ? 'bg-primary text-white font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}


