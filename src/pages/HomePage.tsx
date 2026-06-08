import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import PartnerMarquee from '../components/ui/PartnerMarquee'
import SwipeTrack from '../components/ui/SwipeTrack'
import CtaBanner from '../components/sections/CtaBanner'
import FaqAccordion from '../components/ui/FaqAccordion'
import { assets } from '../data/assets'
import {
  aboutCopy,
  courses,
  faqs,
  heroStats,
  hiringPartners,
  placements,
  site,
  testimonials,
  whyChoose,
} from '../data/content'

export default function HomePage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-primary px-4 pb-10 pt-8">
        <div className="absolute -right-16 -top-16 size-48 rounded-full bg-white/6" />
        <div className="relative space-y-4">
          <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-surface px-4 py-2">
            <span className="size-2 shrink-0 rounded-full bg-accent-bright" aria-hidden />
            <span className="text-xs font-semibold uppercase leading-tight tracking-wide text-primary">
              {site.heroBadge}
            </span>
          </div>
          <h1 className="text-[2.25rem] font-extrabold uppercase leading-[1.1] tracking-tight text-surface">
            {site.heroLine1}
            <br />
            {site.heroLine2} <span className="text-accent">{site.heroLine2Accent}</span>
          </h1>
          <p className="text-xs font-medium text-surface">{site.heroHashtag}</p>
          <p className="text-description text-white/82">{site.heroDescription}</p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex w-24 shrink-0 flex-col gap-2">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/16 bg-white/10 px-2 py-2"
                >
                  <p className="text-base font-extrabold leading-none text-accent">{stat.value}</p>
                  <p className="mt-0.5 text-[8px] font-semibold uppercase leading-tight tracking-wide text-white/82">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="relative min-w-0 flex-1 h-[210px] overflow-hidden rounded-t-[88px] bg-surface">
              <img
                alt="Aerostar Aviation Academy"
                className="h-full w-full object-contain object-center"
                src={assets.heroStudent}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 px-4 py-10">
        <div className="overflow-hidden rounded-3xl bg-bg-image shadow-lg">
          <img alt="Training session" className="h-56 w-full object-cover" src={assets.aboutImage} />
        </div>
        <SectionLabel>{aboutCopy.overline}</SectionLabel>
        <h2 className="text-heading-lg font-extrabold tracking-tight text-navy-deep">
          {aboutCopy.heading}{' '}
          <span className="text-primary">{aboutCopy.headingAccent}</span>
        </h2>
        <p className="text-description text-black">{aboutCopy.body}</p>
        <div className="space-y-1 text-description text-black">
          {aboutCopy.bullets.map((bullet) => (
            <p key={bullet}>{bullet}</p>
          ))}
        </div>
      </section>

      <section className="space-y-6 bg-bg-light px-4 py-10">
        <div className="space-y-3 text-center">
          <SectionLabel className="justify-center">Programmes</SectionLabel>
          <h2 className="text-heading-lg font-extrabold tracking-tight text-navy-deep">
            Courses Which Get You The <span className="text-primary">Dream Job</span>
          </h2>
        </div>
        <SwipeTrack>
          {courses.map((course) => (
            <article
              key={course.id}
              className="w-[172px] shrink-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
            >
              <img alt={course.title} className="h-24 w-full object-cover" src={course.image} />
              <div className="space-y-1 p-3">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                  {course.code}
                </p>
                <h3 className="text-xs font-bold leading-tight text-navy-deep">{course.title}</h3>
                <div className="flex items-center gap-1 text-[9px] leading-tight text-muted">
                  <img alt="" className="size-3 shrink-0" aria-hidden src={assets.clockIcon} />
                  <span>
                    {course.duration} · {course.schedule}
                  </span>
                </div>
                <Link
                  to={`/courses/${course.id}`}
                  className="mt-2 flex min-h-8 w-full items-center justify-center rounded-full bg-primary text-[10px] font-bold text-surface"
                >
                  View Course
                </Link>
              </div>
            </article>
          ))}
        </SwipeTrack>
        <div className="space-y-3 text-center">
          <Link
            to="/courses"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy-deep px-8 text-body font-bold text-surface"
          >
            View More Courses
            <img alt="" className="size-4 invert" aria-hidden src={assets.arrowIcon} />
          </Link>
          <p className="text-description text-muted-light">
            Speak to a counsellor to explore all available programmes.
          </p>
        </div>

        <div className="space-y-6 pt-8">
          <div className="space-y-3 text-center">
            <SectionLabel className="justify-center">Placements</SectionLabel>
            <h2 className="text-heading-lg font-extrabold text-navy-deep">
              Our Students Get
              <br />
              <span className="text-primary">Placed In</span>
            </h2>
            <p className="text-description mx-9 font-medium text-muted">
              500+ Hiring Partners Across Airlines, Aviation, Hospitality and Tours & Travels Industry.
            </p>
          </div>
          <PartnerMarquee partners={hiringPartners} />
        </div>
      </section>

      <section id="why-choose" className="bg-primary py-10">
        <div className="mb-6 space-y-3 px-4 text-center">
          <p className="text-label font-bold uppercase tracking-[0.12em] text-accent">
            The Aerostar Edge
          </p>
          <div className="mx-auto inline-flex items-start gap-2 text-left">
            <span className="mt-2 size-2 shrink-0 rounded bg-accent" aria-hidden />
            <h2 className="pl-0 pr-16 text-heading-lg font-extrabold tracking-tight text-surface">
              Why Choose <span className="text-accent">Aerostar Aviation</span>
              <br />
              <span className="text-accent">Academy?</span>
            </h2>
          </div>
        </div>
        <div className="px-4">
          <SwipeTrack>
            {whyChoose.map((item) => (
              <article
                key={item.title.join(' ')}
                className="w-[85vw] max-w-[280px] shrink-0 space-y-3 rounded-2xl border border-white/16 bg-white/8 p-6"
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-accent">
                  <img alt="" className="size-6" aria-hidden src={item.icon} />
                </div>
                <h4 className="text-heading-md font-bold text-surface">
                  {item.title[0]}
                  <br />
                  {item.title[1]}
                </h4>
                <p className="text-description text-white/82">{item.description}</p>
              </article>
            ))}
          </SwipeTrack>
        </div>
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
        <SwipeTrack>
          {testimonials.map((item) => (
            <blockquote
              key={item.name}
              className="w-[85vw] max-w-[300px] shrink-0 rounded-lg border border-border-alt bg-surface p-6 shadow-md"
            >
              <span className="text-5xl font-bold leading-none text-quote">&ldquo;</span>
              <p className="text-description mt-2 text-body">{item.quote}</p>
              <footer className="mt-4 flex items-center gap-3 border-t border-border-alt pt-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-bg-avatar text-body font-bold text-primary-alt">
                  {item.initial}
                </div>
                <div>
                  <p className="text-body font-bold text-navy">{item.name}</p>
                  <p className="text-label text-muted-alt">{item.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </SwipeTrack>
      </section>

      <section className="space-y-6 bg-primary-alt px-4 py-10">
        <h2 className="text-center text-heading-lg font-bold">
          <span className="text-bg-grey opacity-80">Our </span>
          <span className="text-[#FFC629]">Placements</span>
        </h2>
        <SwipeTrack>
          {placements.map((placement) => (
            <article
              key={placement.name}
              className="w-[200px] shrink-0 overflow-hidden rounded-lg border border-border-alt bg-surface shadow-md"
            >
              <div className="relative aspect-square w-full bg-bg-avatar">
                <div className="absolute bottom-0 right-0 h-full w-3/5 rounded-tl-[80px] bg-primary-alt" />
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-navy">{placement.name}</p>
                  <p className="truncate text-xs font-semibold text-primary-alt">{placement.role}</p>
                </div>
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-bg-avatar">
                  <img alt="" className="size-4" aria-hidden src={assets.placementIcon} />
                </div>
              </div>
            </article>
          ))}
        </SwipeTrack>
      </section>

      <section className="space-y-4 bg-bg-grey px-4 py-8">
        <div className="space-y-1.5 text-center">
          <p className="text-overline font-semibold uppercase tracking-widest text-primary-alt">
            Admission Open
          </p>
          <h2 className="text-heading-md font-bold text-navy">
            Get In <span className="text-primary-alt">Touch</span>
          </h2>
          <p className="text-description mx-auto max-w-[280px] text-muted-alt">
            Tell us a little about yourself and our counsellors will reach out to guide you.
          </p>
        </div>
        <form
          className="mx-auto w-full max-w-[300px] space-y-3 rounded-lg border border-border-alt bg-surface p-4 shadow-md"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-navy">Full Name *</span>
            <input
              placeholder="Your full name"
              className="min-h-10 w-full rounded-lg border border-border-alt bg-bg-grey px-3 text-xs text-placeholder outline-none focus:border-primary"
              type="text"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-navy">Mobile Number *</span>
            <input
              placeholder="+91"
              className="min-h-10 w-full rounded-lg border border-border-alt bg-bg-grey px-3 text-xs text-placeholder outline-none focus:border-primary"
              type="text"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-navy">Email Address</span>
            <input
              placeholder="your@email.com"
              className="min-h-10 w-full rounded-lg border border-border-alt bg-bg-grey px-3 text-xs text-placeholder outline-none focus:border-primary"
              type="email"
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

      <section id="faq" className="space-y-3 px-4 pb-4 pt-6">
        <h2 className="text-center text-heading-md font-bold text-navy">
          Frequently Asked <span className="text-primary-alt">Questions</span>
        </h2>
        <FaqAccordion faqs={faqs} />
      </section>
      <CtaBanner />
    </PageLayout>
  )
}
