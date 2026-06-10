import { useEffect, useMemo, useState } from 'react'

type GalleryImage = {
  src: string
  alt: string
}

type FrameVariant = 'square' | 'portrait' | 'landscape' | 'tall'

type PlacedImage = {
  image: GalleryImage
  frame: FrameVariant
  index: number
}

type InfrastructureMasonryGalleryProps = {
  images: readonly GalleryImage[]
}

const frameVariants: FrameVariant[] = ['square', 'portrait', 'landscape', 'tall']

const preferredFrameVariants: FrameVariant[] = [
  'square',
  'portrait',
  'landscape',
  'tall',
  'landscape',
  'square',
  'portrait',
  'landscape',
  'tall',
]

const frameHeight: Record<FrameVariant, number> = {
  square: 1,
  portrait: 4 / 3,
  landscape: 3 / 4,
  tall: 3 / 2,
}

const FRAME_CHANGE_PENALTY = 0.4

function getEffectiveWidth() {
  if (typeof window === 'undefined') return 375

  const previewWidth = document.documentElement.dataset.previewWidth
  if (document.documentElement.dataset.preview === 'true' && previewWidth) {
    return Number(previewWidth)
  }

  return window.innerWidth
}

function getColumnCount(width = getEffectiveWidth()) {
  if (width >= 1200) return 4
  if (width >= 768) return 3
  return 2
}

function isMobileGalleryLayout(width = getEffectiveWidth()) {
  return width < 768
}

function buildBalancedColumns(
  images: readonly GalleryImage[],
  columnCount: number,
): PlacedImage[][] {
  const columns: PlacedImage[][] = Array.from({ length: columnCount }, () => [])
  const heights = Array(columnCount).fill(0)

  images.forEach((image, index) => {
    const preferredFrame = preferredFrameVariants[index % preferredFrameVariants.length]
    let bestColumn = 0
    let bestFrame: FrameVariant = preferredFrame
    let bestScore = Infinity

    for (let column = 0; column < columnCount; column += 1) {
      for (const frame of frameVariants) {
        const nextHeights = heights.map((height, col) =>
          col === column ? height + frameHeight[frame] : height,
        )
        const spread = Math.max(...nextHeights) - Math.min(...nextHeights)
        const score = spread + (frame === preferredFrame ? 0 : FRAME_CHANGE_PENALTY)

        if (
          score < bestScore ||
          (score === bestScore && column < bestColumn) ||
          (score === bestScore && column === bestColumn && frame === preferredFrame)
        ) {
          bestScore = score
          bestColumn = column
          bestFrame = frame
        }
      }
    }

    columns[bestColumn].push({ image, frame: bestFrame, index })
    heights[bestColumn] += frameHeight[bestFrame]
  })

  return columns
}

export default function InfrastructureMasonryGallery({ images }: InfrastructureMasonryGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [layoutWidth, setLayoutWidth] = useState(getEffectiveWidth)
  const columnCount = getColumnCount(layoutWidth)
  const useMobileGallery = isMobileGalleryLayout(layoutWidth)

  useEffect(() => {
    const updateLayout = () => setLayoutWidth(getEffectiveWidth())

    window.addEventListener('resize', updateLayout)

    const observer = new MutationObserver(updateLayout)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-preview', 'data-preview-width'],
    })

    return () => {
      window.removeEventListener('resize', updateLayout)
      observer.disconnect()
    }
  }, [])

  const columns = useMemo(
    () => buildBalancedColumns(images, columnCount),
    [images, columnCount],
  )

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) =>
          index === null ? null : (index - 1 + images.length) % images.length,
        )
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((index) => (index === null ? null : (index + 1) % images.length))
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, images.length])

  const activeImage = activeIndex === null ? null : images[activeIndex]

  return (
    <>
      {useMobileGallery ? (
        <div className="infrastructure-masonry infrastructure-masonry--mobile-grid">
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className="infrastructure-masonry__item block w-full cursor-pointer border-0 bg-transparent p-0"
              onClick={() => setActiveIndex(index)}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </button>
          ))}
        </div>
      ) : (
        <div className="infrastructure-masonry">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="infrastructure-masonry__column">
              {column.map(({ image, frame, index }) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  className="infrastructure-masonry__item block w-full cursor-pointer border-0 bg-transparent p-0"
                  onClick={() => setActiveIndex(index)}
                >
                  <div className={`infrastructure-masonry__frame infrastructure-masonry__frame--${frame}`}>
                    <img src={image.src} alt={image.alt} loading="lazy" />
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {activeImage && activeIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/92 p-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            aria-label="Close image preview"
            className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-white/12 text-lg text-surface"
            onClick={() => setActiveIndex(null)}
          >
            {'\u2715'}
          </button>

          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-3 inline-flex size-10 items-center justify-center rounded-full bg-white/12 text-lg text-surface"
            onClick={(event) => {
              event.stopPropagation()
              setActiveIndex((index) =>
                index === null ? null : (index - 1 + images.length) % images.length,
              )
            }}
          >
            {'\u2190'}
          </button>

          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="max-h-[85vh] max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />

          <button
            type="button"
            aria-label="Next image"
            className="absolute right-3 inline-flex size-10 items-center justify-center rounded-full bg-white/12 text-lg text-surface"
            onClick={(event) => {
              event.stopPropagation()
              setActiveIndex((index) => (index === null ? null : (index + 1) % images.length))
            }}
          >
            {'\u2192'}
          </button>
        </div>
      ) : null}
    </>
  )
}
