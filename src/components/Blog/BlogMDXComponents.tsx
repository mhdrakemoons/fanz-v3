import React from "react";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & { id?: string };

function H2(props: HeadingProps) {
  const { children, className = "", ...rest } = props;
  return (
    <h2
      {...rest}
      className={`scroll-mt-28 mt-10 mb-6 text-2xl md:text-3xl font-bold ${className}`}
      style={{
        background: 'linear-gradient(to right, #3b82f6, #60a5fa, #2563eb)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      }}
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
      className={`scroll-mt-28 mt-8 mb-4 text-xl md:text-2xl font-bold ${className}`}
      style={{
        background: 'linear-gradient(to right, #3b82f6, #60a5fa, #2563eb)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {children}
    </h3>
  );
}

function H4(props: HeadingProps) {
  const { children, className = "", ...rest } = props;
  return (
    <h4
      {...rest}
      className={`scroll-mt-28 mt-6 mb-3 text-lg md:text-xl font-semibold ${className}`}
      style={{
        background: 'linear-gradient(to right, #3b82f6, #60a5fa, #2563eb)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {children}
    </h4>
  );
}

function A(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <a
      {...rest}
      className={`text-blue-600 underline decoration-1.5 underline-offset-2 hover:text-blue-700 transition-colors ${className}`}
      style={{
        textDecoration: 'underline',
        textDecorationThickness: '1.5px',
        textUnderlineOffset: '2px',
      }}
    >
      {children}
    </a>
  );
}

function P(props: React.HTMLAttributes<HTMLParagraphElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <p
      {...rest}
      className={`text-gray-700 leading-relaxed text-base md:text-lg mb-6 ${className}`}
    >
      {children}
    </p>
  );
}

function Blockquote(props: React.HTMLAttributes<HTMLQuoteElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <blockquote
      {...rest}
      className={`relative my-6 pl-4 border-l-4 border-blue-300 italic text-gray-700 ${className}`}
    >
      {children}
    </blockquote>
  );
}

function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
  const { className = "", ...rest } = props;
  return (
    <div className="my-6 overflow-x-auto">
      <table
        {...rest}
        className={`w-full border-collapse ${className}`}
      />
    </div>
  );
}

function THead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  const { className = "", ...rest } = props;
  return (
    <thead {...rest} className={`bg-gray-100 ${className}`} />
  );
}

function TH(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  const { className = "", ...rest } = props;
  return (
    <th {...rest} className={`px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-300 ${className}`} />
  );
}

function TD(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  const { className = "", ...rest } = props;
  return (
    <td {...rest} className={`px-4 py-3 border-b border-gray-200 text-gray-700 text-sm ${className}`} />
  );
}

function LI(props: React.LiHTMLAttributes<HTMLLIElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <li {...rest} className={`text-gray-700 leading-relaxed mb-2 ${className}`}>
      {children}
    </li>
  );
}

function UL(props: React.HTMLAttributes<HTMLUListElement>) {
  const { className = "", ...rest } = props;
  return <ul {...rest} className={`list-disc list-inside space-y-2 my-6 ${className}`} />;
}

function OL(props: React.OlHTMLAttributes<HTMLOListElement>) {
  const { className = "", ...rest } = props;
  return <ol {...rest} className={`list-decimal list-inside space-y-2 my-6 ${className}`} />;
}

function CodeBlock(props: React.HTMLAttributes<HTMLElement>) {
  const { className = "", ...rest } = props;
  return (
    <code
      {...rest}
      className={`inline bg-gray-100 text-gray-800 rounded px-1.5 py-0.5 text-sm font-mono ${className}`}
    />
  );
}

function HR(props: React.HTMLAttributes<HTMLHRElement>) {
  const { className = "", ...rest } = props;
  return (
    <hr
      {...rest}
      className={`my-8 border-t border-gray-200 ${className}`}
    />
  );
}

function IMG(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { className = "", alt, ...rest } = props;
  return (
    <div className="my-6">
      <img
        {...rest}
        alt={alt}
        className={`w-full h-auto rounded-lg ${className}`}
      />
      {alt && (
        <p className="text-sm text-gray-500 italic mt-2 text-center">{alt}</p>
      )}
    </div>
  );
}

function Strong(props: React.HTMLAttributes<HTMLElement>) {
  const { className = "", ...rest } = props;
  return (
    <strong
      {...rest}
      className={`font-semibold text-gray-900 ${className}`}
    />
  );
}

function EM(props: React.HTMLAttributes<HTMLElement>) {
  const { className = "", ...rest } = props;
  return (
    <em
      {...rest}
      className={`italic text-gray-800 ${className}`}
    />
  );
}

export const blogMdxComponents = {
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  a: A,
  blockquote: Blockquote,
  table: Table,
  thead: THead,
  th: TH,
  td: TD,
  ul: UL,
  ol: OL,
  li: LI,
  code: CodeBlock,
  hr: HR,
  img: IMG,
  strong: Strong,
  em: EM,
};

