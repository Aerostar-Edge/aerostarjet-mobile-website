import { useLayoutEffect, useRef, type RefObject } from 'react'

const ROW_TOLERANCE_PX = 2
const MIN_GAP_PX = 4
const GRID_STEP_PX = 4

function getFlexChildren(container: HTMLElement) {
  return [...container.children].filter((child): child is HTMLElement => child instanceof HTMLElement)
}

function countOnLastRow(container: HTMLElement) {
  const children = getFlexChildren(container)
  if (children.length === 0) return 0

  const lastTop = children[children.length - 1].offsetTop
  return children.filter((child) => Math.abs(child.offsetTop - lastTop) <= ROW_TOLERANCE_PX).length
}

function hasOrphan(container: HTMLElement) {
  const childCount = getFlexChildren(container).length
  if (childCount <= 1) return false

  return countOnLastRow(container) === 1
}

function readGapPx(container: HTMLElement) {
  const styles = getComputedStyle(container)
  const gap = Number.parseFloat(styles.columnGap || styles.gap)
  return Number.isFinite(gap) && gap > 0 ? gap : MIN_GAP_PX
}

function clearBalancedLayout(container: HTMLElement) {
  container.style.removeProperty('gap')
  container.style.removeProperty('max-width')
  container.style.removeProperty('margin-inline')
}

function applyBalancedLayout(container: HTMLElement, gap: number, maxWidth?: number) {
  container.style.gap = `${gap}px`

  if (maxWidth !== undefined) {
    container.style.maxWidth = `${maxWidth}px`
    container.style.marginInline = 'auto'
    return
  }

  container.style.removeProperty('max-width')
  container.style.removeProperty('margin-inline')
}

function buildWidthCandidates(baseWidth: number, parentWidth: number) {
  const minWidth = Math.max(240, Math.round(Math.min(baseWidth, parentWidth) * 0.45))
  const maxWidth = Math.max(baseWidth, parentWidth)
  const widths = new Set<number>()

  for (let width = minWidth; width <= maxWidth; width += GRID_STEP_PX) {
    widths.add(width)
  }

  widths.add(baseWidth)
  widths.add(parentWidth)

  return [...widths].sort((left, right) => Math.abs(left - baseWidth) - Math.abs(right - baseWidth))
}

function balanceFlexWrap(container: HTMLElement) {
  clearBalancedLayout(container)

  if (!hasOrphan(container)) return

  const baseGap = readGapPx(container)
  const baseWidth = container.clientWidth
  const parentWidth = container.parentElement?.clientWidth ?? baseWidth
  const widthCandidates = buildWidthCandidates(baseWidth, parentWidth)

  for (const width of widthCandidates) {
    const maxWidth = width >= parentWidth ? undefined : width

    for (let gap = baseGap; gap >= MIN_GAP_PX; gap -= GRID_STEP_PX) {
      applyBalancedLayout(container, gap, maxWidth)
      if (!hasOrphan(container)) return
    }
  }

  clearBalancedLayout(container)
}

export function useNoOrphanFlexWrap<T extends HTMLElement>(itemCount: number): RefObject<T | null> {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const container = ref.current
    if (!container) return

    const run = () => {
      balanceFlexWrap(container)
    }

    run()

    const observer = new ResizeObserver(() => {
      run()
    })

    observer.observe(container)

    const parent = container.parentElement
    if (parent) observer.observe(parent)

    return () => observer.disconnect()
  }, [itemCount])

  return ref
}