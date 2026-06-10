import { useState, type ReactNode } from 'react'

export type AccordionEntry = {
  id: string
  title: string
  badge?: string
  content: ReactNode
}

type AccordionProps = {
  entries: AccordionEntry[]
  defaultOpenIndex?: number | null
}

export function AccordionChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`shrink-0 text-navy transition-transform duration-200 ease-in-out motion-reduce:transition-none ${
        open ? 'rotate-180' : 'rotate-0'
      }`}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Accordion({ entries, defaultOpenIndex = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)

  if (entries.length === 0) return null

  return (
    <div className="divide-y divide-border-alt/60 overflow-hidden rounded-lg border border-border-alt bg-surface">
      {entries.map((entry, index) => {
        const isOpen = openIndex === index

        return (
          <div key={entry.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors duration-200 hover:bg-[rgba(43,62,255,0.04)]"
            >
              <span className="text-sm font-medium text-navy">{entry.title}</span>
              <span className="flex shrink-0 items-center gap-2">
                {entry.badge ? (
                  <span className="rounded border border-border-alt bg-bg-grey px-2 py-0.5 text-[10px] font-medium text-muted">
                    {entry.badge}
                  </span>
                ) : null}
                <AccordionChevron open={isOpen} />
              </span>
            </button>

            <div
              className={`overflow-hidden transition-[max-height] duration-300 ease-in-out motion-reduce:transition-none ${
                isOpen ? 'max-h-[2000px]' : 'max-h-0'
              }`}
            >
              <div className="px-4 pt-4 pb-4">{entry.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}