import type { ReactNode } from 'react'
import Footer from './Footer'
import MobileHeader from './MobileHeader'

type PageLayoutProps = {
  children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="page-shell mx-auto min-h-dvh w-full bg-surface">
      <MobileHeader />
      <main className="min-w-0">{children}</main>
      <Footer />
    </div>
  )
}
