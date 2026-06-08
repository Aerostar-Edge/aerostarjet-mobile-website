import { Link, useParams } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import CtaBanner from '../components/sections/CtaBanner'
import { getBlogById } from '../data/content'

export default function ArticlePage() {
  const { id = '1' } = useParams()
  const post = getBlogById(id)

  if (!post) {
    return (
      <PageLayout>
        <section className="px-4 py-10">
          <h1 className="text-heading-lg font-bold text-navy">Article not found</h1>
          <Link to="/blogs" className="flex min-h-12 items-center text-xs font-bold text-primary">Back to blogs</Link>
        </section>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <section className="space-y-4 bg-primary-alt px-4 py-8 text-surface">
        <p className="text-label text-accent">{post.date}</p>
        <h1 className="text-[1.75rem] font-bold">{post.title}</h1>
      </section>
      <article className="space-y-4 px-4 py-10">
        <p className="text-description leading-6 text-body">{post.excerpt}</p>
        <p className="text-description leading-6 text-body">
          At Aerostar Aviation Academy, we believe that proper training and guidance are the foundation of a successful career in aviation and hospitality.
        </p>
        <Link to="/apply" className="inline-flex min-h-12 items-center rounded-full bg-primary px-8 text-xs font-bold text-surface">
          Enroll Now
        </Link>
      </article>
      <CtaBanner />
    </PageLayout>
  )
}
