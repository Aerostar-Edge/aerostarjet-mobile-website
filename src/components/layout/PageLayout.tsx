import type { ReactNode } from 'react'
import Footer from './Footer'
import MobileHeader from './MobileHeader'
import TopBar from './TopBar'

type PageLayoutProps = {
  children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="mx-auto min-h-dvh max-w-[390px] bg-surface">
      <TopBar />
      <MobileHeader />
      <main>{children}</main>
      <Footer />
    </div>
  )
}