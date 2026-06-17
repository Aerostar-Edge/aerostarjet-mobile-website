import { useCallback } from 'react'
import { useNavigate, type NavigateOptions } from 'react-router-dom'
import { usePreview } from './usePreview'

export default function usePreviewNavigate() {
  const navigate = useNavigate()
  const { isPreview, withPreview } = usePreview()

  return useCallback(
    (to: string, options?: NavigateOptions) => {
      navigate(isPreview ? withPreview(to) : to, options)
    },
    [isPreview, navigate, withPreview],
  )
}
