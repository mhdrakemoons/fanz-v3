import React from "react";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & { id?: string };

// Blue color scheme: #138aec (primary blue) and variations
const blue50 = '#eff6ff';
const blue100 = '#dbeafe';
const blue200 = '#bfdbfe';
const blue500 = '#3b82f6';
const blue600 = '#2563eb';
const blue700 = '#1d4ed8';

function H2(props: HeadingProps) {
  const { children, className = "", ...rest } = props;
  return (
    <h2
      {...rest}
      className={`group scroll-mt-28 relative mt-12 mb-8 ${className}`}
    >
      <span className="block text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight mb-3">
        {children}
      </span>
      <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></div>
    </h2>
  );
}

function H3(props: HeadingProps) {
  const { children, className = "", ...rest } = props;
  return (
    <h3
      {...rest}
      className={`group scroll-mt-28 mt-10 mb-5 text-2xl md:text-3xl font-bold tracking-tight text-gray-900 leading-tight ${className}`}
    >
      <span className="relative inline-block">
        {children}
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-200"></span>
      </span>
    </h3>
  );
}

function H4(props: HeadingProps) {
  const { children, className = "", ...rest } = props;
  return (
    <h4
      {...rest}
      className={`group scroll-mt-28 mt-8 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-gray-900 leading-tight ${className}`}
    >
      <span className="text-blue-600 font-bold mr-2">//</span>
      {children}
    </h4>
  );
}

function A(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <a
      {...rest}
      className={`text-blue-600 hover:text-blue-700 font-medium underline underline-offset-3 decoration-2 decoration-blue-300 hover:decoration-blue-500 transition-all ${className}`}
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
      className={`relative my-8 pl-6 pr-6 py-5 border-l-4 border-blue-500 bg-blue-50/90 rounded-r-lg ${className}`}
    >
      <div className="absolute -left-2 top-5 bg-blue-500 text-white rounded-full size-6 flex items-center justify-center">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.984z"/>
        </svg>
      </div>
      <div className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium pl-4">
        {children}
      </div>
    </blockquote>
  );
}

function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
  const { className = "", ...rest } = props;
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50">
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
    <thead {...rest} className={`bg-primary ${className}`} />
  );
}

function TH(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  const { className = "", ...rest } = props;
  return (
    <th {...rest} className={`px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider letter-spacing-wider ${className}`} />
  );
}

function TD(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  const { className = "", ...rest } = props;
  // Check if this is a "Final Score" cell or similar
  const isFinalScore = typeof props.children === 'string' && props.children.toLowerCase().includes('final score');
  return (
    <td 
      {...rest} 
      className={`px-6 py-4 border-t border-gray-100 text-gray-700 text-base transition-colors hover:bg-gray-50/50 ${
        isFinalScore ? 'lg:whitespace-nowrap font-semibold bg-blue-50 text-blue-900' : ''
      } ${className}`} 
    />
  );
}

function LI(props: React.LiHTMLAttributes<HTMLLIElement>) {
  const { className = "", children, ...rest } = props;
  const isOrderedListItem = className.includes('ol-counter-item');
  return (
    <li {...rest} className={`relative pl-7 mb-3 text-gray-700 leading-relaxed ${className}`}>
      {!isOrderedListItem && (
        <span className="absolute left-0 top-0.5 w-2 h-2 rounded-full bg-blue-500 mt-2.5"></span>
      )}
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
  return (
    <ol {...rest} className={`list-none space-y-2 my-6 ml-0 ol-counter ${className}`}>
      {React.Children.map(props.children, (child, index) => {
        if (React.isValidElement(child)) {
          const childElement = child as React.ReactElement<React.HTMLAttributes<HTMLLIElement>>;
          const childChildren = childElement.props.children;
          let cleanedChildren = childChildren;
          if (typeof childChildren === 'string') {
            cleanedChildren = childChildren.replace(/^\d+\.\s*/, '');
          } else if (React.isValidElement(childChildren)) {
            const nestedElement = childChildren as React.ReactElement<any>;
            if (typeof nestedElement.props?.children === 'string') {
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
                <span className="absolute left-0 top-0.5 w-6 text-right text-blue-600 font-bold ol-counter-number"></span>
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
      className={`inline-block bg-blue-50 text-blue-700 rounded px-2 py-1 text-sm font-mono border border-blue-200 ${className}`}
    />
  );
}

function HR(props: React.HTMLAttributes<HTMLHRElement>) {
  const { className = "", ...rest } = props;
  return (
    <hr
      {...rest}
      className={`my-12 border-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent ${className}`}
    />
  );
}

function IMG(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { className = "", alt, ...rest } = props;
  return (
    <div className="my-8 rounded-lg overflow-hidden border border-blue-100 shadow-md bg-white">
      <img
        {...rest}
        alt={alt}
        className={`w-full h-auto ${className}`}
      />
      {alt && (
        <div className="px-4 py-3 bg-blue-50 border-t border-blue-100">
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

export const reviewMdxComponents = {
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
