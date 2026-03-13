import AppShell from '../components/app/AppShell'
import PageTransition from '../components/app/PageTransition'

const savedGroups = [
  {
    title: 'Bookmarked events',
    items: ['Comet Night Market', 'Resume Lab', 'Cultural Festival'],
  },
  {
    title: 'Upcoming events',
    items: ['Founders Mixer', 'Hack Night', 'Study Social'],
  },
  {
    title: 'Reminder events',
    items: ['Pre-Med Networking Hour', 'Spring Showcase', 'Open Mic on the Lawn'],
  },
]

export default function SavedPage() {
  return (
    <PageTransition>
      <AppShell
        eyebrow="Saved"
        title="Your planning page."
        description="Keep bookmarked events, near-term plans, and reminders together. This is the early structure for future calendar and weekly planning tools."
      >
        <section className="grid gap-8 lg:grid-cols-3">
          {savedGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-[36px] border border-[rgba(31,24,13,0.08)] bg-white/95 p-8 shadow-[0_18px_60px_rgba(31,24,13,0.06)] backdrop-blur"
            >
              <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8D7A57]">{group.title}</p>
              <div className="mt-6 space-y-4">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-[24px] border border-[rgba(177,128,37,0.12)] bg-[#FFFDFC] px-5 py-4 shadow-[0_8px_18px_rgba(92,64,9,0.05)]"
                  >
                    <p className="font-display text-[1.7rem] leading-none text-[#2E2416]">{item}</p>
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
