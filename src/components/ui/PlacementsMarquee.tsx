import type { PlacementStory } from '../../data/content'
import { assets } from '../../data/assets'

type PlacementsMarqueeProps = {
  placements: readonly PlacementStory[]
}

function PlacementCard({ placement }: { placement: PlacementStory }) {
  return (
    <article className="placement-card w-[64vw] max-w-[210px] shrink-0 overflow-hidden rounded-lg border border-border-alt bg-surface shadow-md">
      <div className="placement-card__media relative w-full bg-bg-avatar">
        {placement.image ? (
          <img
            className="placement-card__image"
            src={placement.image}
            alt={placement.imageAlt ?? `${placement.name} — ${placement.role}`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute bottom-0 right-0 h-full w-3/5 rounded-tl-[60px] bg-primary-alt" />
        )}
      </div>
      <div className="placement-card__body flex items-center justify-between p-3">
        <div className="placement-card__copy min-w-0">
          <p className="placement-card__name">{placement.name}</p>
          <p className="placement-card__role">{placement.role}</p>
        </div>
        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-bg-avatar">
          <img alt="" className="size-3" aria-hidden src={assets.placementIcon} />
        </div>
      </div>
    </article>
  )
}

function PlacementMarqueeSet({
  placements,
  leading = false,
  ariaHidden = false,
}: {
  placements: readonly PlacementStory[]
  leading?: boolean
  ariaHidden?: boolean
}) {
  return (
    <div
      className={`placement-marquee-set flex shrink-0 items-stretch${leading ? ' placement-marquee-set--leading' : ''}`}
      aria-hidden={ariaHidden || undefined}
    >
      {placements.map((placement) => (
        <PlacementCard key={`${placement.name}${leading ? '' : '-dup'}`} placement={placement} />
      ))}
    </div>
  )
}

export default function PlacementsMarquee({ placements }: PlacementsMarqueeProps) {
  return (
    <div className="placements-marquee-wrap -mx-4 overflow-hidden">
      <div className="placements-marquee-track">
        <div className="scroll-row animate-placements-marquee flex w-max flex-nowrap">
          <PlacementMarqueeSet placements={placements} leading />
          <PlacementMarqueeSet placements={placements} ariaHidden />
        </div>
      </div>
    </div>
  )
}