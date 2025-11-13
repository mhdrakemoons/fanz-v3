import React from "react";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & { id?: string };

function H2(props: HeadingProps) {
  const { children, className = "", ...rest } = props;
  return (
    <h2
      {...rest}
      className={`group scroll-mt-28 relative mt-12 mb-6 ${className}`}
    >
      <span className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/40 via-primary/30 to-primary/20 rounded-full opacity-60 group-hover:opacity-100 group-hover:from-primary group-hover:via-primary/80 group-hover:to-primary/40 transition-all duration-300"></span>
      <span className="block text-3xl md:text-4xl font-black tracking-tight text-[#111827] leading-tight">
        {children}
      </span>
      <div className="mt-3 h-px w-20 bg-gradient-to-r from-primary/60 to-transparent"></div>
    </h2>
  );
}

function H3(props: HeadingProps) {
  const { children, className = "", ...rest } = props;
  return (
    <h3
      {...rest}
      className={`group scroll-mt-28 mt-10 mb-4 text-2xl md:text-3xl font-extrabold tracking-tight text-[#111827] leading-tight ${className}`}
    >
      <span className="relative inline-block">
        {children}
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/40 to-transparent"></span>
      </span>
    </h3>
  );
}

function H4(props: HeadingProps) {
  const { children, className = "", ...rest } = props;
  return (
    <h4
      {...rest}
      className={`group scroll-mt-28 mt-8 mb-3 text-xl md:text-2xl font-bold tracking-tight text-[#111827] leading-tight ${className}`}
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
      className={`text-primary hover:text-primary/80 font-medium underline underline-offset-2 decoration-2 decoration-primary/30 hover:decoration-primary/60 transition-colors ${className}`}
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
      className={`relative my-8 pl-8 pr-6 py-6 border-l-4 border-primary/60 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent rounded-r-lg shadow-sm backdrop-blur-sm ${className}`}
    >
      <div className="absolute -left-3 top-6 bg-gradient-to-br from-primary to-primary/80 text-white rounded-full size-10 flex items-center justify-center shadow-lg ring-4 ring-white">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.984z"/>
        </svg>
      </div>
      <div className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium pl-6">
        {children}
      </div>
    </blockquote>
  );
}

function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
  const { className = "", ...rest } = props;
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
      <div className="overflow-x-auto">
        <table
          {...rest}
          className={`w-full ${className}`}
        />
      </div>
    </div>
  );
}

function THead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  const { className = "", ...rest } = props;
  return (
    <thead {...rest} className={`bg-gradient-to-r from-gray-50 to-gray-100/50 ${className}`} />
  );
}

function TH(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  const { className = "", ...rest } = props;
  return (
    <th {...rest} className={`px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider ${className}`} />
  );
}

function TD(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  const { className = "", ...rest } = props;
  return (
    <td {...rest} className={`px-6 py-4 border-t border-gray-100 text-gray-700 text-base ${className}`} />
  );
}

function LI(props: React.LiHTMLAttributes<HTMLLIElement>) {
  const { className = "", children, ...rest } = props;
  const isOrderedListItem = className.includes('ol-counter-item');
  return (
    <li {...rest} className={`relative pl-6 mb-3 text-gray-700 leading-relaxed ${className}`}>
      {!isOrderedListItem && (
        <span className="absolute left-0 top-0.5 w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></span>
      )}
      {children}
    </li>
  );
}

function UL(props: React.HTMLAttributes<HTMLUListElement>) {
  const { className = "", ...rest } = props;
  return <ul {...rest} className={`space-y-1 my-6 ${className}`} />;
}

function OL(props: React.OlHTMLAttributes<HTMLOListElement>) {
  const { className = "", ...rest } = props;
  return (
    <ol {...rest} className={`list-none space-y-1 my-6 ml-0 ol-counter ${className}`}>
      {React.Children.map(props.children, (child, index) => {
        if (React.isValidElement(child)) {
          const childElement = child as React.ReactElement<React.HTMLAttributes<HTMLLIElement>>;
          const childChildren = childElement.props.children;
          // Check if children already contains a number pattern (like "1. " or "1." at the start)
          let cleanedChildren = childChildren;
          if (typeof childChildren === 'string') {
            cleanedChildren = childChildren.replace(/^\d+\.\s*/, '');
          } else if (React.isValidElement(childChildren)) {
            const nestedElement = childChildren as React.ReactElement<any>;
            if (typeof nestedElement.props?.children === 'string') {
              // Handle nested React elements
              const nestedString = nestedElement.props.children;
              cleanedChildren = React.cloneElement(nestedElement, {
                children: nestedString.replace(/^\d+\.\s*/, ''),
              });
            }
          }
          
          return React.cloneElement(childElement, {
            className: `relative pl-8 mb-3 text-gray-700 leading-relaxed ol-counter-item ${childElement.props.className || ''}`,
            children: (
              <>
                <span className="absolute left-0 top-0.5 w-6 text-right text-primary font-bold ol-counter-number"></span>
                {cleanedChildren}
              </>
            ),
          });
        }
        return child;
      })}
    </ol>
  );
}

function CodeBlock(props: React.HTMLAttributes<HTMLElement>) {
  const { className = "", ...rest } = props;
  return (
    <code
      {...rest}
      className={`inline-block bg-gradient-to-br from-gray-100 to-gray-50 rounded-md px-2 py-1 text-sm font-mono text-gray-800 border border-gray-200/60 shadow-sm ${className}`}
    />
  );
}

function HR(props: React.HTMLAttributes<HTMLHRElement>) {
  const { className = "", ...rest } = props;
  return (
    <hr
      {...rest}
      className={`my-12 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent ${className}`}
    />
  );
}

function IMG(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { className = "", alt, ...rest } = props;
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-gray-200 shadow-lg bg-gray-50">
      <img
        {...rest}
        alt={alt}
        className={`w-full h-auto ${className}`}
      />
      {alt && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600 italic text-center">{alt}</p>
        </div>
      )}
    </div>
  );
}

function Strong(props: React.HTMLAttributes<HTMLElement>) {
  const { className = "", ...rest } = props;
  return (
    <strong
      {...rest}
      className={`font-bold text-gray-900 ${className}`}
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

export const mdxComponents = {
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

export type MdxComponentMap = typeof mdxComponents;


