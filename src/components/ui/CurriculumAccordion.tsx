import type { ModuleGroup } from '../../data/courseModuleGroups'
import Accordion from './Accordion'

type CurriculumAccordionProps = {
  groups: ModuleGroup[]
}

export default function CurriculumAccordion({ groups }: CurriculumAccordionProps) {
  const entries = groups.map((group) => ({
    id: group.title,
    title: group.title,
    badge: group.modules.length === 1 ? '1 module' : `${group.modules.length} modules`,
    content: (
      <div className="grid grid-cols-2 gap-2">
        {group.modules.map((module) => (
          <div
            key={module}
            className="flex items-start gap-1.5 rounded-lg border border-[rgba(43,62,255,0.16)] bg-surface px-2 py-2"
          >
            <span className="shrink-0 text-xs font-bold leading-none text-primary">&#10003;</span>
            <span className="text-xs leading-snug text-navy">{module}</span>
          </div>
        ))}
      </div>
    ),
  }))

  return <Accordion entries={entries} defaultOpenIndex={0} />
}