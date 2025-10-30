import Link from "next/link";
import { getLatestReviews, getAllReviewMeta, type ReviewMeta } from "@/lib/reviews";
import { FaStar } from "react-icons/fa6";

function scoreLabel(score: number): string {
  if (score >= 4.2) return "Very Good";
  if (score >= 3.4) return "Good";
  if (score >= 2.6) return "Average";
  return "Poor";
}

function scoreColor(score: number): string {
  const label = scoreLabel(score);
  switch (label) {
    case "Very Good":
      return "text-emerald-600"; // distinct from Good
    case "Good":
      return "text-green-600";
    case "Average":
      return "text-amber-600";
    default:
      return "text-rose-600"; // Poor
  }
}

export default function ReviewsShowcase() {
  const reviews = getLatestReviews(9);
  const metas = getAllReviewMeta();
  const metaBySlug = new Map<string, ReviewMeta>(metas.map((m) => [m.slug, m]));
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="block text-sm md:text-base font-semibold tracking-widest uppercase text-primary">Honest Reviews</span>
          <h2 className="text-[#111827] text-3xl md:text-4xl font-extrabold tracking-tight">We test platforms so you don’t have to</h2>
          <p className="text-gray-600 mt-1">Unbiased evaluations of tools, platforms, and services.</p>
        </div>
        <Link href="/reviews" className="inline-flex items-center gap-1 text-sm md:text-base font-medium text-primary hover:underline">
          See all reviews <span aria-hidden>{">"}</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r, idx) => {
          const meta = metaBySlug.get(r.slug);
          const br = meta?.ratings || {};
          const parts: Array<{ key: string; label: string; score?: number }> = [
            { key: "easeOfUse", label: "Ease of Use", score: (br as any).easeOfUse },
            { key: "schedulingPublishing", label: "Publishing Workflow", score: (br as any).schedulingPublishing },
            { key: "analyticsReporting", label: "Analytics & Reporting", score: (br as any).analyticsReporting },
            { key: "integrationsAutomation", label: "Automations & Integrations", score: (br as any).integrationsAutomation },
          ];

          const definedScores = parts.map(p => p.score).filter((s): s is number => typeof s === "number");
          const avg = meta?.rating ?? (definedScores.length ? (definedScores.reduce((a, b) => a + b, 0) / definedScores.length) : undefined);
          const displayScore = typeof avg === "number" ? `${avg.toFixed(1)}/5` : undefined;

          return (
            <Link key={r.slug} href={`/reviews/${r.slug}`} className="group relative flex flex-col h-full rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
              {r.image ? (
                <div className="relative">
                  <div className="bg-cover bg-center" style={{ backgroundImage: `url(${r.image})`, height: 160 }} />
                  {displayScore ? (
                    <div className="absolute top-3 left-3 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-gray-900">
                      <FaStar className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-semibold">{displayScore}</span>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="relative h-[160px] bg-gray-100">
                  {displayScore ? (
                    <div className="absolute top-3 left-3 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-gray-900">
                      <FaStar className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-semibold">{displayScore}</span>
                    </div>
                  ) : null}
                </div>
              )}
              <div className="p-5 flex-1">
                {r.badge ? (
                  <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${r.badgeClass || "bg-gray-900 text-white"}`}>{r.badge}</span>
                ) : null}
                <h3 className="mt-2 text-lg font-bold text-[#111827] group-hover:underline line-clamp-2">{idx + 1}. {r.title}</h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-3">{r.excerpt}</p>
                {/* Ratings breakdown - always rendered for consistent layout */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {parts.map((p) => {
                    const s = p.score;
                    const has = typeof s === "number";
                    return (
                      <div key={p.key} className="space-y-1">
                        <div className="text-xs font-medium text-gray-500">{p.label}</div>
                        {has ? (
                          <div className={`text-sm ${scoreColor(s as number)} mt-0.5`}>
                            <span className="font-semibold">{(s as number).toFixed(1)}/5</span> <span className="font-normal">({scoreLabel(s as number)})</span>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400 mt-0.5">—</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="px-5 py-3 border-t border-gray-100 bg-sky-50 group-hover:bg-sky-100 transition-colors">
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read full review <span aria-hidden>{">"}</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}


