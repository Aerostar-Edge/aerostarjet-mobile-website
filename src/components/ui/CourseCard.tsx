import { Link } from 'react-router-dom'
import type { Course } from '../../data/content'

type CourseCardProps = {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="course-card">
      <Link
        to={`/courses/${course.id}`}
        className="course-card__stretched-link"
        aria-label={`View ${course.title}`}
      />
      <div className="course-card__media">
        <img alt={course.title} className="course-card__image" src={course.image} />
        <div className="course-card__badges">
          <span className="course-card__badge course-card__badge--category">{course.badge}</span>
          {course.code ? (
            <span className="course-card__badge course-card__badge--code">{course.code}</span>
          ) : null}
        </div>
      </div>

      <div className="course-card__body">
        <div className="course-card__content">
          <div className="course-card__title-row">
            <h3 className="course-card__title">{course.title}</h3>
            <span className="course-card__duration">{course.duration}</span>
          </div>
          <p className="course-card__description">{course.description}</p>
        </div>
        <div className="course-card__cta-wrap">
          <Link to={`/courses/${course.id}`} className="course-card__cta">
            View more
          </Link>
        </div>
      </div>
    </article>
  )
}
