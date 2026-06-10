import PreviewLink from '../components/layout/PreviewLink'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import FormSelect from '../components/ui/FormSelect'
import PlacementsMarquee from '../components/ui/PlacementsMarquee'
import TestimonialsCarousel from '../components/ui/TestimonialsCarousel'
import WhyChooseCarousel from '../components/ui/WhyChooseCarousel'
import CtaBanner from '../components/sections/CtaBanner'
import FaqAccordion from '../components/ui/FaqAccordion'
import { assets } from '../data/assets'
import {
  aboutCopy,
  faqs,
  heroStats,
  homepageAdmissionCopy,
  homepageCoursesCopy,
  infrastructureCopy,
  placements,
  recognitionsCopy,
  site,
  testimonials,
  whyChoose,
  whyChooseCopy,
} from '../data/content'

const formFieldClass =
  'min-h-10 w-full rounded-lg border border-border-alt bg-bg-grey px-3 text-xs text-placeholder outline-none focus:border-primary'

export default function HomePage() {
  return (
    <PageLayout>
      <section className="homepage-hero relative overflow-hidden bg-primary px-4 pb-10 pt-8">
        <div className="absolute -right-16 -top-16 size-48 rounded-full bg-white/6" />
        <div className="homepage-hero__inner relative space-y-4">
          <div className="homepage-hero__badge inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-surface px-4 py-2">
            <span className="size-2 shrink-0 rounded-full bg-accent-bright" aria-hidden />
            <span className="text-xs font-semibold uppercase leading-tight tracking-wide text-primary">
              {site.heroBadge}
            </span>
          </div>
          <h1 className="homepage-hero__title text-[2.25rem] font-extrabold uppercase leading-[1.1] tracking-tight text-surface">
            {site.heroLine1}
            <br />
            {site.heroLine2} <span className="text-accent">{site.heroLine2Accent}</span>
          </h1>
          <p className="homepage-hero__hashtag text-xs font-medium text-surface">{site.heroHashtag}</p>
          <p className="homepage-hero__body text-description text-white/82">{site.heroDescription}</p>
          <div className="homepage-hero__bottom flex items-center justify-center gap-4 pt-2">
            <div className="homepage-hero__media relative h-[210px] min-w-0 flex-1 overflow-hidden rounded-t-[88px] bg-surface">
              <img
                alt="Aerostar Aviation Academy"
                className="homepage-hero__image h-full w-full object-contain object-center"
                src={assets.heroStudent}
              />
            </div>
            <div className="homepage-hero__stats flex w-24 shrink-0 flex-col gap-2">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="homepage-hero__stat rounded-lg border border-white/16 bg-white/10 px-2 py-2"
                >
                  <p className="homepage-hero__stat-value text-base font-extrabold leading-none text-accent">
                    {stat.value}
                  </p>
                  <p className="homepage-hero__stat-label mt-0.5 text-[8px] font-semibold uppercase leading-tight tracking-wide text-white/82">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 px-4 py-10">
        <div className="about-preview-layout">
          <div className="about-preview-layout__media overflow-hidden rounded-3xl bg-bg-image shadow-lg">
            <img alt="Training session" className="about-preview-layout__image" src={assets.aboutImage} />
          </div>
          <div className="about-preview-layout__copy">
            <SectionLabel className="my-3">{aboutCopy.overline}</SectionLabel>
            <p className="my-3 text-sm font-bold text-navy-deep">{aboutCopy.title}</p>
            <h2 className="about-preview-layout__heading pt-0 pb-3 text-heading-lg font-extrabold text-navy-deep">
              {aboutCopy.heading}{' '}
              <span className="text-primary">{aboutCopy.headingAccent}</span>
            </h2>
            {aboutCopy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-description leading-6 text-black">
                {paragraph}
              </p>
            ))}
            <div className="my-4 flex flex-wrap gap-3">
              <PreviewLink
                to="/about"
                className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 text-xs font-bold text-surface"
              >
                View More {'\u2192'}
              </PreviewLink>
              <PreviewLink
                to="/apply"
                className="inline-flex min-h-12 items-center rounded-full border border-primary px-6 text-xs font-bold text-primary"
              >
                Admission {'\u2192'}
              </PreviewLink>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 bg-bg-light px-4 py-10">
        <div className="space-y-3 text-center">
          <SectionLabel className="justify-center">{recognitionsCopy.overline}</SectionLabel>
          <h2 className="text-heading-lg font-extrabold tracking-tight text-navy-deep">
            {recognitionsCopy.heading}
          </h2>
        </div>
        <div className="feature-cards-grid grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              aria-label={`Recognition badge ${index}`}
              className="flex h-20 items-center justify-center rounded-xl border border-border bg-surface py-6 shadow-sm"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                Recognition {index}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 px-4 py-10">
        <div className="space-y-3 text-center">
          <SectionLabel className="justify-center">{homepageCoursesCopy.overline}</SectionLabel>
          <h2 className="text-heading-lg font-extrabold tracking-tight text-navy-deep">
            {homepageCoursesCopy.heading}
          </h2>
        </div>
        <div className="course-categories-grid grid grid-cols-2 gap-4">
          {homepageCoursesCopy.categories.map((category) => (
            <PreviewLink
              key={category.label}
              to={category.href}
              className="course-category-card overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-colors hover:border-primary"
            >
              <div className="course-category-card__media" aria-hidden="true" />
              <div className="course-category-card__label-wrap">
                <p className="course-category-card__label">{category.label}</p>
              </div>
            </PreviewLink>
          ))}
        </div>
      </section>

      <section id="why-choose" className="why-choose-section bg-primary py-10">
        <div className="mb-6 space-y-3 px-4 text-center">
          <p className="text-label font-bold uppercase tracking-[0.12em] text-accent">
            {whyChooseCopy.overline}
          </p>
          <h2 className="my-5 text-heading-lg font-extrabold tracking-tight text-surface">
            {whyChooseCopy.heading}
          </h2>
        </div>
        <WhyChooseCarousel items={whyChoose} />
      </section>

      <section className="space-y-6 px-4 py-10">
        <div className="infrastructure-teaser-layout">
          <div className="infrastructure-teaser-layout__copy space-y-4">
            <h2 className="text-heading-lg font-extrabold tracking-tight text-navy-deep">
              {infrastructureCopy.heading}
            </h2>
            {infrastructureCopy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-description leading-6 text-body">
                {paragraph}
              </p>
            ))}
            <PreviewLink
              to="/infrastructure"
              className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 text-xs font-bold text-surface"
            >
              {infrastructureCopy.cta} {'\u2192'}
            </PreviewLink>
          </div>
          <div className="infrastructure-teaser-layout__media">
            <img
              alt="Aerostar infrastructure"
              src={infrastructureCopy.gallery[0].src}
            />
          </div>
        </div>
      </section>

      <section className="space-y-6 bg-primary-alt px-4 py-10">
        <h2 className="text-center text-heading-lg font-bold">
          <span className="text-surface">Our </span>
          <span className="text-accent">Placements</span>
        </h2>
        <PlacementsMarquee placements={placements} />
      </section>

      <section className="space-y-6 bg-bg-grey px-4 py-10">
        <div className="space-y-2 text-center">
          <p className="text-overline font-semibold uppercase tracking-widest text-primary-alt">
            Testimonials
          </p>
          <h2 className="text-heading-lg font-bold tracking-tight text-navy">
            What Our Students Have to Say about{' '}
            <span className="text-primary-alt">Aerostar</span>
          </h2>
        </div>
        <TestimonialsCarousel testimonials={testimonials} />
      </section>

      <section className="space-y-4 bg-bg-grey px-4 py-8">
        <div className="space-y-1.5 text-center">
          <p className="text-overline font-semibold uppercase tracking-widest text-primary-alt">
            {homepageAdmissionCopy.overline}
          </p>
          <h2 className="text-heading-lg font-bold text-navy">{homepageAdmissionCopy.heading}</h2>
        </div>
        <form
          className="admission-form admission-form--grid mx-auto w-full max-w-[300px] space-y-3 rounded-lg border border-border-alt bg-surface p-4 shadow-md"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-navy">Nearest Academy *</span>
            <FormSelect
              defaultValue=""
              placeholder="Select academy"
              required
              options={homepageAdmissionCopy.nearestAcademyOptions.map((option) => ({
                value: option,
                label: option,
              }))}
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-navy">Highest Qualification *</span>
            <FormSelect
              defaultValue=""
              placeholder="Select qualification"
              required
              options={homepageAdmissionCopy.qualificationOptions.map((option) => ({
                value: option,
                label: option,
              }))}
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-navy">Course Interested *</span>
            <FormSelect
              defaultValue=""
              placeholder="Select course"
              required
              options={homepageAdmissionCopy.courseOptions.map((option) => ({
                value: option,
                label: option,
              }))}
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-navy">Full Name *</span>
            <input placeholder="Your full name" className={formFieldClass} type="text" />
          </label>
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-navy">Email Address *</span>
            <input placeholder="your@email.com" className={formFieldClass} type="email" />
          </label>
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-navy">Mobile Number *</span>
            <input placeholder="+91" className={formFieldClass} type="text" />
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
            {homepageAdmissionCopy.submitLabel}
          </button>
        </form>
      </section>

      <section id="faq" className="faq-section space-y-4 px-4 py-10">
        <h2 className="text-center text-heading-lg font-bold text-navy">
          Frequently Asked <span className="text-primary-alt">Questions</span>
        </h2>
        <FaqAccordion faqs={faqs} />
      </section>
      <CtaBanner />
    </PageLayout>
  )
}