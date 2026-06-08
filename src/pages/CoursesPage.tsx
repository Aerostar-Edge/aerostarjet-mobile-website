import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import CourseCard from '../components/ui/CourseCard'
import CtaBanner from '../components/sections/CtaBanner'
import {
  courseCategories,
  courses,
  getCourseCountByCategory,
  type CourseCategory,
} from '../data/content'

type ActiveCategory = 'all' | CourseCategory

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all')

  const filteredCourses = useMemo(() => {
    if (activeCategory === 'all') return courses
    return courses.filter((course) => course.categories.includes(activeCategory))
  }, [activeCategory])

  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-primary-alt px-4 py-8 text-surface">
        <div className="absolute -right-16 -top-16 size-48 rounded-full bg-white/8" />
        <div className="relative">
          <nav className="mb-1 flex flex-wrap items-center gap-2 text-xs text-white/72">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span>Courses</span>
          </nav>
          <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight">All Courses</h1>
          <p className="text-description mt-0.5 max-w-[320px] leading-snug text-white/84">
            Explore our curriculum built with industry experts. Select a category to narrow your search.
          </p>
        </div>
      </section>

      <section className="space-y-6 bg-bg-grey px-4 py-8">
        <div className="space-y-2">
          <div className="scrollbar-hide -mx-4 flex flex-nowrap gap-2 overflow-x-auto px-4">
            {courseCategories.map((category) => {
              const isActive = activeCategory === category.id
              const count = getCourseCountByCategory(category.id)
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2 py-1 text-label font-medium shadow-sm ${
                    isActive
                      ? 'border-primary bg-primary text-surface'
                      : 'border-border-alt bg-surface text-navy'
                  }`}
                >
                  {category.label}
                  <span
                    className={`inline-flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold leading-none ${
                      isActive ? 'bg-surface text-primary' : 'bg-bg-avatar text-primary'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          <p className="text-left text-xs text-navy">
            Showing <span className="font-semibold">{filteredCourses.length} courses</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <CtaBanner />
    </PageLayout>
  )
}
