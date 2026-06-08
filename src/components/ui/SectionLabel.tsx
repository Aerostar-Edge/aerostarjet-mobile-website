type SectionLabelProps = {
  children: string
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`.trim()}>
      <span className="size-2 shrink-0 rounded bg-accent" />
      <span className="text-label font-bold uppercase tracking-[0.12em] text-primary">
        {children}
      </span>
    </div>
  )
}
