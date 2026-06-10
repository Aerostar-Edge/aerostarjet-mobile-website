import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  PREVIEW_WIDTHS,
  appendPreviewParams,
  clearPreviewStorage,
  getPreviewBreakpoint,
  readPreviewStorage,
  writePreviewStorage,
  type PreviewBreakpoint,
} from '../utils/preview'

const DEFAULT_WIDTH = PREVIEW_WIDTHS.mobile

export function usePreview() {
  const [searchParams, setSearchParams] = useSearchParams()
  const storedPreview = readPreviewStorage()

  const urlPreview = searchParams.get('preview') === 'true'
  const isPreview = urlPreview || Boolean(storedPreview?.active)

  const previewWidth = useMemo(() => {
    if (urlPreview) {
      return Number(searchParams.get('w') ?? DEFAULT_WIDTH)
    }
    return storedPreview?.width ?? DEFAULT_WIDTH
  }, [searchParams, storedPreview?.width, urlPreview])

  const activeBreakpoint = useMemo(
    () => getPreviewBreakpoint(previewWidth),
    [previewWidth],
  )

  const persistPreview = useCallback(
    (width: number) => {
      writePreviewStorage({ active: true, width })
    },
    [],
  )

  const setPreviewWidth = useCallback(
    (width: number) => {
      const next = new URLSearchParams(searchParams)
      next.set('preview', 'true')
      next.set('w', String(width))
      setSearchParams(next, { replace: true })
      persistPreview(width)
    },
    [persistPreview, searchParams, setSearchParams],
  )

  const enablePreview = useCallback(
    (width = DEFAULT_WIDTH) => {
      setPreviewWidth(width)
    },
    [setPreviewWidth],
  )

  const exitPreview = useCallback(() => {
    clearPreviewStorage()
    const next = new URLSearchParams(searchParams)
    next.delete('preview')
    next.delete('w')
    setSearchParams(next, { replace: true })
  }, [searchParams, setSearchParams])

  const withPreview = useCallback(
    (path: string) => {
      if (!isPreview) return path
      return appendPreviewParams(path, previewWidth)
    },
    [isPreview, previewWidth],
  )

  const setPreviewBreakpoint = useCallback(
    (breakpoint: PreviewBreakpoint) => {
      setPreviewWidth(PREVIEW_WIDTHS[breakpoint])
    },
    [setPreviewWidth],
  )

  const restorePreviewInUrl = useCallback(() => {
    if (urlPreview) {
      const width = Number(searchParams.get('w') ?? DEFAULT_WIDTH)

      if (!searchParams.get('w')) {
        const next = new URLSearchParams(searchParams)
        next.set('w', String(DEFAULT_WIDTH))
        setSearchParams(next, { replace: true })
      }

      persistPreview(width)
      return
    }

    const stored = readPreviewStorage()
    if (!stored?.active) return

    const next = new URLSearchParams(searchParams)
    next.set('preview', 'true')
    next.set('w', String(stored.width))
    setSearchParams(next, { replace: true })
  }, [persistPreview, searchParams, setSearchParams, urlPreview])

  return {
    activeBreakpoint,
    enablePreview,
    exitPreview,
    isPreview,
    previewWidth,
    restorePreviewInUrl,
    setPreviewBreakpoint,
    setPreviewWidth,
    withPreview,
  }
}
