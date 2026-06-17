import { useState, type FormEvent } from 'react'
import FormSelect from '../components/ui/FormSelect'
import PageLayout from '../components/layout/PageLayout'
import { EnrollCtaButton, enrollCtaClassName } from '../components/ui/EnrollCtaButton'
import CtaBanner from '../components/sections/CtaBanner'
import { PartnerTagGrid } from '../components/ui/PartnerMarquee'
import SectionLabel from '../components/ui/SectionLabel'
import { franchiseCopy } from '../data/content'

export default function FranchisePage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const scrollToEnquiry = () => {
    document.getElementById('partner-enquiry')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    setIsSubmitted(true)
  }

  return (
    <PageLayout>
      <section className="stack-hero bg-primary-alt px-4 py-8 text-surface">
        <h1 className="text-[1.75rem] font-bold">{franchiseCopy.hero.title}</h1>
        <p className="text-description max-w-[560px] leading-snug text-white/85">{franchiseCopy.hero.subCopy}</p>
        <EnrollCtaButton type="button" onClick={scrollToEnquiry}>
          {franchiseCopy.hero.cta}
        </EnrollCtaButton>
      </section>

      <section className="mobile-listing-section stack-section py-8">
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
                <p className="branch-card__address text-description text-muted">{branch.address}</p>
              </div>
              <a
                href={`tel:${branch.phone.replace(/\s/g, '')}`}
                className="branch-card__phone flex min-h-12 items-center text-xs font-semibold text-primary"
              >
                {branch.phone}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="stack-section px-4 py-10">
        <SectionLabel>Expanding Soon</SectionLabel>
        <PartnerTagGrid partners={franchiseCopy.availableStates} className="available-states-tags" />
      </section>

      <section id="partner-enquiry" className="stack-section bg-bg-grey px-4 py-8">
        <div className="stack-section-header text-center">
          <h2 className="text-heading-md font-bold text-navy">
            Partner with <span className="text-primary-alt">Us</span>
          </h2>
          <p className="text-description mx-auto max-w-[280px] text-muted-alt">{franchiseCopy.formIntro}</p>
        </div>
        {isSubmitted ? (
          <div className="mx-auto w-full max-w-[300px] stack-copy rounded-lg border border-border-alt bg-surface p-4 text-center shadow-md">
            <p className="text-description text-body">Thank you — download your brochure below.</p>
            <a
              href={franchiseCopy.brochureUrl}
              download
              className={`${enrollCtaClassName} partner-brochure-download`}
            >
              Download Brochure
            </a>
          </div>
        ) : (
          <form
            className="mx-auto w-full max-w-[300px] stack-form rounded-lg border border-border-alt bg-surface p-4 shadow-md"
            onSubmit={handleSubmit}
          >
            {[
              { label: 'Name *', placeholder: 'Your full name', type: 'text', name: 'name' },
              { label: 'Email *', placeholder: 'your@email.com', type: 'email', name: 'email' },
              { label: 'Mobile Number *', placeholder: '+91', type: 'tel', name: 'mobile' },
            ].map((field) => (
              <label key={field.label} className="stack-field block">
                <span className="text-xs font-semibold text-navy">{field.label}</span>
                <input
                  type={field.type}
                  name={field.name}
                  required
                  placeholder={field.placeholder}
                  className="min-h-10 w-full rounded-lg border border-border-alt bg-bg-grey px-3 text-xs text-placeholder outline-none focus:border-primary"
                />
              </label>
            ))}
            <label className="stack-field block">
              <span className="text-xs font-semibold text-navy">State *</span>
              <FormSelect
                name="state"
                defaultValue=""
                placeholder="Select state"
                required
                options={franchiseCopy.availableStates.map((state) => ({
                  value: state,
                  label: state,
                }))}
              />
            </label>
            <label className="stack-field block">
              <span className="text-xs font-semibold text-navy">Message</span>
              <textarea
                name="message"
                rows={3}
                placeholder="Your message"
                className="w-full rounded-lg border border-border-alt bg-bg-grey px-3 py-2 text-xs text-placeholder outline-none focus:border-primary"
              />
            </label>
            <EnrollCtaButton type="submit">Submit Now</EnrollCtaButton>
          </form>
        )}
      </section>

      <CtaBanner />
    </PageLayout>
  )
}