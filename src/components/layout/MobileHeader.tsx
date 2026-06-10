import { useState } from 'react'
import { assets } from '../../data/assets'
import { navLinks } from '../../data/content'
import useHeaderReveal from '../../hooks/useHeaderReveal'
import usePreviewNavigate from '../../hooks/usePreviewNavigate'
import { MenuIcon } from '../ui/NavIcons'
import PreviewLink from './PreviewLink'
import MobileNavDrawer from './MobileNavDrawer'

export default function MobileHeader() {
  const [open, setOpen] = useState(false)
  const headerVisible = useHeaderReveal()
  const previewNavigate = usePreviewNavigate()
  const showHeader = headerVisible || open

  const goHome = () => {
    setOpen(false)
    previewNavigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (href: string) => {
    if (href === '/') {
      goHome()
    }
  }

  return (
    <>
      <header
        className={`mobile-header border-b border-border/50 bg-surface${showHeader ? '' : ' mobile-header--hidden'}`}
      >
        <div className="shell-header-inner mx-auto flex h-14 w-full items-center gap-3 px-4 py-1">
          <PreviewLink
            to="/"
            className="shell-header-logo flex min-w-0 flex-1 items-center"
            onClick={(event) => {
              event.preventDefault()
              goHome()
            }}
          >
            <img
              src={assets.logo}
              alt="Aerostar Aviation Academy"
              className="h-8 w-auto max-w-[132px] object-contain object-left"
            />
          </PreviewLink>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) =>
              link.href === '/' ? (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="desktop-nav__link"
                >
                  {link.label}
                </button>
              ) : (
                <PreviewLink key={link.label} to={link.href} className="desktop-nav__link">
                  {link.label}
                </PreviewLink>
              ),
            )}
          </nav>

          <div className="shell-header-actions flex shrink-0 items-center gap-2">
            <PreviewLink
              to="/apply"
              className="header-cta inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-accent-bright px-4 py-3 text-xs font-semibold uppercase leading-none tracking-wide text-accent-dark"
            >
              Enroll Now
            </PreviewLink>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="mobile-menu-btn inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-navy"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>
      <MobileNavDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}
