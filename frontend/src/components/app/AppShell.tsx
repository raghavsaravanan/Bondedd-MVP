import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import AppNav from './AppNav'

export default function AppShell({
  eyebrow,
  title,
  description,
  children,
  action,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(177,128,37,0.16),transparent_28%),linear-gradient(180deg,#F9F4EB_0%,#F5F0E7_28%,#FFFFFF_100%)] px-6 py-8 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[36px] border border-[rgba(177,128,37,0.14)] bg-[rgba(255,252,247,0.88)] p-6 shadow-[0_18px_60px_rgba(92,64,9,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8D7A57]">{eyebrow}</p>
              <h1 className="mt-3 font-display text-5xl leading-[0.95] tracking-[-0.03em] text-[#2D2213] sm:text-6xl">
                {title}
              </h1>
              <p className="mt-4 font-body text-base leading-relaxed text-[#5C5240]">{description}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/auth"
                className="rounded-full border border-[rgba(177,128,37,0.16)] bg-white px-5 py-3 font-body text-sm text-[#403421] transition hover:border-accent hover:text-accent"
              >
                Account
              </Link>
              {action}
            </div>
          </div>

          <AppNav compact className="mt-6" />
        </header>

        <div className="mt-8">{children}</div>
      </div>
    </main>
  )
}
