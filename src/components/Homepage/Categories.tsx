import { type CategoryName, getStrategyCategoriesSummary } from "@/lib/strategies";
import { FaTiktok, FaInstagram, FaYoutube, FaXTwitter, FaReddit } from "react-icons/fa6";

type Cat = { name: CategoryName; count: number };

function IconFor({ name }: { name: CategoryName }) {
	const className = "h-8 w-8";
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

function categoryToSlug(name: CategoryName): string {
  switch (name) {
    case "TikTok":
      return "tiktok";
    case "Instagram":
      return "instagram";
    case "YouTube":
      return "youtube";
    case "Twitter/X":
      return "twitter-x";
    case "Reddit":
      return "reddit";
  }
}

export default function Categories() {
	const desiredOrder: CategoryName[] = ["TikTok", "Instagram", "Reddit", "Twitter/X", "YouTube"];
	const categories: Cat[] = getStrategyCategoriesSummary()
		.sort((a, b) => desiredOrder.indexOf(a.name) - desiredOrder.indexOf(b.name));
  return (
    <section id="categories" className="mt-12">
      <div className="text-center mb-6">
        <span className="block text-sm md:text-base font-semibold tracking-widest uppercase text-primary">BEST STRATEGIES</span>
        <h2 className="text-[#111827] text-3xl md:text-4xl font-extrabold tracking-tight">Browse by Social Platform</h2>
				<p className="text-gray-600 mt-2">Find proven strategies for your favorite platform</p>
      </div>
			<div className="grid w-full grid-flow-col auto-cols-[180px] gap-4 overflow-x-auto pb-1 justify-start lg:overflow-visible lg:grid-flow-row lg:grid-cols-5 lg:gap-6 lg:justify-between">
				{categories.map((c) => (
					<a
						key={c.name}
						href={`/best-strategies/${categoryToSlug(c.name)}`}
						className="group w-[180px] lg:w-full h-[144px] flex flex-col items-center justify-center text-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-4 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all"
					>
						<span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white text-sky-400 shadow ring-1 ring-black/5">
							<IconFor name={c.name} />
						</span>
						<div className="text-lg font-semibold text-[#111827] truncate">{c.name}</div>
						<div className="text-sm text-gray-500">
							{c.count} {c.count === 1 ? "strategy" : "strategies"}
						</div>
					</a>
				))}
			</div>
    </section>
  );
}


