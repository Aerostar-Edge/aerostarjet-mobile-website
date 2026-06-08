import { Link } from 'react-router-dom'
import type { Course } from '../../data/content'
import { assets } from '../../data/assets'

type CourseCardProps = {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border-alt bg-surface shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <img alt={course.title} className="size-full object-cover" src={course.image} />
        <span className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-surface">
          {course.badge}
        </span>
        <span className="absolute right-2 top-2 rounded bg-surface/88 px-2 py-0.5 text-[8px] font-medium tracking-wide text-primary">
          {course.code}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 text-xs font-bold leading-tight text-navy-deep">{course.title}</h3>
        <p className="text-description line-clamp-2 text-muted-alt">{course.description}</p>
        <div className="mt-auto space-y-1">
          <span className="flex items-center gap-1 text-[8px] font-medium text-body">
            <img alt="" className="size-3" aria-hidden src={assets.clockIcon} />
            {course.duration}
          </span>
          <Link
            to={`/courses/${course.id}`}
            className="flex min-h-8 w-full items-center justify-center gap-1 rounded-full bg-primary text-[8px] font-semibold text-surface"
          >
            View Course
            <img alt="" className="size-3 invert" aria-hidden src={assets.arrowIcon} />
          </Link>
        </div>
      </div>
    </article>
  )
}
