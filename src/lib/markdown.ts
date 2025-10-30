import type { PluggableList } from "unified";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkAutolinkHeadings from "remark-autolink-headings";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";

export type TocHeading = {
  id: string;
  text: string;
  depth: number; // 2-6
};

export function collectHeadingsPlugin(headings: TocHeading[]) {
  return function plugin() {
    return (tree: any) => {
      const slugger = new GithubSlugger();
      visit(tree, "heading", (node: any) => {
        const depth: number = node.depth;
        if (depth < 2 || depth > 6) return;
        let text = "";
        visit(node, (child: any) => {
          if (child.type === "text") text += child.value;
        });
        const id = slugger.slug(text);
        headings.push({ id, text, depth });
      });
    };
  };
}

export function getCommonRemarkPlugins(headings?: TocHeading[]): PluggableList {
  const plugins: PluggableList = [
    // Casts avoid mismatched unified/vfile peer types across plugins in TS
    remarkGfm as unknown as any,
    remarkSlug as unknown as any,
    [
      remarkAutolinkHeadings as unknown as any,
      {
        behavior: "append",
        properties: {
          className: [
            "inline-block",
            "ml-2",
            "text-primary",
            "opacity-0",
            "group-hover:opacity-100",
            "transition-opacity",
          ],
        },
      },
    ],
  ];

  if (headings) {
    plugins.unshift(collectHeadingsPlugin(headings) as unknown as any);
  }

  return plugins;
}


