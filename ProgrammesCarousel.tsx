import { Link } from 'react-router-dom'
import { useEffect, useRef, type PointerEvent } from 'react'
import type { Course } from '../../data/content'

const SNAP_MS = 360
const DRAG_THRESHOLD = 4
const SLIDE_COMMIT_RATIO = 0.12
const SCROLL_SETTLE_MS = 120
const CARDS_PER_VIEW = 2
const CARD_GAP_PX = 12

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

function getSlides(scroller: HTMLDivElement) {
  const row = scroller.querySelector('.programmes-track-inner')
  if (!row) return [] as HTMLElement[]
  return Array.from(row.querySelectorAll('article'))
}

function getSlideScrollTarget(scroller: HTMLDivElement, slide: HTMLElement) {
  const paddingLeft = Number.parseFloat(getComputedStyle(scroller).paddingLeft) || 0
  const slideRect = slide.getBoundingClientRect()
  const scrollerRect = scroller.getBoundingClientRect()
  return scroller.scrollLeft + (slideRect.left - scrollerRect.left - paddingLeft)
}

function getSlideTargets(scroller: HTMLDivElement, slides: HTMLElement[]) {
  return slides.map((slide) => getSlideScrollTarget(scroller, slide))
}

function getSnapStartIndex(index: number, slideCount: number) {
  const maxStart = Math.max(0, slideCount - CARDS_PER_VIEW)
  const snapped = Math.round(index / CARDS_PER_VIEW) * CARDS_PER_VIEW
  return Math.max(0, Math.min(snapped, maxStart))
}

function getActiveSnapIndex(scroller: HTMLDivElement) {
  const slides = getSlides(scroller)
  const targets = getSlideTargets(scroller, slides)
  if (!targets.length) return 0

  let nearestIndex = 0
  let minDistance = Infinity

  targets.forEach((target, index) => {
    const distance = Math.abs(target - scroller.scrollLeft)
    if (distance < minDistance) {
      minDistance = distance
      nearestIndex = index
    }
  })

  return getSnapStartIndex(nearestIndex, slides.length)
}

type ProgrammeCardProps = {
  course: Course
}

function ProgrammeCard({ course }: ProgrammeCardProps) {
  return (
    <article className="programme-card flex h-full w-[var(--programme-card-width,175px)] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
      <div className="programme-card__media">
        <img alt={course.title} className="programme-card__image" src={course.image} />
      </div>
      <div className="programme-card__body flex flex-1 flex-col p-4">
        <div className="flex w-full flex-col gap-2">
          <p className="programme-card__code text-[10px] font-extrabold uppercase tracking-wider text-primary">
            {course.code ?? ''}
          </p>
          <h3 className="programme-card__title text-xs font-bold leading-tight text-navy-deep">
            {course.title}
          </h3>
          <p className="programme-card__meta leading-snug text-muted">
            {course.duration} · {course.schedule}
          </p>
        </div>
        <div className="mt-auto pt-4">
          <Link to={`/courses/${course.id}`} className="programme-card__cta">
            View Course
          </Link>
        </div>
      </div>
    </article>
  )
}

type ProgrammesCarouselProps = {
  courses: Course[]
}

export default function ProgrammesCarousel({ courses }: ProgrammesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
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

  const updateCardWidth = (scroller: HTMLDivElement) => {
    const paddingLeft = Number.parseFloat(getComputedStyle(scroller).paddingLeft) || 0
    const cardWidth = (scroller.clientWidth - paddingLeft - CARD_GAP_PX) / CARDS_PER_VIEW
    scroller.style.setProperty('--programme-card-width', `${Math.max(cardWidth, 0)}px`)
  }

  const animateToIndex = (scroller: HTMLDivElement, index: number) => {
    const slides = getSlides(scroller)
    if (!slides.length) return

    const snapIndex = getSnapStartIndex(index, slides.length)
    const target = getSlideScrollTarget(scroller, slides[snapIndex])
    const from = scroller.scrollLeft
    const distance = target - from

    if (Math.abs(distance) < 1) {
      scroller.scrollLeft = target
      return
    }

    cancelAnimation()
    scroller.dataset.animating = 'true'

    const startTime = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / SNAP_MS, 1)
      scroller.scrollLeft = from + distance * easeOutCubic(progress)

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(step)
        return
      }

      scroller.scrollLeft = target
      delete scroller.dataset.animating
      animationFrame.current = null
    }

    animationFrame.current = requestAnimationFrame(step)
  }

  const snapToNearest = (scroller: HTMLDivElement) => {
    if (scroller.dataset.animating === 'true' || scroller.dataset.dragging === 'true') return

    const slides = getSlides(scroller)
    if (!slides.length) return

    const snapIndex = getActiveSnapIndex(scroller)
    const target = getSlideScrollTarget(scroller, slides[snapIndex])

    if (Math.abs(scroller.scrollLeft - target) > 1) {
      animateToIndex(scroller, snapIndex)
    }
  }

  const settleAfterDrag = (scroller: HTMLDivElement) => {
    const slides = getSlides(scroller)
    if (!slides.length) return

    const targets = getSlideTargets(scroller, slides)
    const scrollStart = scrollLeftStart.current
    const scrollEnd = scroller.scrollLeft
    const dragDistance = scrollEnd - scrollStart

    let nearestAtStart = 0
    let minDistance = Infinity
    targets.forEach((target, index) => {
      const distance = Math.abs(target - scrollStart)
      if (distance < minDistance) {
        minDistance = distance
        nearestAtStart = index
      }
    })

    const startIndex = getSnapStartIndex(nearestAtStart, slides.length)
    const step =
      targets.length > CARDS_PER_VIEW ? targets[CARDS_PER_VIEW] - targets[0] : slides[0].offsetWidth

    let index = startIndex

    if (Math.abs(dragDistance) >= step * SLIDE_COMMIT_RATIO) {
      index = startIndex + (dragDistance > 0 ? CARDS_PER_VIEW : -CARDS_PER_VIEW)
    } else {
      index = getActiveSnapIndex(scroller)
    }

    animateToIndex(scroller, index)
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollRef.current
    if (!scroller || event.button !== 0) return

    cancelAnimation()
    delete scroller.dataset.animating

    isDragging.current = true
    hasDragged.current = false
    activePointerId.current = event.pointerId
    startX.current = event.clientX
    scrollLeftStart.current = scroller.scrollLeft
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollRef.current
    if (!isDragging.current || !scroller || activePointerId.current !== event.pointerId) return

    const delta = event.clientX - startX.current

    if (Math.abs(delta) <= DRAG_THRESHOLD) return

    if (!hasDragged.current) {
      hasDragged.current = true
      scroller.setPointerCapture(event.pointerId)
      scroller.dataset.dragging = 'true'
    }

    event.preventDefault()

    const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth)
    scroller.scrollLeft = Math.max(0, Math.min(scrollLeftStart.current - delta, maxScroll))
  }

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollRef.current
    if (!isDragging.current || !scroller || activePointerId.current !== event.pointerId) return

    isDragging.current = false
    activePointerId.current = null
    delete scroller.dataset.dragging

    if (scroller.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId)
    }

    if (hasDragged.current) {
      settleAfterDrag(scroller)
    }
  }

  useEffect(() => {
    const scroller = scrollRef.current
    if (!scroller) return

    scroller.scrollLeft = 0

    let settleTimeout: ReturnType<typeof setTimeout> | undefined

    const onResize = () => {
      updateCardWidth(scroller)
      snapToNearest(scroller)
    }

    const scheduleSnap = () => {
      if (scroller.dataset.animating === 'true' || scroller.dataset.dragging === 'true') return
      if (settleTimeout) clearTimeout(settleTimeout)
      settleTimeout = setTimeout(() => snapToNearest(scroller), SCROLL_SETTLE_MS)
    }

    const onScrollEnd = () => {
      if (settleTimeout) clearTimeout(settleTimeout)
      snapToNearest(scroller)
    }

    updateCardWidth(scroller)

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(scroller)

    scroller.addEventListener('scroll', scheduleSnap, { passive: true })
    scroller.addEventListener('scrollend', onScrollEnd)

    return () => {
      if (settleTimeout) clearTimeout(settleTimeout)
      resizeObserver.disconnect()
      scroller.removeEventListener('scroll', scheduleSnap)
      scroller.removeEventListener('scrollend', onScrollEnd)
      cancelAnimation()
    }
  }, [courses.length])

  return (
    <div className="-mx-4 overflow-x-hidden text-left">
      <div
        ref={scrollRef}
        role="region"
        aria-label="Programme courses"
        aria-roledescription="carousel"
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
        className="programmes-carousel w-full min-w-0 cursor-grab overflow-x-auto overscroll-x-contain scroll-pl-5 pl-5 scrollbar-hide touch-pan-x select-none [&_*]:[webkit-user-drag:none] [&_img]:pointer-events-none"
      >
        <div className="programmes-track-inner flex w-max flex-nowrap items-stretch gap-3">
          {courses.map((course) => (
            <ProgrammeCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  )
}
