import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/home' },
  { label: 'Explore', to: '/explore' },
  { label: 'Saved', to: '/saved' },
  { label: 'Create', to: '/create' },
  { label: 'Profile', to: '/profile' },
]

export default function AppNav({
  compact = false,
  className = '',
}: {
  compact?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <Link to="/home" className="font-body text-[1.9rem] italic leading-none text-accent">
            Bondedd
          </Link>
          <span className="rounded-full border border-[rgba(177,128,37,0.14)] bg-white/70 px-3 py-1 font-body text-[11px] uppercase tracking-[0.18em] text-[#8D7A57]">
            UTD pilot
          </span>
        </div>

        <Link
          to="/auth"
          className={`rounded-full border border-[rgba(177,128,37,0.16)] bg-white px-4 py-2 font-body text-sm text-[#403421] transition hover:border-accent hover:text-accent ${
            compact ? '' : 'self-start lg:self-auto'
          }`}
        >
          Account
        </Link>
      </div>

      <nav className="mt-4 flex flex-wrap gap-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-full px-4 py-2 font-body text-sm transition ${
                isActive
                  ? 'bg-black text-white'
                  : 'border border-[rgba(177,128,37,0.12)] bg-white/85 text-[#403421] hover:border-accent hover:text-accent'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
