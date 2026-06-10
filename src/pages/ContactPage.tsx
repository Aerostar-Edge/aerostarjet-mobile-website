import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import CtaBanner from '../components/sections/CtaBanner'
import { assets } from '../data/assets'
import { branches, contactCopy } from '../data/content'

export default function ContactPage() {
  return (
    <PageLayout>
      <section className="space-y-1 bg-primary-alt px-4 py-8 text-surface">
        <SectionLabel>{contactCopy.overline}</SectionLabel>
        <h1 className="text-[1.75rem] font-bold">
          {contactCopy.heading} <span className="text-accent">{contactCopy.headingAccent}</span>
        </h1>
        <p className="text-description text-white/85">{contactCopy.description}</p>
      </section>

      <div className="contact-page-grid">
        <section className="contact-form-section space-y-6 bg-bg-grey px-4 py-10">
          <div className="space-y-2 text-center">
            <p className="text-overline font-semibold uppercase tracking-widest text-primary-alt">
              Admission Open
            </p>
            <h2 className="text-heading-lg font-bold text-navy">
              Send Us a <span className="text-primary-alt">Message</span>
            </h2>
            <p className="text-description text-muted-alt">
              Tell us a little about yourself and our counsellors will reach out to guide you.
            </p>
          </div>
          <form
            className="contact-form space-y-4 rounded-lg border border-border-alt bg-surface p-6 shadow-md"
            onSubmit={(event) => event.preventDefault()}
          >
            {[
              { label: 'Full Name *', placeholder: 'Your full name' },
              { label: 'Mobile Number *', placeholder: '+91' },
              { label: 'Email Address', placeholder: 'your@email.com' },
              { label: 'City/Location', placeholder: 'Your city' },
              { label: 'Campus Preference', placeholder: 'Select campus' },
            ].map((field) => (
              <label key={field.label} className="block space-y-2">
                <span className="text-xs font-semibold text-navy">{field.label}</span>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="min-h-12 w-full rounded-lg border border-border-alt bg-bg-grey px-3 text-xs text-placeholder outline-none focus:border-primary"
                />
              </label>
            ))}
            <label className="block space-y-2">
              <span className="text-xs font-semibold text-navy">Message</span>
              <textarea
                rows={4}
                placeholder="Your message"
                className="w-full rounded-lg border border-border-alt bg-bg-grey px-3 py-3 text-xs text-placeholder outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              className="flex min-h-12 w-full items-center justify-center rounded-lg bg-accent-bright text-xs font-bold uppercase text-accent-dark"
            >
              Submit Now
            </button>
          </form>
          <p className="text-description text-center text-muted">
            Prefer a full application?{' '}
            <Link to="/apply" className="font-semibold text-primary">
              Apply for admission
            </Link>
          </p>
        </section>

        <section className="contact-branches-section space-y-6 bg-bg-light px-4 py-10">
          <SectionLabel>Our Branches</SectionLabel>
          <h2 className="text-heading-lg font-extrabold text-navy-deep">Visit Any of Our 5 Branches</h2>
          <div className="branch-cards space-y-4">
            {branches.map((branch) => (
              <div key={branch.city} className="branch-card rounded-2xl border border-border bg-surface p-6 shadow-md">
                <div className="branch-card__content">
                  <div className="branch-card__title-row">
                    <span className="branch-card__marker" aria-hidden="true" />
                    <h3 className="branch-card__name font-bold text-navy">{branch.city}</h3>
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

        <section className="contact-info-section space-y-6 px-4 py-10">
          <h2 className="text-heading-md font-bold text-navy">Contact</h2>
          <div className="contact-info-card space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-md">
            <div className="flex items-start gap-3">
              <img src={assets.iconPhone} alt="" className="mt-1 size-5" aria-hidden />
              <div>
                <p className="text-xs font-semibold text-navy">Corporate Office</p>
                <p className="text-description mt-1 text-muted">{contactCopy.corporateOffice}</p>
              </div>
            </div>
            {contactCopy.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="flex min-h-12 items-center gap-3 text-xs font-semibold text-primary"
              >
                <img src={assets.iconPhone} alt="" className="size-5" aria-hidden />
                {phone}
              </a>
            ))}
            <a
              href={`mailto:${contactCopy.email}`}
              className="flex min-h-12 items-center text-xs font-semibold text-primary"
            >
              {contactCopy.email}
            </a>
          </div>
        </section>
      </div>

      <CtaBanner />
    </PageLayout>
  )
}
