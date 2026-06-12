import type { BlogBlock } from '../../data/blogs'

type BlogArticleBodyProps = {
  blocks: BlogBlock[]
}

export default function BlogArticleBody({ blocks }: BlogArticleBodyProps) {
  return (
    <div className="blog-article-body stack-copy">
      {blocks.map((block, index) => {
        if (block.type === 'paragraph') {
          return (
            <p key={index} className="text-description leading-6 text-body">
              {block.text}
            </p>
          )
        }

        if (block.type === 'heading') {
          return (
            <h2 key={index} className="text-sm font-bold text-navy">
              {block.text}
            </h2>
          )
        }

        if (block.type === 'list') {
          return (
            <ul key={index} className="stack-list list-disc pl-5 text-description leading-6 text-body">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }

        if (block.type === 'faq') {
          return (
            <div key={index} className="stack-copy">
              {block.items.map((item) => (
                <div key={item.question} className="stack-field">
                  <p className="text-xs font-bold text-navy">{item.question}</p>
                  <p className="text-description leading-6 text-body">{item.answer}</p>
                </div>
              ))}
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
