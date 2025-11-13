# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fanzsocial is a Next.js 16 content website focused on social media strategies for creators and brands. It features a homepage with multiple sections, blog posts, reviews, and strategy articles, all powered by MDX files.

## Development Commands

- `npm run dev` - Start the development server (http://localhost:3000)
- `npm run build` - Build the production application
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## Architecture

### Framework & Stack
- **Next.js 16** with App Router (React 19)
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling
- **Turbopack** enabled for faster builds
- **MDX** for content authoring via `next-mdx-remote`

### Path Aliases
- `@/*` maps to `./src/*`

### Content Management System

The site uses a file-based CMS with MDX files organized into three content types:

1. **Blog Posts** (`src/content/blog/*.mdx`)
   - Managed by `src/lib/blog.ts`
   - Frontmatter: `title`, `slug`, `date`, `excerpt`, `image`, `badge`, `badgeClass`, `tags`, `category`, `editorChoice`
   - Categories: TikTok, Instagram, YouTube, Twitter/X, LinkedIn, Facebook, Reddit
   - Categories derived from tags if not explicitly set

2. **Reviews** (`src/content/reviews/*.mdx`)
   - Managed by `src/lib/reviews.ts`
   - Frontmatter: `title`, `slug`, `date`, `excerpt`, `image`, `badge`, `badgeClass`, `tags`, `rating`, `ratings`
   - Support for multi-dimensional ratings (characterDiversity, chatExperience, etc.)

3. **Strategies** (`src/content/strategies/*.mdx`)
   - Managed by `src/lib/strategies.ts`
   - Frontmatter: `title`, `slug`, `date`, `excerpt`, `image`, `badge`, `badgeClass`, `tags`, `toc`, `takeaways`, `kicker`

### Key Content Library Functions

All three content types share similar patterns:
- `getAll[Type]Files()` - List all MDX files
- `getAll[Type]Summaries()` - Get metadata without content
- `get[Type]BySlug(slug)` - Compile and return full article with rendered MDX
- Files can define custom `slug` in frontmatter, otherwise filename (without .mdx) is used

### MDX Processing

MDX compilation happens in `src/lib/markdown.ts`:
- **Remark plugins**: GitHub Flavored Markdown, auto-slugging, autolink headings
- **TOC extraction**: `collectHeadingsPlugin` extracts h2-h6 headings for table of contents
- Custom components defined in `src/components/mdx/MDXComponents.tsx`

### Homepage Structure

The homepage (`src/app/page.tsx` → `src/components/Homepage/index.tsx`) is composed of sections:
- `Hero` - Main hero section
- `Categories` - Platform category grid
- `EditorsChoice` - Featured article (marked with `editorChoice: true` in frontmatter)
- `LatestUpdates` - Recent blog posts
- `ReviewsShowcase` - Featured reviews
- `BestStrategies` - Comparison articles
- `BlogMini` - Additional blog content

Static content cards are defined in `src/lib/content.ts` as `CARD_DATA` array.

### Routing

- `/` - Homepage
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog post
- `/reviews` - Reviews listing
- `/reviews/[slug]` - Individual review
- `/comparisons` - Comparisons listing
- `/comparisons/[slug]` - Individual comparison

### Global Layout

`src/app/layout.tsx` includes:
- Plus Jakarta Sans font from Google Fonts
- Material Symbols Outlined icon font
- Navbar and Footer components wrapped around all pages
- Max width container of 1400px

### Styling

- Tailwind v4 with PostCSS
- Custom CSS variables likely defined in `src/app/globals.css`
- Uses `font-display` class for Plus Jakarta Sans
- Light theme with background color `bg-background-light`

## Important Notes

- When adding new content, create MDX files in the appropriate `src/content/[type]/` directory
- Frontmatter must include at minimum: `title` and `date`
- Custom slugs can override filename-based slugs via frontmatter
- The build uses Turbopack with root set to `__dirname` to avoid parent directory issues
- Next.js strict mode and TypeScript strict mode are both enabled
