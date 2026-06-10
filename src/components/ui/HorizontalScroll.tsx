import { useRef, type PointerEvent, type ReactNode, type WheelEvent } from 'react'

type HorizontalScrollProps = {
  children: ReactNode
  className?: string
  ariaLabel?: string
}

const DRAG_THRESHOLD = 4

export default function HorizontalScroll({
  children,
  className = '',
  ariaLabel = 'Scroll horizontally',
}: HorizontalScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const hasDragged = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const activePointerId = useRef<number | null>(null)

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || event.button !== 0) return

    isDragging.current = true
    hasDragged.current = false
    activePointerId.current = event.pointerId
    startX.current = event.clientX
    scrollLeftStart.current = track.scrollLeft
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!isDragging.current || !track || activePointerId.current !== event.pointerId) return

    const delta = event.clientX - startX.current
    if (Math.abs(delta) <= DRAG_THRESHOLD) return

    if (!hasDragged.current) {
      hasDragged.current = true
      track.setPointerCapture(event.pointerId)
    }

    event.preventDefault()

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth)
    track.scrollLeft = Math.max(0, Math.min(scrollLeftStart.current - delta, maxScroll))
  }

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!isDragging.current || !track || activePointerId.current !== event.pointerId) return

    isDragging.current = false
    activePointerId.current = null

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId)
    }
  }

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    if (delta === 0) return

    track.scrollLeft += delta
    event.preventDefault()
  }

  return (
    <div
      ref={trackRef}
      role="region"
      aria-label={ariaLabel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={onWheel}
      onClickCapture={(event) => {
        if (hasDragged.current) {
          event.preventDefault()
          event.stopPropagation()
          hasDragged.current = false
        }
      }}
      className={`horizontal-scroll flex w-full min-w-0 flex-nowrap items-center gap-2 overflow-x-scroll overscroll-x-contain px-4 pb-2 scrollbar-hide ${className}`.trim()}
    >
      {children}
      <div className="w-1 shrink-0" aria-hidden />
    </div>
  )
}
