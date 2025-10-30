import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { getCommonRemarkPlugins, type TocHeading } from "@/lib/markdown";
import { mdxComponents } from "@/components/mdx/MDXComponents";

const REVIEWS_DIR = path.join(process.cwd(), "src", "content", "reviews");

export type ReviewFrontmatter = {
  title: string;
  slug?: string;
  date: string;
  excerpt?: string; // meta description
  image?: string; // featured image
  badge?: string;
  badgeClass?: string;
  tags?: string[];
  // Optional rating primitives used for the homepage reviews showcase
  rating?: number; // overall rating 0-5
  ratings?: {
    characterDiversity?: number;
    chatExperience?: number;
    imageGeneration?: number;
    videoGeneration?: number;
    [key: string]: number | undefined;
  };
};

export type ReviewSummary = Required<Pick<ReviewFrontmatter, "title" | "date">> & {
  slug: string;
  excerpt: string;
  image?: string;
  badge?: string;
  badgeClass?: string;
};

export type ReviewArticle = ReviewSummary & {
  content: React.ReactElement;
  headings: TocHeading[];
};

export type ReviewMeta = ReviewFrontmatter & { slug: string };

function findFileForSlug(slug: string): string | null {
  const direct = path.join(REVIEWS_DIR, `${slug}.mdx`);
  if (fs.existsSync(direct)) return direct;
  const files = getAllReviewFiles();
  for (const file of files) {
    const raw = fs.readFileSync(path.join(REVIEWS_DIR, file), "utf8");
    const { data } = matter(raw);
    const fm = data as ReviewFrontmatter;
    const fileSlug = fm.slug || file.replace(/\.mdx$/, "");
    if (fileSlug === slug) return path.join(REVIEWS_DIR, file);
  }
  return null;
}

function readFile(slugOrFile: string): { filePath: string; raw: string } {
  let filePath: string | null = null;
  if (slugOrFile.endsWith(".mdx")) {
    filePath = path.join(REVIEWS_DIR, slugOrFile);
  } else {
    filePath = findFileForSlug(slugOrFile);
  }
  if (!filePath) {
    throw new Error(`Review not found for: ${slugOrFile}`);
  }
  const raw = fs.readFileSync(filePath, "utf8");
  return { filePath, raw };
}

export function getAllReviewFiles(): string[] {
  if (!fs.existsSync(REVIEWS_DIR)) return [];
  return fs
    .readdirSync(REVIEWS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort();
}

export function getAllReviewSummaries(): ReviewSummary[] {
  const files = getAllReviewFiles();
  const reviews: ReviewSummary[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(REVIEWS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as ReviewFrontmatter;
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

  return reviews.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestReviews(limit = 12): ReviewSummary[] {
  return getAllReviewSummaries().slice(0, limit);
}

export function getAllReviewMeta(): ReviewMeta[] {
  const files = getAllReviewFiles();
  const metas: ReviewMeta[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(REVIEWS_DIR, file), "utf8");
    const { data } = matter(raw);
    const fm = data as ReviewFrontmatter;
    const slug = fm.slug || file.replace(/\.mdx$/, "");
    return { slug, ...fm } as ReviewMeta;
  });
  return metas.sort((a, b) => (String(a.date) < String(b.date) ? 1 : -1));
}

export async function getReviewBySlug(slug: string): Promise<ReviewArticle | null> {
  try {
    const { raw } = readFile(slug);
    const headings: TocHeading[] = [];
    const { content, frontmatter } = await compileMDX<ReviewFrontmatter>({
      source: raw,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: getCommonRemarkPlugins(headings),
        },
      },
      components: mdxComponents,
    });

    const fm = frontmatter as ReviewFrontmatter;
    const summary: ReviewSummary = {
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


