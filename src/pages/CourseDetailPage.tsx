import { Link, Navigate, useParams } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import CtaBanner from '../components/sections/CtaBanner'
import { curriculumModules, getCourseById } from '../data/content'

export default function CourseDetailPage() {
  const { courseId } = useParams()
  const course = courseId ? getCourseById(courseId) : undefined

  if (!course) {
    return <Navigate to="/courses" replace />
  }

  return (
    <PageLayout>
      <section className="space-y-4 bg-primary-alt px-4 py-8 text-surface">
        <nav className="flex flex-wrap items-center gap-2 text-body-sm text-white/72">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link to="/courses" className="hover:text-white">
            Courses
          </Link>
          <span>/</span>
          <span>{course.code}</span>
        </nav>
        <span className="inline-block rounded bg-accent-gold px-3 py-2 text-label font-semibold uppercase tracking-wide text-navy">
          {course.programmeLabel}
        </span>
        <h1 className="text-[1.75rem] font-bold leading-tight">{course.title}</h1>
        <p className="text-description text-white/85">{course.tagline}</p>
      </section>

      <section className="space-y-6 px-4 py-8">
        <img src={course.image} alt={course.title} className="h-52 w-full rounded-2xl object-cover" />
        <h2 className="text-heading-md font-bold text-navy">{course.tagline}</h2>
        <p className="text-description leading-6 text-body">{course.description}</p>
        <h3 className="text-heading-md font-bold text-navy">Curriculum & Modules</h3>
        <div className="space-y-3">
          {curriculumModules.map((module) => (
            <div key={module} className="flex min-h-12 items-center gap-3 rounded-lg bg-bg-grey px-4">
              <span className="font-bold text-primary">✓</span>
              <span className="text-xs text-navy">{module}</span>
            </div>
          ))}
        </div>
        <div className="space-y-4 rounded-lg border border-border-alt bg-surface p-6 shadow-md">
          <h3 className="text-heading-md font-bold text-navy">Programme Details</h3>
          {[
            ['Course Code', course.code],
            ['Duration', course.duration],
            ['Schedule', course.schedule],
            ['Admission', 'Open 2025/26'],
            ['Fees Structure', 'Contact Now'],
          ].map(([label, value]) => (
            <div key={label} className="flex min-h-12 items-center justify-between border-b border-border-alt pb-3">
              <span className="text-body-sm text-muted">{label}</span>
              <span className="text-xs font-bold text-navy">{value}</span>
            </div>
          ))}
          <Link
            to="/apply"
            className="flex min-h-12 w-full items-center justify-center rounded-full bg-accent-bright text-xs font-bold text-accent-dark"
          >
            Enroll Now →
          </Link>
        </div>
      </section>
      <CtaBanner />
    </PageLayout>
  )
}
