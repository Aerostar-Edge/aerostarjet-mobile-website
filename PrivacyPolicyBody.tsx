import type { PrivacyPolicyBlock } from '../../data/privacyPolicy'

type PrivacyPolicyBodyProps = {
  blocks: PrivacyPolicyBlock[]
}

function renderInlineText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-navy">
          {part.slice(2, -2).trim()}
        </strong>
      )
    }

    return <span key={index}>{part}</span>
  })
}

export default function PrivacyPolicyBody({ blocks }: PrivacyPolicyBodyProps) {
  return (
    <div className="privacy-policy-body stack-copy">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          if (block.level === 1) {
            return (
              <h2 key={index} className="text-sm font-bold text-navy first:pt-0">
                {block.text}
              </h2>
            )
          }

          return (
            <h3 key={index} className="text-sm font-bold text-navy">
              {block.text}
            </h3>
          )
        }

        if (block.type === 'list') {
          return (
            <ul key={index} className="stack-list list-none pl-0 text-description leading-6 text-body">
              {block.items.map((item) => (
                <li key={item}>{renderInlineText(item)}</li>
              ))}
            </ul>
          )
        }

        return (
          <p key={index} className="text-description leading-6 text-body">
            {renderInlineText(block.text)}
          </p>
        )
      })}
    </div>
  )
}