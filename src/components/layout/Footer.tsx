import { Link } from 'react-router-dom'
import { assets } from '../../data/assets'

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-surface">
      <div className="mx-auto max-w-[390px] space-y-5 px-4 py-8">
        <div className="space-y-3">
          <img src={assets.logo} alt="Aerostar" className="h-8 brightness-0 invert" />
          <p className="text-description text-white/82">
            Aerostar Aviation Academy is Gujarat&apos;s leading training institute for Aviation,
            Hospitality and Tours & Travel. Approved training partner of NSDC and Skill India.
          </p>
        </div>

        <div className="space-y-2">
          <h5 className="text-body font-medium text-surface">Explore</h5>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0">
            {[
              { label: 'Home', to: '/' },
              { label: 'Courses', to: '/courses' },
              { label: 'Placements', to: '/placements' },
              { label: 'About Us', to: '/about' },
              { label: 'Blogs', to: '/blogs' },
              { label: 'Contacts', to: '/contact' },
              { label: 'Apply', to: '/apply' },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="flex min-h-8 items-center text-label text-white/82"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <p className="text-body-sm text-white/82">©2026 Aerostar Aviation Academy. All rights reserved.</p>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0">
          <a href="#" className="flex min-h-8 items-center text-label text-white/82">
            Privacy Policy
          </a>
          <a href="#" className="flex min-h-8 items-center text-label text-white/82">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}
