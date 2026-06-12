import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import PrivacyPolicyBody from '../components/ui/PrivacyPolicyBody'
import { privacyPolicyBlocks, privacyPolicyMeta } from '../data/privacyPolicy'

export default function PrivacyPolicyPage() {
  const contentBlocks = privacyPolicyBlocks.slice(2)

  return (
    <PageLayout>
      <section className="stack-hero bg-primary-alt px-4 py-8 text-surface">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-white/72">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <span>Privacy Policy</span>
        </nav>
        <h1 className="text-[1.75rem] font-bold">{privacyPolicyMeta.title}</h1>
        <p className="text-description text-white/85">{privacyPolicyMeta.subtitle}</p>
      </section>

      <article className="privacy-policy-page mx-auto w-full max-w-[720px] px-4 py-10">
        <PrivacyPolicyBody blocks={contentBlocks} />
      </article>
    </PageLayout>
  )
}