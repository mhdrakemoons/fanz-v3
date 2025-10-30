import React from "react";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & { id?: string };

function H2(props: HeadingProps) {
  const { children, className = "", ...rest } = props;
  return (
    <h2
      {...rest}
      className={`group scroll-mt-28 text-3xl md:text-4xl font-black tracking-tight mt-10 mb-4 text-[#111827] ${className}`}
    >
      {children}
    </h2>
  );
}

function H3(props: HeadingProps) {
  const { children, className = "", ...rest } = props;
  return (
    <h3
      {...rest}
      className={`group scroll-mt-28 text-2xl md:text-3xl font-extrabold tracking-tight mt-8 mb-3 text-[#111827] ${className}`}
    >
      {children}
    </h3>
  );
}

function P(props: React.HTMLAttributes<HTMLParagraphElement>) {
  const { className = "", ...rest } = props;
  return (
    <p
      {...rest}
      className={`text-gray-700 leading-relaxed text-base md:text-lg ${className}`}
    />
  );
}

function Blockquote(props: React.HTMLAttributes<HTMLQuoteElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <blockquote
      {...rest}
      className={`relative my-6 pl-6 border-l-2 border-primary bg-white/70 rounded-md py-3 shadow-sm ${className}`}
    >
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full size-8 flex items-center justify-center">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
      </div>
      <div className="text-gray-800 italic">{children}</div>
    </blockquote>
  );
}

function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
  const { className = "", ...rest } = props;
  return (
    <div className="my-6 overflow-x-auto">
      <table
        {...rest}
        className={`w-full border border-gray-200 bg-white rounded-lg overflow-hidden ${className}`}
      />
    </div>
  );
}

function THead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  const { className = "", ...rest } = props;
  return (
    <thead {...rest} className={`bg-gray-50 ${className}`} />
  );
}

function TH(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  const { className = "", ...rest } = props;
  return (
    <th {...rest} className={`px-4 py-2 text-left text-gray-700 font-semibold ${className}`} />
  );
}

function TD(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  const { className = "", ...rest } = props;
  return (
    <td {...rest} className={`px-4 py-2 border-t border-gray-100 text-gray-700 ${className}`} />
  );
}

function UL(props: React.HTMLAttributes<HTMLUListElement>) {
  const { className = "", ...rest } = props;
  return <ul {...rest} className={`list-disc pl-6 my-4 space-y-2 ${className}`} />;
}

function OL(props: React.OlHTMLAttributes<HTMLOListElement>) {
  const { className = "", ...rest } = props;
  return <ol {...rest} className={`list-decimal pl-6 my-4 space-y-2 ${className}`} />;
}

function CodeBlock(props: React.HTMLAttributes<HTMLElement>) {
  const { className = "", ...rest } = props;
  // Keep simple; Tailwind colorized container
  return (
    <code
      {...rest}
      className={`bg-gray-100 rounded px-1.5 py-0.5 text-sm text-gray-800 ${className}`}
    />
  );
}

export const mdxComponents = {
  h2: H2,
  h3: H3,
  p: P,
  blockquote: Blockquote,
  table: Table,
  thead: THead,
  th: TH,
  td: TD,
  ul: UL,
  ol: OL,
  code: CodeBlock,
};

export type MdxComponentMap = typeof mdxComponents;


