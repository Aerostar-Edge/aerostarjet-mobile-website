import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import { blogPosts } from '../data/content'

export default function BlogsPage() {
  return (
    <PageLayout>
      <section className="space-y-6 px-4 py-10">
        <SectionLabel>Blogs</SectionLabel>
        <h1 className="text-heading-lg font-extrabold text-navy">Aviation career insights</h1>
        <ul className="space-y-6">
          {blogPosts.map((post) => (
            <li key={post.id} className="overflow-hidden rounded-2xl border border-border">
              <div className="h-44 w-full bg-bg-image" />
              <div className="space-y-3 p-5">
                <p className="text-xs font-semibold uppercase text-muted">{post.date}</p>
                <h2 className="text-heading-md font-bold text-navy">{post.title}</h2>
                <p className="text-description leading-6 text-body">{post.excerpt}</p>
                <Link
                  to={`/article/${post.id}`}
                  className="inline-flex min-h-12 items-center text-xs font-bold text-primary"
                >
                  Read article
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  )
}