import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import { PartnerTagGrid } from '../components/ui/PartnerMarquee'
import PlacementsMarquee from '../components/ui/PlacementsMarquee'
import CtaBanner from '../components/sections/CtaBanner'
import { hiringPartners, placements } from '../data/content'

export default function PlacementsPage() {
  return (
    <PageLayout>
      <section className="placements-hero-section space-y-1 bg-primary-alt px-4 py-8 text-surface">
        <h1 className="text-[1.75rem] font-bold">Placements & Career</h1>
        <p className="text-description text-white/85">
          Aerostar provides internship and job placement support, with established partnerships across Aviation, Hospitality and Travel & Tourism.
        </p>
      </section>
      <section className="placements-featured-section space-y-6 px-4 py-10">
        <SectionLabel>FEATURED PLACEMENTS</SectionLabel>
        <h2 className="text-heading-lg font-bold text-navy">
          From Classroom to the <span className="text-primary-alt">Cabin</span>
        </h2>
        <PlacementsMarquee placements={placements} />
      </section>
      <section className="mobile-listing-section space-y-6 bg-bg-light py-8">
        <h2 className="mobile-listing-section__intro text-heading-lg font-bold text-navy text-center">
          Companies That Hire Our Graduates
        </h2>
        <PartnerTagGrid partners={hiringPartners} className="hiring-partners-tags" />
      </section>
      <CtaBanner />
    </PageLayout>
  )
}
