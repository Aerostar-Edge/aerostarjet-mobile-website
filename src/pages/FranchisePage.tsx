import FormSelect from '../components/ui/FormSelect'
import PageLayout from '../components/layout/PageLayout'
import CtaBanner from '../components/sections/CtaBanner'
import { PartnerChip } from '../components/ui/PartnerMarquee'
import SectionLabel from '../components/ui/SectionLabel'
import { franchiseCopy } from '../data/content'

export default function FranchisePage() {
  const scrollToEnquiry = () => {
    document.getElementById('franchise-enquiry')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <PageLayout>
      <section className="space-y-4 bg-primary-alt px-4 py-8 text-surface">
        <h1 className="text-[1.75rem] font-bold">{franchiseCopy.hero.title}</h1>
        <p className="text-description text-white/85">{franchiseCopy.hero.subCopy}</p>
        <button
          type="button"
          onClick={scrollToEnquiry}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent-bright px-8 text-xs font-bold uppercase text-accent-dark"
        >
          {franchiseCopy.hero.cta}
        </button>
      </section>

      <section className="mobile-listing-section space-y-6 py-8">
        <div className="mobile-listing-section__intro space-y-6">
          <SectionLabel>Franchise Overview</SectionLabel>
          {franchiseCopy.overview.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-description leading-6 text-body">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="franchise-stats-grid">
          {franchiseCopy.overview.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-surface px-2 py-3 text-center shadow-md"
            >
              <p className="text-base font-extrabold leading-none text-primary-alt">{stat.value}</p>
              <p className="mt-2 text-[10px] font-semibold leading-snug text-navy">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mobile-listing-section space-y-6 bg-bg-light py-8">
        <div className="mobile-listing-section__intro">
          <SectionLabel>Investment Details</SectionLabel>
        </div>
        <div className="franchise-investment-grid">
          {franchiseCopy.investmentDetails.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border-alt bg-surface p-4 shadow-md"
            >
              <p className="text-[11px] text-muted">{item.label}</p>
              <p className="mt-1 text-xs font-semibold leading-snug text-navy">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 px-4 py-10">
        <SectionLabel>Available States</SectionLabel>
        <div className="available-states-tags">
          {franchiseCopy.availableStates.map((state) => (
            <PartnerChip key={state} name={state} />
          ))}
        </div>
      </section>

      <section id="franchise-enquiry" className="space-y-4 bg-bg-grey px-4 py-8">
        <div className="space-y-1.5 text-center">
          <p className="text-overline font-semibold uppercase tracking-widest text-primary-alt">
            Admission Open
          </p>
          <h2 className="text-heading-md font-bold text-navy">
            Franchise <span className="text-primary-alt">Enquiry</span>
          </h2>
          <p className="text-description mx-auto max-w-[280px] text-muted-alt">{franchiseCopy.formIntro}</p>
        </div>
        <form
          className="mx-auto w-full max-w-[300px] space-y-3 rounded-lg border border-border-alt bg-surface p-4 shadow-md"
          onSubmit={(event) => event.preventDefault()}
        >
          {[
            { label: 'Name *', placeholder: 'Your full name', type: 'text' },
            { label: 'Email *', placeholder: 'your@email.com', type: 'email' },
            { label: 'Mobile Number *', placeholder: '+91', type: 'tel' },
          ].map((field) => (
            <label key={field.label} className="block space-y-1">
              <span className="text-xs font-semibold text-navy">{field.label}</span>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="min-h-10 w-full rounded-lg border border-border-alt bg-bg-grey px-3 text-xs text-placeholder outline-none focus:border-primary"
              />
            </label>
          ))}
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-navy">State *</span>
            <FormSelect
              defaultValue=""
              placeholder="Select state"
              required
              options={franchiseCopy.availableStates.map((state) => ({
                value: state,
                label: state,
              }))}
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-navy">Message</span>
            <textarea
              rows={3}
              placeholder="Your message"
              className="w-full rounded-lg border border-border-alt bg-bg-grey px-3 py-2 text-xs text-placeholder outline-none focus:border-primary"
            />
          </label>
          <button
            type="submit"
            className="flex min-h-10 w-full items-center justify-center rounded-lg bg-accent-bright text-xs font-bold uppercase text-accent-dark"
          >
            Submit Now
          </button>
        </form>
      </section>

      <section className="mobile-listing-section space-y-6 bg-bg-light py-8">
        <div className="mobile-listing-section__intro">
          <SectionLabel>Branch Locations</SectionLabel>
        </div>
        <div className="branch-cards">
          {franchiseCopy.branches.map((branch) => (
            <div key={branch.name} className="branch-card rounded-2xl border border-border bg-surface p-6 shadow-md">
              <div className="branch-card__content">
                <div className="branch-card__title-row">
                  <span className="branch-card__marker" aria-hidden="true" />
                  <h3 className="branch-card__name font-bold text-navy">{branch.name}</h3>
                </div>
                <p className="branch-card__address text-description mt-1 text-muted">{branch.address}</p>
              </div>
              <a
                href={`tel:${branch.phone.replace(/\s/g, '')}`}
                className="branch-card__phone mt-2 flex min-h-12 items-center text-xs font-semibold text-primary"
              >
                {branch.phone}
              </a>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </PageLayout>
  )
}
