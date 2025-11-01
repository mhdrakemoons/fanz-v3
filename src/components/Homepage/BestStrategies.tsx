import Link from "next/link";
import { getLatestStrategies, getAllStrategyMeta, getPlatformsFromTags, type CategoryName } from "@/lib/strategies";
import { FaTiktok, FaInstagram, FaYoutube, FaXTwitter, FaReddit } from "react-icons/fa6";

function iconForPlatform(name: CategoryName) {
  const className = "h-4 w-4";
  switch (name) {
    case "TikTok":
      return <FaTiktok className={className} />;
    case "Instagram":
      return <FaInstagram className={className} />;
    case "YouTube":
      return <FaYoutube className={className} />;
    case "Twitter/X":
      return <FaXTwitter className={className} />;
    case "Reddit":
      return <FaReddit className={className} />;
  }
}

export default function BestStrategies() {
  const strategies = getLatestStrategies(6);
  const metas = getAllStrategyMeta();
  const metaBySlug = new Map(metas.map((m) => [m.slug, m]));
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="block text-sm md:text-base font-semibold tracking-widest uppercase text-primary">Comparisons</span>
          <h2 className="text-[#111827] text-3xl md:text-4xl font-extrabold tracking-tight">Proven Playbooks by Platform</h2>
          <p className="text-gray-600 mt-1">Our hand-picked tactics that consistently perform.</p>
        </div>
        <Link href="/comparisons" className="inline-flex items-center gap-1 text-sm md:text-base font-medium text-primary hover:underline">
          See all comparisons <span aria-hidden>{">"}</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((s) => {
          const platforms = getPlatformsFromTags(metaBySlug.get(s.slug)?.tags);
          return (
            <Link key={s.slug} href={`/comparisons/article/${s.slug}`} className="group relative flex flex-col h-full rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
              {s.image ? (
                <div className="bg-cover bg-center" style={{ backgroundImage: `url(${s.image})`, height: 160 }} />
              ) : (
                <div className="h-[160px] bg-gradient-to-br from-sky-50 to-blue-50" />
              )}
              <div className="p-5 flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {platforms.map((p) => (
                    <span key={p} className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm">
                      {iconForPlatform(p)} {p}
                    </span>
                  ))}
                </div>
                {s.badge ? (
                  <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${s.badgeClass || "bg-primary text-white"}`}>{s.badge}</span>
                ) : null}
                <h3 className="mt-2 text-lg font-bold text-[#111827] group-hover:underline line-clamp-2">{s.title}</h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-3">{s.excerpt}</p>
              </div>
              <div className="px-5 py-3 border-t border-gray-100 bg-sky-50 group-hover:bg-sky-100 transition-colors">
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read comparison <span aria-hidden>{">"}</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}


