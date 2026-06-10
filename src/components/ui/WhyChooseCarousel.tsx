import { useEffect, useRef, useState, type PointerEvent } from 'react'
import type { WhyChooseItem } from '../../data/content'

const SNAP_MS = 360
const DRAG_THRESHOLD = 4
const SLIDE_COMMIT_RATIO = 0.12
const SCROLL_SETTLE_MS = 120

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

type WhyChooseCardProps = {
  item: WhyChooseItem
  className?: string
  compact?: boolean
}

function WhyChooseCard({ item, className = '', compact = false }: WhyChooseCardProps) {
  return (
    <article
      className={`why-choose-card overflow-visible rounded-2xl border border-white/16 bg-white/8 ${
        compact ? 'space-y-2.5 p-4' : 'space-y-3 p-6'
      } ${className}`.trim()}
    >
      <div
        className={`flex items-center justify-center rounded-xl bg-accent ${
          compact ? 'size-11' : 'size-14 rounded-2xl'
        }`}
      >
        <img alt="" className={compact ? 'size-5' : 'size-6'} aria-hidden src={item.icon} />
      </div>
      <h4
        className={`font-bold text-surface ${
          compact ? 'text-sm leading-snug' : 'text-heading-md'
        }`}
      >
        {item.title[0]}
        <br />
        {item.title[1]}
      </h4>
      <p className={`text-white/82 ${compact ? 'text-[11px] leading-relaxed' : 'text-description'}`}>
        {item.description}
      </p>
    </article>
  )
}

function getSlides(scroller: HTMLDivElement) {
  const row = scroller.querySelector('.why-choose-track-inner')
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

function getIndexForScroll(targets: number[], scroll: number) {
  if (targets.length <= 1) return 0

  let activeIndex = 0
  let minDistance = Infinity

  targets.forEach((target, index) => {
    const distance = Math.abs(target - scroll)
    if (distance < minDistance) {
      minDistance = distance
      activeIndex = index
    }
  })

  return activeIndex
}

function getActiveIndex(scroller: HTMLDivElement) {
  const slides = getSlides(scroller)
  const targets = getSlideTargets(scroller, slides)
  if (!targets.length) return 0
  return getIndexForScroll(targets, scroller.scrollLeft)
}

type WhyChooseCarouselProps = {
  items: WhyChooseItem[]
}

export default function WhyChooseCarousel({ items }: WhyChooseCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
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

  const animateToIndex = (scroller: HTMLDivElement, index: number) => {
    const slides = getSlides(scroller)
    if (!slides.length) return

    const clampedIndex = Math.max(0, Math.min(index, slides.length - 1))
    const target = getSlideScrollTarget(scroller, slides[clampedIndex])
    const from = scroller.scrollLeft
    const distance = target - from

    if (Math.abs(distance) < 1) {
      scroller.scrollLeft = target
      setActiveIndex(clampedIndex)
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
      setActiveIndex(clampedIndex)
    }

    animationFrame.current = requestAnimationFrame(step)
  }

  const snapToNearest = (scroller: HTMLDivElement) => {
    if (scroller.dataset.animating === 'true' || scroller.dataset.dragging === 'true') return

    const slides = getSlides(scroller)
    if (!slides.length) return

    const index = getActiveIndex(scroller)
    const target = getSlideScrollTarget(scroller, slides[index])

    if (Math.abs(scroller.scrollLeft - target) > 1) {
      animateToIndex(scroller, index)
      return
    }

    setActiveIndex(index)
  }

  const settleAfterDrag = (scroller: HTMLDivElement) => {
    const slides = getSlides(scroller)
    if (!slides.length) return

    const targets = getSlideTargets(scroller, slides)
    const scrollStart = scrollLeftStart.current
    const scrollEnd = scroller.scrollLeft
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
    setActiveIndex(0)

    let settleTimeout: ReturnType<typeof setTimeout> | undefined

    const onScroll = () => {
      if (scroller.dataset.animating === 'true') return
      setActiveIndex(getActiveIndex(scroller))
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

    const onResize = () => {
      snapToNearest(scroller)
    }

    onScroll()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    scroller.addEventListener('scroll', scheduleSnap, { passive: true })
    scroller.addEventListener('scrollend', onScrollEnd)
    window.addEventListener('resize', onResize)

    return () => {
      if (settleTimeout) clearTimeout(settleTimeout)
      scroller.removeEventListener('scroll', onScroll)
      scroller.removeEventListener('scroll', scheduleSnap)
      scroller.removeEventListener('scrollend', onScrollEnd)
      window.removeEventListener('resize', onResize)
      cancelAnimation()
    }
  }, [items.length])

  const loop = [...items, ...items]

  return (
    <>
      <div className="why-choose-carousel-wrap">
        <div className="overflow-x-hidden">
          <div
            ref={scrollRef}
            role="region"
            aria-label="Why choose Aerostar features"
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
            className="why-choose-carousel w-full min-w-0 cursor-grab overflow-x-auto overscroll-x-contain scroll-pl-5 pl-5 scrollbar-hide touch-pan-x select-none [&_*]:[webkit-user-drag:none] [&_img]:pointer-events-none"
          >
            <div className="why-choose-track-inner flex w-max flex-nowrap gap-4 pr-5 after:block after:w-5 after:shrink-0">
              {items.map((item) => (
                <WhyChooseCard
                  key={item.title.join(' ')}
                  item={item}
                  compact
                  className="w-[calc(100vw-4.5rem)] max-w-[330px] shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className="mt-4 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Feature carousel pagination"
        >
          {items.map((item, index) => (
            <span
              key={item.title.join(' ')}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Feature ${index + 1} of ${items.length}`}
              className={`size-2 rounded-full transition-colors ${
                index === activeIndex ? 'bg-[#FFC629]' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="why-choose-marquee-wrap overflow-hidden">
        <div className="why-choose-marquee-track">
          <div className="scroll-row animate-why-choose-marquee flex w-max flex-nowrap gap-4 px-4">
            {loop.map((item, index) => (
              <WhyChooseCard
                key={`${item.title.join(' ')}-${index}`}
                item={item}
                compact
                className="why-choose-marquee-card w-[17rem] max-w-[17rem] shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
