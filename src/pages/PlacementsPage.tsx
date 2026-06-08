import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import SwipeTrack from '../components/ui/SwipeTrack'
import PartnerMarquee from '../components/ui/PartnerMarquee'
import CtaBanner from '../components/sections/CtaBanner'
import { assets } from '../data/assets'
import { hiringPartners, placements } from '../data/content'

export default function PlacementsPage() {
  return (
    <PageLayout>
      <section className="space-y-1 bg-primary-alt px-4 py-8 text-surface">
        <h1 className="text-[1.75rem] font-bold">Placements & Career</h1>
        <p className="text-description text-white/85">
          Aerostar provides internship and job placement support, with established partnerships across Aviation, Hospitality and Travel & Tourism.
        </p>
      </section>
      <section className="space-y-6 px-4 py-10">
        <SectionLabel>FEATURED PLACEMENTS</SectionLabel>
        <h2 className="text-heading-lg font-bold text-navy">
          From Classroom to the <span className="text-primary-alt">Cabin</span>
        </h2>
        <SwipeTrack>
          {placements.map((p) => (
            <article key={p.name} className="w-[200px] shrink-0 overflow-hidden rounded-lg border border-border-alt bg-surface shadow-md">
              <div className="relative aspect-square w-full bg-bg-avatar">
                <div className="absolute bottom-0 right-0 h-full w-3/5 rounded-tl-[80px] bg-primary-alt" />
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-navy">{p.name}</p>
                  <p className="truncate text-xs font-semibold text-primary-alt">{p.role}</p>
                </div>
                <img src={assets.placementIcon} alt="" className="size-4 shrink-0" aria-hidden />
              </div>
            </article>
          ))}
        </SwipeTrack>
      </section>
      <section className="space-y-6 bg-bg-light px-4 py-10">
        <h2 className="text-heading-lg font-bold text-navy text-center">Companies That Hire Our Graduates</h2>
        <PartnerMarquee partners={hiringPartners} />
      </section>
      <CtaBanner />
    </PageLayout>
  )
}
