import { assets } from '../../data/assets'
import PreviewLink from './PreviewLink'

const footerColumns = [
  [
    { label: 'Home', to: '/' },
    { label: 'Placements', to: '/placements' },
    { label: 'Blogs', to: '/blogs' },
  ],
  [
    { label: 'Courses', to: '/courses' },
    { label: 'About Us', to: '/about' },
  ],
  [{ label: 'Apply', to: '/apply' }],
] as const

const footerLinks = footerColumns.flat()

export default function Footer() {
  return (
    <footer className="site-footer bg-navy-deep text-surface">
      <div className="shell-footer-inner mx-auto w-full px-4">
        <div className="footer-main">
          <div className="footer-brand">
            <img src={assets.logo} alt="Aerostar" className="h-8 brightness-0 invert" />
            <p className="text-description text-white/82">
              Aerostar Aviation Academy is Gujarat&apos;s leading training institute for Aviation,
              Hospitality and Tours & Travel. Approved training partner of NSDC and Skill India.
            </p>
          </div>

          <div className="footer-explore">
            <h5 className="text-body font-medium text-surface">Explore</h5>
            <nav className="footer-explore-links" aria-label="Footer explore links">
              {footerLinks.map((link) => (
                <PreviewLink key={link.label} to={link.to} className="footer-link">
                  {link.label}
                </PreviewLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="footer-legal px-4">
        <p className="footer-legal-copy text-body-sm text-white/82">
          ©2026 Aerostar Aviation Academy. All rights reserved.
        </p>
        <div className="footer-legal-links">
          <a href="#" className="footer-link">
            Privacy Policy
          </a>
          <a href="#" className="footer-link">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}
