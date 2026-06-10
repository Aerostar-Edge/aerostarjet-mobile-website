import PreviewLink from '../layout/PreviewLink'

export default function CtaBanner() {
  return (
    <section className="cta-banner w-full bg-primary-alt px-4 py-12 text-center">
      <h2 className="cta-banner__title mx-auto max-w-xl text-heading-lg font-bold text-white">Ready to Launch Your Career?</h2>
      <p className="text-description mt-2 font-normal text-accent">Enroll Now - Free Counselling</p>
      <PreviewLink
        to="/apply"
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-accent-bright px-8 text-body-sm font-extrabold text-accent-dark"
      >
        Join Aerostar →
      </PreviewLink>
    </section>
  )
}
