import FormSelect from '../components/ui/FormSelect'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import { courses } from '../data/content'

export default function ApplyPage() {
  return (
    <PageLayout>
      <section className="space-y-6 px-4 py-10">
        <SectionLabel>Apply</SectionLabel>
        <h1 className="text-heading-lg font-extrabold text-navy">Admission application</h1>
        <p className="text-description leading-6 text-body">
          Fill in your details and our admissions counsellor will contact you within one business day.
        </p>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <label className="block space-y-2">
            <span className="text-xs font-semibold text-navy">Full name</span>
            <input
              required
              type="text"
              className="min-h-12 w-full rounded-xl border border-border-alt px-4 text-xs outline-none focus:border-primary"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-xs font-semibold text-navy">Email</span>
            <input
              required
              type="email"
              className="min-h-12 w-full rounded-xl border border-border-alt px-4 text-xs outline-none focus:border-primary"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-xs font-semibold text-navy">Phone</span>
            <input
              required
              type="tel"
              className="min-h-12 w-full rounded-xl border border-border-alt px-4 text-xs outline-none focus:border-primary"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-xs font-semibold text-navy">Preferred course</span>
            <FormSelect
              defaultValue={courses[0]?.id ?? ''}
              options={courses.map((course) => ({
                value: course.id,
                label: course.title,
              }))}
            />
          </label>
          <label className="block space-y-2">
            <span className="text-xs font-semibold text-navy">City</span>
            <input
              required
              type="text"
              className="min-h-12 w-full rounded-xl border border-border-alt px-4 text-xs outline-none focus:border-primary"
            />
          </label>
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent-bright text-xs font-bold text-accent-dark"
          >
            Submit application
          </button>
        </form>
      </section>
    </PageLayout>
  )
}