'use client';

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';

interface DocumentContentProps {
  content: string;
  className?: string;
}

export function DocumentContent({ content, className = '' }: DocumentContentProps) {
  return (
    <article
      className={`
        prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-text-primary
        prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-8
        prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-6
        prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4
        prose-p:text-text-primary prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-text-primary prose-strong:font-semibold
        prose-code:text-primary prose-code:bg-surface-hover prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-text-secondary
        prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
        prose-li:text-text-primary prose-li:mb-2
        prose-img:rounded-lg prose-img:shadow-md
        prose-hr:border-border prose-hr:my-8
        prose-table:border-collapse prose-table:w-full
        prose-th:bg-surface-hover prose-th:border prose-th:border-border prose-th:p-2 prose-th:text-left
        prose-td:border prose-td:border-border prose-td:p-2
        dark:prose-invert
        ${className}
      `}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => {
            const text = getTextContent(props.children);
            const id = `heading-${slugify(text)}`;
            return <h1 id={id} {...props} />;
          },
          h2: ({ node, ...props }) => {
            const text = getTextContent(props.children);
            const id = `heading-${slugify(text)}`;
            return <h2 id={id} {...props} />;
          },
          h3: ({ node, ...props }) => {
            const text = getTextContent(props.children);
            const id = `heading-${slugify(text)}`;
            return <h3 id={id} {...props} />;
          },
          h4: ({ node, ...props }) => {
            const text = getTextContent(props.children);
            const id = `heading-${slugify(text)}`;
            return <h4 id={id} {...props} />;
          },
          h5: ({ node, ...props }) => {
            const text = getTextContent(props.children);
            const id = `heading-${slugify(text)}`;
            return <h5 id={id} {...props} />;
          },
          h6: ({ node, ...props }) => {
            const text = getTextContent(props.children);
            const id = `heading-${slugify(text)}`;
            return <h6 id={id} {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

// Helper function to extract text content from React children
function getTextContent(children: any): string {
  if (typeof children === 'string') {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(getTextContent).join('');
  }
  if (children?.props?.children) {
    return getTextContent(children.props.children);
  }
  return '';
}

// Helper function to create URL-friendly slugs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
