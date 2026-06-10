import { useEffect, useLayoutEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { usePreview } from '../../hooks/usePreview'
import PreviewBar from './PreviewBar'

type PreviewShellProps = {
  children: ReactNode
}

export default function PreviewShell({ children }: PreviewShellProps) {
  const location = useLocation()
  const { isPreview, previewWidth, restorePreviewInUrl } = usePreview()

  useLayoutEffect(() => {
    restorePreviewInUrl()
  }, [location.pathname, location.search, restorePreviewInUrl])

  useEffect(() => {
    if (!isPreview) {
      delete document.documentElement.dataset.preview
      delete document.documentElement.dataset.previewWidth
      return
    }

    document.documentElement.dataset.preview = 'true'
    document.documentElement.dataset.previewWidth = String(previewWidth)
  }, [isPreview, previewWidth])

  if (!isPreview) {
    return children
  }

  return (
    <div className="preview-canvas">
      <PreviewBar />
      <div
        className="preview-frame"
        style={{ width: '100%', maxWidth: `${previewWidth}px` }}
      >
        {children}
      </div>
    </div>
  )
}
