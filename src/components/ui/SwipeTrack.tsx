import { useRef, type PointerEvent, type ReactNode } from 'react'

type SwipeTrackProps = {
  children: ReactNode
  className?: string
  gapClassName?: string
}

const SNAP_MS = 360
const DRAG_THRESHOLD = 4
const SLIDE_COMMIT_RATIO = 0.12

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

export default function SwipeTrack({
  children,
  className = '',
  gapClassName = 'gap-4',
}: SwipeTrackProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const hasDragged = useRef(false)
  const activePointerId = useRef<number | null>(null)
  const animationFrame = useRef<number | null>(null)

  const cancelAnimation = () => {
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current)
      animationFrame.current = null
    }
  }

  const getSlides = (track: HTMLDivElement) => {
    const row = track.querySelector('.swipe-track-inner')
    if (!row) return [] as HTMLElement[]
    return Array.from(row.children) as HTMLElement[]
  }

  const getSlideTargets = (slides: HTMLElement[]) => slides.map((slide) => slide.offsetLeft)

  const getIndexForScroll = (targets: number[], scroll: number) => {
    if (targets.length <= 1) return 0

    for (let i = 0; i < targets.length - 1; i += 1) {
      const midpoint = (targets[i] + targets[i + 1]) / 2
      if (scroll < midpoint) return i
    }

    return targets.length - 1
  }

  const animateToIndex = (track: HTMLDivElement, index: number) => {
    const slides = getSlides(track)
    if (!slides.length) return

    const targets = getSlideTargets(slides)
    const clampedIndex = Math.max(0, Math.min(index, slides.length - 1))
    const target = targets[clampedIndex]
    const from = track.scrollLeft
    const distance = target - from

    if (Math.abs(distance) < 1) {
      track.scrollLeft = target
      return
    }

    cancelAnimation()
    track.dataset.animating = 'true'

    const startTime = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / SNAP_MS, 1)
      track.scrollLeft = from + distance * easeOutCubic(progress)

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(step)
        return
      }

      track.scrollLeft = target
      delete track.dataset.animating
      animationFrame.current = null
    }

    animationFrame.current = requestAnimationFrame(step)
  }

  const settleAfterDrag = (track: HTMLDivElement) => {
    const slides = getSlides(track)
    if (!slides.length) return

    const targets = getSlideTargets(slides)
    const scrollStart = scrollLeftStart.current
    const scrollEnd = track.scrollLeft
    const dragDistance = scrollEnd - scrollStart
    const startIndex = getIndexForScroll(targets, scrollStart)
    const step = targets.length > 1 ? targets[1] - targets[0] : slides[0].offsetWidth

    let index: number

    if (Math.abs(dragDistance) >= step * SLIDE_COMMIT_RATIO) {
      index = startIndex + (dragDistance > 0 ? 1 : -1)
    } else {
      index = getIndexForScroll(targets, scrollEnd)
    }

    index = Math.max(0, Math.min(index, slides.length - 1))
    animateToIndex(track, index)
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || event.button !== 0) return

    cancelAnimation()
    delete track.dataset.animating

    isDragging.current = true
    hasDragged.current = false
    activePointerId.current = event.pointerId
    startX.current = event.clientX
    scrollLeftStart.current = track.scrollLeft
    track.setPointerCapture(event.pointerId)
    track.dataset.dragging = 'true'
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!isDragging.current || !track || activePointerId.current !== event.pointerId) return

    const delta = event.clientX - startX.current

    if (Math.abs(delta) > DRAG_THRESHOLD) {
      hasDragged.current = true
      event.preventDefault()
    }

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth)
    track.scrollLeft = Math.max(0, Math.min(scrollLeftStart.current - delta, maxScroll))
  }

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!isDragging.current || !track || activePointerId.current !== event.pointerId) return

    isDragging.current = false
    activePointerId.current = null
    delete track.dataset.dragging

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId)
    }

    if (hasDragged.current) {
      settleAfterDrag(track)
    }
  }

  return (
    <div
      ref={trackRef}
      role="region"
      aria-label="Swipe to browse"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={(event) => {
        if (hasDragged.current) {
          event.preventDefault()
          event.stopPropagation()
          hasDragged.current = false
        }
      }}
      className={`swipe-track -mx-4 cursor-grab select-none overflow-x-auto overscroll-x-contain scroll-pl-6 scroll-pr-4 pb-2 pl-6 pr-4 scrollbar-hide touch-pan-x [&_*]:[webkit-user-drag:none] [&_img]:pointer-events-none ${className}`.trim()}
    >
      <div
        className={`swipe-track-inner flex w-max min-w-full flex-nowrap after:block after:w-4 after:shrink-0 ${gapClassName}`.trim()}
      >
        {children}
      </div>
    </div>
  )
}
