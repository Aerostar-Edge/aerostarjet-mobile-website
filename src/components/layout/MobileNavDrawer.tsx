import { Link, useNavigate } from 'react-router-dom'
import { CloseIcon } from '../ui/NavIcons'
import { navLinks } from '../../data/content'

type MobileNavDrawerProps = {
  open: boolean
  onClose: () => void
}

export default function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const navigate = useNavigate()

  if (!open) return null

  const goHome = () => {
    onClose()
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <nav className="fixed right-0 top-0 z-50 flex h-full w-[min(320px,85vw)] flex-col bg-surface shadow-2xl">
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
          {navLinks
            .filter((link) => link.label !== 'FAQ')
            .map((link) =>
            link.href === '/' ? (
              <Link
                key={link.label}
                to="/"
                onClick={(event) => {
                  event.preventDefault()
                  goHome()
                }}
                className="flex min-h-12 items-center px-6 text-body font-medium text-navy hover:bg-bg-light"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={onClose}
                className="flex min-h-12 items-center px-6 text-body font-medium text-navy hover:bg-bg-light"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
        <div className="p-4">
          <Link
            to="/apply"
            onClick={onClose}
            className="flex h-10 w-full items-center justify-center whitespace-nowrap rounded-full bg-accent-bright text-xs font-extrabold uppercase leading-none tracking-wide text-accent-dark"
          >
            Enroll Now
          </Link>
        </div>
      </nav>
    </>
  )
}