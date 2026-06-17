import Accordion from './Accordion'

type GroundSubjectsAccordionProps = {
  subjects: string[]
}

type ParsedSubject = {
  title: string
  description: string
}

function parseSubject(subject: string): ParsedSubject {
  const separator = ' — '
  const index = subject.indexOf(separator)

  if (index === -1) {
    return { title: subject, description: '' }
  }

  return {
    title: subject.slice(0, index),
    description: subject.slice(index + separator.length),
  }
}

export default function GroundSubjectsAccordion({ subjects }: GroundSubjectsAccordionProps) {
  const entries = subjects.map((subject) => {
    const parsed = parseSubject(subject)

    return {
      id: parsed.title,
      title: parsed.title,
      content: parsed.description ? (
        <p className="text-xs leading-relaxed text-muted">{parsed.description}</p>
      ) : null,
    }
  })

  return <Accordion entries={entries} defaultOpenIndex={null} />
}