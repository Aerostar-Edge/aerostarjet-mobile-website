export const PREVIEW_STORAGE_KEY = 'aerostar-preview'

export const PREVIEW_WIDTHS = {
  mobile: 375,
  tablet: 768,
  desktop: 1200,
} as const

export type PreviewBreakpoint = keyof typeof PREVIEW_WIDTHS

export type PreviewStorageState = {
  active: boolean
  width: number
}

export function readPreviewStorage(): PreviewStorageState | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = sessionStorage.getItem(PREVIEW_STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as PreviewStorageState
    if (!parsed.active || !parsed.width) return null
    return parsed
  } catch {
    return null
  }
}

export function writePreviewStorage(state: PreviewStorageState) {
  sessionStorage.setItem(PREVIEW_STORAGE_KEY, JSON.stringify(state))
}

export function clearPreviewStorage() {
  sessionStorage.removeItem(PREVIEW_STORAGE_KEY)
}

export function appendPreviewParams(path: string, width: number) {
  const hashIndex = path.indexOf('#')
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : ''
  const pathWithoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path
  const [pathname, search = ''] = pathWithoutHash.split('?')
  const params = new URLSearchParams(search)

  params.set('preview', 'true')
  params.set('w', String(width))

  const query = params.toString()
  return `${pathname}${query ? `?${query}` : ''}${hash}`
}

export function getPreviewBreakpoint(width: number): PreviewBreakpoint {
  if (width >= PREVIEW_WIDTHS.desktop) return 'desktop'
  if (width >= PREVIEW_WIDTHS.tablet) return 'tablet'
  return 'mobile'
}
