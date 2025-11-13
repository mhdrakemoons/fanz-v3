import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { getCommonRemarkPlugins, type TocHeading } from "@/lib/markdown";
import { blogMdxComponents } from "@/components/Blog/BlogMDXComponents";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type BlogFrontmatter = {
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
  category?: CategoryName;
  editorChoice?: boolean;
};

export type BlogSummary = Required<Pick<BlogFrontmatter, "title" | "date">> & {
  slug: string;
  excerpt: string;
  image?: string;
  badge?: string;
  badgeClass?: string;
};

export type BlogPost = BlogSummary & {
  content: React.ReactElement;
  headings: TocHeading[];
};

export type BlogMeta = BlogFrontmatter & { slug: string };

export type CategoryName =
  | "TikTok"
  | "Instagram"
  | "YouTube"
  | "Twitter/X"
  | "LinkedIn"
  | "Facebook"
  | "Reddit";

const CATEGORY_ORDER: CategoryName[] = [
  "TikTok",
  "Instagram",
  "YouTube",
  "Twitter/X",
  "LinkedIn",
  "Facebook",
  "Reddit",
];

function normalizeTag(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9/+]/g, "");
}

export function deriveCategory(meta: BlogMeta): CategoryName {
  if (meta.category) return meta.category;
  const tags = (meta.tags || []).map(normalizeTag);
  if (tags.some((t) => t.includes("tiktok"))) return "TikTok";
  if (tags.some((t) => t.includes("instagram") || t.includes("reels"))) return "Instagram";
  if (tags.some((t) => t.includes("youtube") || t.includes("shorts"))) return "YouTube";
  if (tags.some((t) => t.includes("twitter") || t.includes("x"))) return "Twitter/X";
  if (tags.some((t) => t.includes("linkedin"))) return "LinkedIn";
  if (tags.some((t) => t.includes("facebook"))) return "Facebook";
  if (tags.some((t) => t.includes("reddit"))) return "Reddit";
  // Default to TikTok for creator-growth content if unspecified
  return "TikTok";
}

function findFileForSlug(slug: string): string | null {
  const direct = path.join(BLOG_DIR, `${slug}.mdx`);
  if (fs.existsSync(direct)) return direct;
  const files = getAllPostFiles();
  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data } = matter(raw);
    const fm = data as BlogFrontmatter;
    const fileSlug = fm.slug || file.replace(/\.mdx$/, "");
    if (fileSlug === slug) return path.join(BLOG_DIR, file);
  }
  return null;
}

function readFile(slugOrFile: string): { filePath: string; raw: string } {
  let filePath: string | null = null;
  if (slugOrFile.endsWith(".mdx")) {
    filePath = path.join(BLOG_DIR, slugOrFile);
  } else {
    filePath = findFileForSlug(slugOrFile);
  }
  if (!filePath) {
    throw new Error(`Blog post not found for: ${slugOrFile}`);
  }
  const raw = fs.readFileSync(filePath, "utf8");
  return { filePath, raw };
}

export function getAllPostFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort();
}

export function getAllPostSummaries(): BlogSummary[] {
  const files = getAllPostFiles();
  const posts: BlogSummary[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as BlogFrontmatter;
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

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestPosts(limit = 12): BlogSummary[] {
  return getAllPostSummaries().slice(0, limit);
}

export function getAllPostMeta(): BlogMeta[] {
  const files = getAllPostFiles();
  const metas: BlogMeta[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data } = matter(raw);
    const fm = data as BlogFrontmatter;
    const slug = fm.slug || file.replace(/\.mdx$/, "");
    return { slug, ...fm } as BlogMeta;
  });
  return metas.sort((a, b) => String(a.date) < String(b.date) ? 1 : -1);
}

export function getCategoriesSummary(): { name: CategoryName; count: number }[] {
  const metas = getAllPostMeta();
  const counter = new Map<CategoryName, number>();
  for (const name of CATEGORY_ORDER) counter.set(name, 0);
  for (const m of metas) {
    const c = deriveCategory(m);
    counter.set(c, (counter.get(c) || 0) + 1);
  }
  return CATEGORY_ORDER.map((name) => ({ name, count: counter.get(name) || 0 }));
}

export function getEditorsChoice(): BlogSummary | null {
  const metas = getAllPostMeta();
  const chosen = metas.find((m) => m.editorChoice);
  const target = chosen || metas[0];
  if (!target) return null;
  const summaries = getAllPostSummaries();
  return summaries.find((s) => s.slug === target.slug) || summaries[0] || null;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { raw } = readFile(slug);
    const headings: TocHeading[] = [];
    const { content, frontmatter } = await compileMDX<BlogFrontmatter>({
      source: raw,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: getCommonRemarkPlugins(headings),
        },
      },
      components: blogMdxComponents,
    });

    const fm = frontmatter as BlogFrontmatter;
    const summary: BlogSummary = {
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


