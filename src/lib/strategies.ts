import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { getCommonRemarkPlugins, type TocHeading } from "@/lib/markdown";
import { comparisonMdxComponents } from "@/components/Comparisons/ComparisonMDXComponents";

const STRATEGIES_DIR = path.join(process.cwd(), "src", "content", "strategies");

export type StrategyFrontmatter = {
  title: string;
  slug?: string;
  date: string;
  excerpt?: string;
  image?: string;
  badge?: string;
  badgeClass?: string;
  tags?: string[];
  toc?: string;
  takeaways?: string[];
  kicker?: string;
};

export type StrategySummary = Required<Pick<StrategyFrontmatter, "title" | "date">> & {
  slug: string;
  excerpt: string;
  image?: string;
  badge?: string;
  badgeClass?: string;
};

export type StrategyArticle = StrategySummary & {
  content: React.ReactElement;
  headings: TocHeading[];
};

export type StrategyMeta = StrategyFrontmatter & { slug: string };

export type CategoryName = "TikTok" | "Instagram" | "YouTube" | "Twitter/X" | "Reddit";

// Function to normalize tags for matching
function normalizeTag(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9/+]/g, "");
}

// Derive category from strategy tags
export function deriveStrategyCategory(meta: StrategyMeta): CategoryName | null {
  const tags = (meta.tags || []).map(normalizeTag);
  if (tags.some((t) => t.includes("tiktok"))) return "TikTok";
  if (tags.some((t) => t.includes("instagram") || t.includes("reels"))) return "Instagram";
  if (tags.some((t) => t.includes("youtube") || t.includes("shorts"))) return "YouTube";
  if (tags.some((t) => t.includes("twitter") || t.includes("x"))) return "Twitter/X";
  if (tags.some((t) => t.includes("reddit"))) return "Reddit";
  return null;
}

// Derive one or more platform categories from tags (supports multi-platform strategies)
export function getPlatformsFromTags(tagsInput?: string[]): CategoryName[] {
  const tags = (tagsInput || []).map(normalizeTag);
  const categoryOrder: CategoryName[] = ["TikTok", "Instagram", "YouTube", "Twitter/X", "Reddit"];
  const matchers: Record<CategoryName, (t: string) => boolean> = {
    TikTok: (t) => t.includes("tiktok"),
    Instagram: (t) => t.includes("instagram") || t.includes("reels"),
    YouTube: (t) => t.includes("youtube") || t.includes("shorts"),
    "Twitter/X": (t) => t.includes("twitter") || t === "x" || t.includes("x"),
    Reddit: (t) => t.includes("reddit"),
  };

  const platforms: CategoryName[] = [];
  for (const category of categoryOrder) {
    if (tags.some((t) => matchers[category](t))) {
      platforms.push(category);
    }
  }
  return platforms;
}

// Get strategy counts by category
export function getStrategyCategoriesSummary(): { name: CategoryName; count: number }[] {
  const metas = getAllStrategyMeta();
  const categoryOrder: CategoryName[] = ["TikTok", "Instagram", "YouTube", "Twitter/X", "Reddit"];
  const counter = new Map<CategoryName, number>();

  for (const name of categoryOrder) counter.set(name, 0);

  for (const m of metas) {
    const platforms = getPlatformsFromTags(m.tags);
    for (const p of platforms) {
      counter.set(p, (counter.get(p) || 0) + 1);
    }
  }

  return categoryOrder.map((name) => ({ name, count: counter.get(name) || 0 }));
}

// Get strategies filtered by category
export function getStrategiesByCategory(category: CategoryName): StrategySummary[] {
  const allMetas = getAllStrategyMeta();
  const filtered = allMetas.filter((m) => getPlatformsFromTags(m.tags).includes(category));
  const allSummaries = getAllStrategySummaries();

  return allSummaries.filter(s =>
    filtered.some(m => m.slug === s.slug)
  );
}

// Get strategy metas filtered by category
export function getStrategyMetasByCategory(category: CategoryName): StrategyMeta[] {
  const metas = getAllStrategyMeta();
  return metas.filter((m) => getPlatformsFromTags(m.tags).includes(category));
}

function findFileForSlug(slug: string): string | null {
  const direct = path.join(STRATEGIES_DIR, `${slug}.mdx`);
  if (fs.existsSync(direct)) return direct;
  const files = getAllStrategyFiles();
  for (const file of files) {
    const raw = fs.readFileSync(path.join(STRATEGIES_DIR, file), "utf8");
    const { data } = matter(raw);
    const fm = data as StrategyFrontmatter;
    const fileSlug = fm.slug || file.replace(/\.mdx$/, "");
    if (fileSlug === slug) return path.join(STRATEGIES_DIR, file);
  }
  return null;
}

function readFile(slugOrFile: string): { filePath: string; raw: string } {
  let filePath: string | null = null;
  if (slugOrFile.endsWith(".mdx")) {
    filePath = path.join(STRATEGIES_DIR, slugOrFile);
  } else {
    filePath = findFileForSlug(slugOrFile);
  }
  if (!filePath) {
    throw new Error(`Strategy not found for: ${slugOrFile}`);
  }
  const raw = fs.readFileSync(filePath, "utf8");
  return { filePath, raw };
}

export function getAllStrategyFiles(): string[] {
  if (!fs.existsSync(STRATEGIES_DIR)) return [];
  return fs
    .readdirSync(STRATEGIES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort();
}

export function getAllStrategySummaries(): StrategySummary[] {
  const files = getAllStrategyFiles();
  const strategies: StrategySummary[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(STRATEGIES_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as StrategyFrontmatter;
    const slugFromFile = file.replace(/\.mdx$/, "");
    const slug = fm.slug || slugFromFile;
    return {
      slug,
      title: fm.title ?? slug,
      date: fm.date ?? new Date().toISOString(),
      excerpt: fm.excerpt ?? content.slice(0, 180),
      image: fm.image,
      badge: fm.badge,
      badgeClass: fm.badgeClass,
    };
  });

  return strategies.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllStrategyMeta(): StrategyMeta[] {
  const files = getAllStrategyFiles();
  const metas: StrategyMeta[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(STRATEGIES_DIR, file), "utf8");
    const { data } = matter(raw);
    const fm = data as StrategyFrontmatter;
    const slug = fm.slug || file.replace(/\.mdx$/, "");
    return { slug, ...fm } as StrategyMeta;
  });
  return metas.sort((a, b) => (String(a.date) < String(b.date) ? 1 : -1));
}

export function getLatestStrategies(limit = 12): StrategySummary[] {
  return getAllStrategySummaries().slice(0, limit);
}

export async function getStrategyBySlug(slug: string): Promise<StrategyArticle | null> {
  try {
    const { raw } = readFile(slug);
    const headings: TocHeading[] = [];
    const { content, frontmatter } = await compileMDX<StrategyFrontmatter>({
      source: raw,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: getCommonRemarkPlugins(headings),
        },
      },
      components: comparisonMdxComponents,
    });

    const fm = frontmatter as StrategyFrontmatter;
    const summary: StrategySummary = {
      slug: fm.slug || slug,
      title: fm.title || slug,
      date: fm.date || new Date().toISOString(),
      excerpt: fm.excerpt || "",
      image: fm.image,
      badge: fm.badge,
      badgeClass: fm.badgeClass,
    };

    return { ...summary, content, headings };
  } catch (e) {
    return null;
  }
}


