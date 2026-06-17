import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const HIDE_SCROLL_THRESHOLD = 10

function getScrollY() {
  return Math.max(0, window.scrollY || document.documentElement.scrollTop || 0)
}

function isPageScrollable() {
  return document.documentElement.scrollHeight > window.innerHeight + 1
}

export default function useHeaderReveal(headerElement: HTMLElement | null, menuOpen = false) {
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const menuOpenRef = useRef(menuOpen)
  const { pathname } = useLocation()

  menuOpenRef.current = menuOpen

  useEffect(() => {
    setVisible(true)
    lastScrollY.current = getScrollY()
  }, [pathname])

  useEffect(() => {
    if (menuOpen) {
      setVisible(true)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!headerElement) return

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const getTopThreshold = () => headerElement.offsetHeight

    const applyScrollDirection = (currentScrollY: number) => {
      const topThreshold = getTopThreshold()

      if (currentScrollY <= topThreshold) {
        setVisible(true)
        lastScrollY.current = currentScrollY
        return
      }

      const delta = currentScrollY - lastScrollY.current

      if (delta > HIDE_SCROLL_THRESHOLD) {
        setVisible(false)
      } else if (delta < 0) {
        setVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    const update = () => {
      ticking.current = false

      if (menuOpenRef.current || reducedMotionQuery.matches) {
        setVisible(true)
        lastScrollY.current = getScrollY()
        return
      }

      if (!isPageScrollable()) {
        setVisible(true)
        lastScrollY.current = getScrollY()
        return
      }

      applyScrollDirection(getScrollY())
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(update)
    }

    const onWheel = (event: WheelEvent) => {
      if (menuOpenRef.current || reducedMotionQuery.matches) return

      const currentScrollY = getScrollY()
      const topThreshold = getTopThreshold()

      if (currentScrollY <= topThreshold) {
        setVisible(true)
        return
      }

      if (event.deltaY > 0) {
        setVisible(false)
      } else if (event.deltaY < 0) {
        setVisible(true)
      }
    }

    let touchStartY = 0

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const onTouchMove = (event: TouchEvent) => {
      if (menuOpenRef.current || reducedMotionQuery.matches) return

      const touchY = event.touches[0]?.clientY ?? touchStartY
      const delta = touchStartY - touchY
      const currentScrollY = getScrollY()
      const topThreshold = getTopThreshold()

      if (currentScrollY <= topThreshold) {
        setVisible(true)
      } else if (delta > 6) {
        setVisible(false)
      } else if (delta < -2) {
        setVisible(true)
      }

      touchStartY = touchY
    }

    const onFocusIn = () => {
      setVisible(true)
    }

    const onReducedMotionChange = () => {
      update()
    }

    lastScrollY.current = getScrollY()
    update()

    const scrollOptions: AddEventListenerOptions = { passive: true }

    window.addEventListener('scroll', onScroll, scrollOptions)
    window.addEventListener('wheel', onWheel, scrollOptions)
    window.addEventListener('touchstart', onTouchStart, scrollOptions)
    window.addEventListener('touchmove', onTouchMove, scrollOptions)
    headerElement.addEventListener('focusin', onFocusIn)
    reducedMotionQuery.addEventListener('change', onReducedMotionChange)

    return () => {
      window.removeEventListener('scroll', onScroll, scrollOptions)
      window.removeEventListener('wheel', onWheel, scrollOptions)
      window.removeEventListener('touchstart', onTouchStart, scrollOptions)
      window.removeEventListener('touchmove', onTouchMove, scrollOptions)
      headerElement.removeEventListener('focusin', onFocusIn)
      reducedMotionQuery.removeEventListener('change', onReducedMotionChange)
    }
  }, [headerElement, pathname])

  return visible
}
