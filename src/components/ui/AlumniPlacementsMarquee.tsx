import type { PlacementStory } from '../../data/content'

type AlumniPlacementsMarqueeProps = {
  placements: readonly PlacementStory[]
}

function AlumniPlacementCard() {
  return <article className="alumni-placement-card" aria-hidden="true" />
}

export default function AlumniPlacementsMarquee({ placements }: AlumniPlacementsMarqueeProps) {
  const loop = [...placements, ...placements]

  return (
    <div className="alumni-marquee-wrap">
      <div className="alumni-marquee-track">
        {loop.map((placement, index) => (
          <AlumniPlacementCard key={`${placement.name}-${index}`} />
        ))}
      </div>
    </div>
  )
}