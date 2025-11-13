import React from "react";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & { id?: string };

function H2(props: HeadingProps) {
  const { children, className = "", ...rest } = props;
  return (
    <h2
      {...rest}
      className={`scroll-mt-28 mt-10 mb-6 text-2xl md:text-3xl font-bold relative ${className}`}
      style={{
        background: 'linear-gradient(to right, #3b82f6, #60a5fa, #2563eb)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      <span className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 rounded-full opacity-60"></span>
      {children}
    </h2>
  );
}

function H3(props: HeadingProps) {
  const { children, className = "", ...rest } = props;
  return (
    <h3
      {...rest}
      className={`scroll-mt-28 mt-8 mb-4 text-xl md:text-2xl font-bold relative ${className}`}
      style={{
        background: 'linear-gradient(to right, #3b82f6, #60a5fa, #2563eb)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      <span className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 rounded-full opacity-50"></span>
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
      className={`relative my-6 pl-6 pr-4 py-4 border-l-4 border-blue-400 bg-blue-50/50 rounded-r-lg italic text-gray-700 ${className}`}
    >
      <div className="absolute -left-3 top-4 bg-blue-500 text-white rounded-full size-6 flex items-center justify-center">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.984z"/>
        </svg>
      </div>
      <div className="pl-4">
        {children}
      </div>
    </blockquote>
  );
}

function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
  const { className = "", ...rest } = props;
  return (
    <div className="my-6 overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
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
    <thead {...rest} className={`bg-gradient-to-r from-blue-50 to-blue-100/50 ${className}`} />
  );
}

function TH(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  const { className = "", ...rest } = props;
  return (
    <th {...rest} className={`px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b-2 border-blue-200 ${className}`} />
  );
}

function TD(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  const { className = "", ...rest } = props;
  return (
    <td {...rest} className={`px-4 py-3 border-b border-gray-100 text-gray-700 text-sm ${className}`} />
  );
}

function LI(props: React.LiHTMLAttributes<HTMLLIElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <li {...rest} className={`text-gray-700 leading-relaxed mb-2 relative pl-6 ${className}`}>
      <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-blue-500"></span>
      {children}
    </li>
  );
}

function UL(props: React.HTMLAttributes<HTMLUListElement>) {
  const { className = "", ...rest } = props;
  return <ul {...rest} className={`space-y-2 my-6 ${className}`} />;
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
      className={`inline bg-blue-50 text-blue-900 border border-blue-200 rounded px-1.5 py-0.5 text-sm font-mono ${className}`}
    />
  );
}

function HR(props: React.HTMLAttributes<HTMLHRElement>) {
  const { className = "", ...rest } = props;
  return (
    <hr
      {...rest}
      className={`my-8 border-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent ${className}`}
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
        className={`w-full h-auto rounded-lg border border-gray-200 shadow-sm ${className}`}
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

export const comparisonMdxComponents = {
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

