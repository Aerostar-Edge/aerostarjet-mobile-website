import { Link, type LinkProps } from 'react-router-dom'
import { usePreview } from '../../hooks/usePreview'

export default function PreviewLink({ to, ...props }: LinkProps) {
  const { withPreview } = usePreview()
  const resolvedTo = typeof to === 'string' ? withPreview(to) : to

  return <Link to={resolvedTo} {...props} />
}
