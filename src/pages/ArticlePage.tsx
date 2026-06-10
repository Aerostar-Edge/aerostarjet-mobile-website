import { useParams } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import BlogArticleBody from '../components/ui/BlogArticleBody'
import CtaBanner from '../components/sections/CtaBanner'
import { getBlogBySlug } from '../data/blogs'

type ArticlePageProps = {
  slug?: string
}

export default function ArticlePage({ slug: slugProp }: ArticlePageProps) {
  const { slug: paramSlug } = useParams()
  const slug = slugProp ?? paramSlug ?? ''
  const post = getBlogBySlug(slug)

  if (!post) {
    return (
      <PageLayout>
        <section className="px-4 py-10">
          <h1 className="text-heading-lg font-bold text-navy">Article not found</h1>
        </section>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <section className="space-y-4 bg-primary-alt px-4 py-8 text-surface">
        <p className="text-label text-accent">{post.date}</p>
        <h1 className="text-[1.75rem] font-bold leading-snug">{post.title}</h1>
      </section>
      <article className="mx-auto w-full max-w-[720px] px-4 py-10">
        <BlogArticleBody blocks={post.blocks} />
      </article>
      <CtaBanner />
    </PageLayout>
  )
}
