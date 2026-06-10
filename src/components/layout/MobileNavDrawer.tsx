import usePreviewNavigate from '../../hooks/usePreviewNavigate'
import { CloseIcon } from '../ui/NavIcons'
import { navLinks } from '../../data/content'
import PreviewLink from './PreviewLink'

type MobileNavDrawerProps = {
  open: boolean
  onClose: () => void
}

export default function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const previewNavigate = usePreviewNavigate()

  if (!open) return null

  const goHome = () => {
    onClose()
    previewNavigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div
        className="mobile-nav-backdrop fixed inset-0 z-[65] bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <nav className="mobile-nav-drawer fixed right-0 top-0 z-[70] flex h-full w-[min(320px,85vw)] flex-col bg-surface shadow-2xl">
        <div className="flex min-h-12 items-center justify-between border-b border-border px-4">
          <span className="text-body-sm font-semibold text-navy">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-12 items-center justify-center rounded-lg text-navy"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex flex-1 flex-col py-2">
          {navLinks.map((link) => {
            if (link.href === '/') {
              return (
                <PreviewLink
                  key={link.label}
                  to="/"
                  onClick={(event) => {
                    event.preventDefault()
                    goHome()
                  }}
                  className="flex min-h-12 items-center px-6 text-body font-medium text-navy hover:bg-bg-light"
                >
                  {link.label}
                </PreviewLink>
              )
            }

            return (
              <PreviewLink
                key={link.label}
                to={link.href}
                onClick={onClose}
                className="flex min-h-12 items-center px-6 text-body font-medium text-navy hover:bg-bg-light"
              >
                {link.label}
              </PreviewLink>
            )
          })}
        </div>
        <div className="p-4">
          <PreviewLink
            to="/apply"
            onClick={onClose}
            className="flex w-full items-center justify-center whitespace-nowrap rounded-full bg-accent-bright px-4 py-2 text-xs font-extrabold uppercase leading-none tracking-wide text-accent-dark"
          >
            Enroll Now
          </PreviewLink>
        </div>
      </nav>
    </>
  )
}
