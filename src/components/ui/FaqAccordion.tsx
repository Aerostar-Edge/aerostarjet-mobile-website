import { useState } from 'react'
import type { FaqItem } from '../../data/content'

type FaqAccordionProps = {
  faqs: readonly FaqItem[]
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="mx-auto w-full max-w-[300px] divide-y divide-border-alt/40 overflow-hidden rounded-lg bg-surface shadow-md">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div key={faq.question}>
            <button
              type="button"
              className="flex min-h-10 w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-xs font-medium text-navy"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{faq.question}</span>
              <span
                className={`inline-flex size-5 shrink-0 items-center justify-center text-sm leading-none text-primary-alt transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
                  isOpen ? 'rotate-45' : 'rotate-0'
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`text-description px-3 pb-3 pt-0 text-muted transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${
                    isOpen ? 'opacity-100 delay-75' : 'opacity-0'
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
