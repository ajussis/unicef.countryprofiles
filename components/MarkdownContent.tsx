'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import styles from './MarkdownContent.module.css'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Remove the first two lines (title and subtitle) as we display them in the header
  const lines = content.split('\n')
  const processedContent = lines.slice(2).join('\n')
  
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          h2: ({ children, ...props }) => (
            <h2 {...props} className={styles.h2}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 {...props} className={styles.h3}>
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p {...props} className={styles.p}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul {...props} className={styles.ul}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol {...props} className={styles.ol}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li {...props} className={styles.li}>
              {children}
            </li>
          ),
          a: ({ children, href, ...props }) => (
            <a 
              {...props} 
              href={href} 
              className={styles.a}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          hr: ({ ...props }) => (
            <hr {...props} className={styles.hr} />
          ),
          strong: ({ children, ...props }) => (
            <strong {...props} className={styles.strong}>
              {children}
            </strong>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote {...props} className={styles.blockquote}>
              {children}
            </blockquote>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  )
}
