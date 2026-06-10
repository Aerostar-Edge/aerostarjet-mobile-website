import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const TOP_OFFSET = 16

function getScrollY() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}

const DESKTOP_BREAKPOINT = 1200

function isDesktopViewport() {
  return window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`).matches
}

export default function useHeaderReveal() {
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const lastTouchY = useRef(0)
  const { pathname } = useLocation()

  useEffect(() => {
    setVisible(true)
    lastScrollY.current = getScrollY()
  }, [pathname])

  useEffect(() => {
    const desktopQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)

    const updateFromScroll = () => {
      if (isDesktopViewport()) {
        setVisible(true)
        return
      }
      const currentScrollY = getScrollY()

      if (currentScrollY <= TOP_OFFSET) {
        setVisible(true)
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false)
      } else if (currentScrollY < lastScrollY.current) {
        setVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    const onDesktopChange = () => {
      if (desktopQuery.matches) setVisible(true)
    }

    const onWheel = (event: WheelEvent) => {
      if (isDesktopViewport()) return
      if (getScrollY() <= TOP_OFFSET) {
        setVisible(true)
        return
      }

      if (event.deltaY > 0) {
        setVisible(false)
      } else if (event.deltaY < 0) {
        setVisible(true)
      }
    }

    const onTouchStart = (event: TouchEvent) => {
      lastTouchY.current = event.touches[0]?.clientY ?? 0
    }

    const onTouchMove = (event: TouchEvent) => {
      if (isDesktopViewport()) return
      const touchY = event.touches[0]?.clientY ?? lastTouchY.current
      const delta = lastTouchY.current - touchY

      if (getScrollY() <= TOP_OFFSET) {
        setVisible(true)
      } else if (delta > 4) {
        setVisible(false)
      } else if (delta < -4) {
        setVisible(true)
      }

      lastTouchY.current = touchY
    }

    lastScrollY.current = getScrollY()
    updateFromScroll()

    window.addEventListener('scroll', updateFromScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    desktopQuery.addEventListener('change', onDesktopChange)

    return () => {
      window.removeEventListener('scroll', updateFromScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      desktopQuery.removeEventListener('change', onDesktopChange)
    }
  }, [])

  return visible
}