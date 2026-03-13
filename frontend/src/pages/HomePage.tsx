import { Link } from 'react-router-dom'
import AppShell from '../components/app/AppShell'
import PageTransition from '../components/app/PageTransition'

const sections = [
  {
    eyebrow: 'Today',
    title: 'Events happening today',
    description: 'Jump into what is live across campus right now, from casual meetups to bigger student org moments.',
    items: [
      ['Comet Night Market', '7:00 PM · Plinth Lawn'],
      ['Women in Tech Social', '6:30 PM · ECS South'],
      ['Open Mic on the Lawn', '8:00 PM · Student Union'],
    ],
  },
  {
    eyebrow: 'Trending',
    title: 'Trending this week',
    description: 'The events getting the most attention from students across UT Dallas.',
    items: [
      ['Founders Mixer', 'Entrepreneurship Club'],
      ['Spring Showcase', 'Atec Student Collective'],
      ['Late Night Rec Fest', 'Campus Recreation'],
    ],
  },
  {
    eyebrow: 'Recommended',
    title: 'Recommended for you',
    description: 'A more personal mix based on the kinds of communities and events you are likely to care about.',
    items: [
      ['Design Portfolio Review', 'Visual Arts Building'],
      ['Pre-Med Networking Hour', 'Sciences Courtyard'],
      ['Hack Night', 'ECSS 2.102'],
    ],
  },
  {
    eyebrow: 'Upcoming',
    title: 'Coming up next',
    description: 'Keep the rest of your week organized before it fills up.',
    items: [
      ['Resume Lab', 'Tomorrow · Career Center'],
      ['Cultural Festival', 'Saturday · Mall Area'],
      ['Study Social', 'Sunday · McDermott Library'],
    ],
  },
]

export default function HomePage() {
  return (
    <PageTransition>
      <AppShell
        eyebrow="Bondedd home"
        title="Your personalized campus dashboard."
        description="This is where students land after signing in: a warm, fast overview of what is happening now, what is trending, and what is worth planning for next."
        action={
          <Link to="/create" className="rounded-full bg-black px-5 py-3 font-body text-sm text-white transition hover:bg-accent">
            Create event
          </Link>
        }
      >
        <section className="grid gap-8">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[36px] border border-[rgba(31,24,13,0.08)] bg-white/95 p-8 shadow-[0_18px_60px_rgba(31,24,13,0.06)] backdrop-blur"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8D7A57]">{section.eyebrow}</p>
                  <h2 className="mt-2 font-display text-3xl leading-none text-[#2D2213]">{section.title}</h2>
                  <p className="mt-4 font-body text-sm leading-relaxed text-[#5C5240]">{section.description}</p>
                </div>
                <button className="font-body text-sm text-accent transition hover:text-black">See more</button>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {section.items.map(([name, meta]) => (
                  <div
                    key={name}
                    className="rounded-[28px] border border-[rgba(177,128,37,0.12)] bg-[#FFFDFC] p-5 shadow-[0_10px_24px_rgba(92,64,9,0.06)] transition hover:-translate-y-[1px]"
                  >
                    <h3 className="font-display text-[1.9rem] leading-none text-[#2E2416]">{name}</h3>
                    <p className="mt-3 font-body text-sm text-[#5C5240]">{meta}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </AppShell>
    </PageTransition>
  )
}
