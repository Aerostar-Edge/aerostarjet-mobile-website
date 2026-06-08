import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../data/assets'
import { MenuIcon } from '../ui/NavIcons'
import MobileNavDrawer from './MobileNavDrawer'

export default function MobileHeader() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const goHome = () => {
    setOpen(false)
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border/50 bg-surface">
        <div className="mx-auto flex h-14 max-w-[390px] items-center gap-3 px-4">
          <Link
            to="/"
            className="flex min-w-0 flex-1 items-center"
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
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/apply"
              className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-accent-bright px-4 text-xs font-semibold uppercase leading-none tracking-wide text-accent-dark"
            >
              Enroll Now
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-navy"
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