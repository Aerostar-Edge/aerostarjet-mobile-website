import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { assets } from '../../data/assets'
import { navLinks, isNavLinkActive } from '../../data/content'
import useHeaderReveal from '../../hooks/useHeaderReveal'
import usePreviewNavigate from '../../hooks/usePreviewNavigate'
import { MenuIcon } from '../ui/NavIcons'
import { EnrollCtaLink } from '../ui/EnrollCtaButton'
import PreviewLink from './PreviewLink'
import MobileNavDrawer from './MobileNavDrawer'

export default function MobileHeader() {
  const { pathname } = useLocation()
  const [headerEl, setHeaderEl] = useState<HTMLElement | null>(null)
  const slotRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const headerVisible = useHeaderReveal(headerEl, open)
  const previewNavigate = usePreviewNavigate()
  const showHeader = headerVisible || open

  useLayoutEffect(() => {
    if (!headerEl || !slotRef.current) return

    const syncHeight = () => {
      slotRef.current?.style.setProperty('--mobile-header-height', `${headerEl.offsetHeight}px`)
    }

    syncHeight()

    const observer = new ResizeObserver(syncHeight)
    observer.observe(headerEl)

    return () => observer.disconnect()
  }, [headerEl])

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

  const getDesktopNavClassName = (href: string) =>
    `desktop-nav__link${isNavLinkActive(href, pathname) ? ' desktop-nav__link--active' : ''}`

  return (
    <>
      <div ref={slotRef} className="mobile-header-slot">
        <header
          ref={setHeaderEl}
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
              {navLinks.map((link) => {
                const isActive = isNavLinkActive(link.href, pathname)

                return link.href === '/' ? (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className={getDesktopNavClassName(link.href)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </button>
                ) : (
                  <PreviewLink
                    key={link.label}
                    to={link.href}
                    className={getDesktopNavClassName(link.href)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </PreviewLink>
                )
              })}
            </nav>

            <div className="shell-header-actions flex shrink-0 items-center gap-2">
              <EnrollCtaLink to="/apply">Enroll Now</EnrollCtaLink>
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
      </div>
      <MobileNavDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}
