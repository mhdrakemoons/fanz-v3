'use client'

import { useEffect, useMemo, useState, useRef } from "react";
import type { TocHeading } from "@/lib/markdown";

type TOCNavProps = {
  headings: TocHeading[];
};

export default function TOCNav({ headings }: TOCNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Check scroll position and update arrow visibility
  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const isScrollable = scrollHeight > clientHeight;
      
      if (isScrollable) {
        setCanScrollUp(scrollTop > 5); // Show up arrow if scrolled down more than 5px
        setCanScrollDown(scrollTop < scrollHeight - clientHeight - 5); // Show down arrow if not at bottom
      } else {
        setCanScrollUp(false);
        setCanScrollDown(false);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      // Use a small delay to ensure DOM is ready
      setTimeout(checkScroll, 100);
      container.addEventListener('scroll', checkScroll);
      // Also check on resize
      window.addEventListener('resize', checkScroll);
      // Use MutationObserver to detect content changes
      const resizeObserver = new ResizeObserver(checkScroll);
      resizeObserver.observe(container);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollUp = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ top: -100, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ top: 100, behavior: 'smooth' });
    }
  };

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-gray-100 bg-gray-50/80 backdrop-blur-xl p-6 shadow-sm relative">
      <div className="flex items-center gap-2 mb-5">
        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <h3 className="text-base font-semibold text-gray-900 tracking-tight">On this page</h3>
      </div>
      
      {/* Up Arrow */}
      {canScrollUp && (
        <button
          onClick={scrollUp}
          className="absolute left-1/2 -translate-x-1/2 top-16 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all text-gray-600 hover:text-primary"
          aria-label="Scroll up"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      <div 
        ref={scrollContainerRef}
        className="max-h-[calc(100vh-280px)] overflow-y-scroll scrollbar-thin" 
        style={{ paddingRight: '8px', marginRight: '-8px' }}
      >
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
      </div>

      {/* Down Arrow */}
      {canScrollDown && (
        <button
          onClick={scrollDown}
          className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all text-gray-600 hover:text-primary"
          aria-label="Scroll down"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </nav>
  );
}


