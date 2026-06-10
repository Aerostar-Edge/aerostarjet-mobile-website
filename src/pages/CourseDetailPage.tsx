import { Link, Navigate, useParams } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import CtaBanner from '../components/sections/CtaBanner'
import CurriculumAccordion from '../components/ui/CurriculumAccordion'
import GroundSubjectsAccordion from '../components/ui/GroundSubjectsAccordion'
import { getModuleGroupsForCourse } from '../data/courseModuleGroups'
import { getCourseById } from '../data/content'

export default function CourseDetailPage() {
  const { courseId } = useParams()
  const course = courseId ? getCourseById(courseId) : undefined

  if (!course) {
    return <Navigate to="/courses" replace />
  }

  const moduleGroups = getModuleGroupsForCourse(course.id)

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
          <span>{course.code ?? course.title}</span>
        </nav>
        <span className="inline-block rounded bg-accent-gold px-3 py-2 text-label font-semibold uppercase tracking-wide text-navy">
          {course.programmeLabel}
        </span>
        <h1 className="text-[1.75rem] font-bold leading-tight">{course.title}</h1>
        <p className="text-description text-white/85">{course.tagline}</p>
      </section>

      <section className="space-y-6 px-4 py-8">
        <img src={course.image} alt={course.title} className="h-52 w-full rounded-2xl object-cover" />

        <div className="space-y-2 rounded-lg border border-border-alt bg-surface p-4 shadow-md">
          <h3 className="text-sm font-bold text-navy">Programme Details</h3>
          {[
            ...(course.code ? [['Course Code', course.code] as const] : []),
            ['Duration', course.duration],
            ['Schedule', course.schedule],
            ['Admission', 'Open 2026/27'],
            ['Fees Structure', 'Contact Now'],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-2 border-b border-border-alt py-2 last:border-b-0"
            >
              <span className="shrink-0 text-[11px] text-muted">{label}</span>
              <span className="max-w-[58%] text-right text-[11px] font-semibold leading-snug text-navy">
                {value}
              </span>
            </div>
          ))}
          <Link
            to="/apply"
            className="mt-1 flex min-h-10 w-full items-center justify-center rounded-full bg-accent-bright text-xs font-bold text-accent-dark"
          >
            Enroll Now &rarr;
          </Link>
        </div>

        <h2 className="text-heading-md font-bold text-navy">{course.tagline}</h2>
        <p className="text-description leading-6 text-body">{course.overview}</p>
        {course.eligibility ? (
          <>
            <h3 className="text-heading-md font-bold text-navy">Eligibility</h3>
            <p className="text-description leading-6 text-body">{course.eligibility}</p>
          </>
        ) : null}
        {course.flightTraining ? (
          <>
            <h3 className="text-heading-md font-bold text-navy">Flight Training</h3>
            <p className="text-description leading-6 text-body">{course.flightTraining}</p>
          </>
        ) : null}
        {course.groundSubjects && course.groundSubjects.length > 0 ? (
          <>
            <h3 className="text-heading-md font-bold text-navy">Ground Subjects (DGCA Examinations)</h3>
            <GroundSubjectsAccordion subjects={course.groundSubjects} />
          </>
        ) : null}
        {moduleGroups.length > 0 ? (
          <>
            <h3 className="text-heading-md font-bold text-navy">Curriculum & Modules</h3>
            <CurriculumAccordion groups={moduleGroups} />
          </>
        ) : null}
      </section>
      <CtaBanner />
    </PageLayout>
  )
}
