import { EnrollCtaLink } from '../ui/EnrollCtaButton'

export default function CtaBanner() {
  return (
    <section className="cta-banner w-full bg-primary-alt px-4 py-12 text-center">
      <h2 className="cta-banner__title mx-auto max-w-xl text-heading-lg font-bold text-white">
        Ready to Launch Your Career?
      </h2>
      <p className="cta-banner__subtitle text-description font-normal text-accent">
        Enroll Now - Free Counselling
      </p>
      <EnrollCtaLink to="/apply">Join Aerostar →</EnrollCtaLink>
    </section>
  )
}
