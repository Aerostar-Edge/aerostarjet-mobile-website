import { useNoOrphanFlexWrap } from '../../hooks/useNoOrphanFlexWrap'

type PartnerMarqueeProps = {
  partners: readonly string[]
  className?: string
}

export function PartnerChip({ name }: { name: string }) {
  const isMore = name.startsWith('+')

  return (
    <div
      className={`site-tag flex min-h-12 shrink-0 items-center justify-center rounded-full px-4 ${
        isMore
          ? 'site-tag--dark bg-primary-alt text-surface'
          : 'border border-border bg-surface text-navy'
      }`}
    >
      <span className={`whitespace-nowrap text-xs ${isMore ? 'font-bold' : 'font-semibold'}`}>
        {name}
      </span>
    </div>
  )
}

export function PartnerTagGrid({ partners, className = '' }: PartnerMarqueeProps) {
  const ref = useNoOrphanFlexWrap<HTMLDivElement>(partners.length)

  return (
    <div ref={ref} className={`partner-tags partner-tags--balanced ${className}`.trim()}>
      {partners.map((partner) => (
        <PartnerChip key={partner} name={partner} />
      ))}
    </div>
  )
}

export default function PartnerMarquee({ partners }: PartnerMarqueeProps) {
  const loop = [...partners, ...partners]

  return (
    <div className="-mx-4 overflow-hidden">
      <div className="animate-partner-marquee flex w-max gap-3 px-4">
        {loop.map((partner, index) => (
          <PartnerChip key={`${partner}-${index}`} name={partner} />
        ))}
      </div>
    </div>
  )
}
