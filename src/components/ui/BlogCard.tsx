import { Link } from 'react-router-dom'
import type { BlogPost } from '../../data/blogs'
import { assets } from '../../data/assets'

const blogPlaceholderImages = [
  assets.aboutImage,
  assets.courseAam,
  assets.courseTtm,
  assets.courseCchm,
  assets.heroStudent,
] as const

type BlogCardProps = {
  post: BlogPost
  index?: number
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const image = blogPlaceholderImages[index % blogPlaceholderImages.length]

  return (
    <Link
      to={`/${post.slug}`}
      className="block overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="blog-card__media w-full overflow-hidden bg-bg-image">
        <img alt="" className="blog-card__image" src={image} aria-hidden />
      </div>
      <div className="space-y-1.5 p-3">
        <p className="text-[10px] font-semibold text-primary">{post.date}</p>
        <h2 className="line-clamp-4 text-xs font-bold leading-snug text-navy">{post.title}</h2>
      </div>
    </Link>
  )
}
