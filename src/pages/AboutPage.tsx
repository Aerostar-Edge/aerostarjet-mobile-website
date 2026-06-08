import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import CtaBanner from '../components/sections/CtaBanner'
import { assets } from '../data/assets'
import { aboutCopy } from '../data/content'

export default function AboutPage() {
  return (
    <PageLayout>
      <section className="space-y-1 bg-primary-alt px-4 py-8 text-surface">
        <h1 className="text-[1.75rem] font-bold">About Us</h1>
        <p className="text-description text-white/85">Training for Excellence in Air and Hospitality Service</p>
      </section>
      <section className="space-y-6 px-4 py-10">
        <img src={assets.aboutImage} alt="" className="h-56 w-full rounded-2xl object-cover" />
        <SectionLabel>{aboutCopy.overline}</SectionLabel>
        <h2 className="text-heading-lg font-extrabold text-navy-deep">
          {aboutCopy.heading} <span className="text-primary">{aboutCopy.headingAccent}</span>
        </h2>
        <p className="text-description leading-6 text-body">{aboutCopy.body}</p>
        {aboutCopy.bullets.map((b) => (
          <p key={b} className="text-xs font-semibold text-black">{b}</p>
        ))}
        <Link
          to="/contact"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-8 text-xs font-bold text-surface"
        >
          Contact & Branches →
        </Link>
      </section>
      <CtaBanner />
    </PageLayout>
  )
}
