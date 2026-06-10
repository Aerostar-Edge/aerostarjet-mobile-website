import type { FaqItem } from '../../data/content'
import Accordion from './Accordion'

type FaqAccordionProps = {
  faqs: readonly FaqItem[]
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const entries = faqs.map((faq) => ({
    id: faq.question,
    title: faq.question,
    content: <p className="faq-answer text-muted">{faq.answer}</p>,
  }))

  return <Accordion entries={entries} defaultOpenIndex={0} />
}