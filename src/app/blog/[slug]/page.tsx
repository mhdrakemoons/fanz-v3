import { notFound } from "next/navigation";
import { getAllPostSummaries, getPostBySlug } from "@/lib/blog";
import TOCNav from "@/components/TOCNav";

type PageParams = { slug: string };

export async function generateStaticParams() {
  return getAllPostSummaries().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Fanzsocial`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 xl:px-0 pt-12 pb-20">
        {/* Hero Image */}
        {post.image ? (
          <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}
        
        {/* Header Section */}
        <header className="mb-8">
          {post.badge ? (
            <span className={`inline-flex items-center text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${post.badgeClass ?? "bg-blue-100 text-blue-800"}`}>
              {post.badge}
            </span>
          ) : null}
          <h1 className="text-gray-900 text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <article className="col-span-12 lg:col-span-8">
            <div className="prose prose-lg max-w-none">
              {post.content}
            </div>
          </article>
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 h-max">
              {post.headings.length > 0 && (
                <TOCNav headings={post.headings} />
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}


