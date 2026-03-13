import AppShell from '../components/app/AppShell'
import PageTransition from '../components/app/PageTransition'

const profileSections = [
  { title: 'Campus selection', value: 'UT Dallas' },
  { title: 'Interests', value: 'Tech, creative, wellness, career' },
  { title: 'Saved events', value: '12 events saved' },
  { title: 'Organizations followed', value: '4 groups followed' },
  { title: 'Settings', value: 'Notifications, privacy, preferences' },
]

export default function ProfilePage() {
  return (
    <PageTransition>
      <AppShell
        eyebrow="Profile"
        title="Your account and preferences."
        description="This page holds the settings that shape personalization: campus, interests, saved events, followed organizations, and the controls around your account."
      >
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[36px] border border-[rgba(31,24,13,0.08)] bg-white/95 p-8 shadow-[0_18px_60px_rgba(31,24,13,0.06)] backdrop-blur">
            <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8D7A57]">Student profile</p>
            <h2 className="mt-2 font-display text-3xl leading-none text-[#2D2213]">UTD student account</h2>
            <div className="mt-6 flex h-24 w-24 items-center justify-center rounded-full bg-[rgba(177,128,37,0.12)] font-display text-4xl text-accent">
              U
            </div>
            <p className="mt-4 font-display text-[2rem] leading-none text-[#2E2416]">Your profile</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-[#5C5240]">
              This is the home for identity, preferences, and the organizations or event types that make the feed feel personal.
            </p>
          </article>

          <article className="rounded-[36px] border border-[rgba(31,24,13,0.08)] bg-white/95 p-8 shadow-[0_18px_60px_rgba(31,24,13,0.06)] backdrop-blur">
            <div className="space-y-4">
              {profileSections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-[24px] border border-[rgba(177,128,37,0.12)] bg-[#FFFDFC] px-5 py-4 shadow-[0_8px_18px_rgba(92,64,9,0.05)]"
                >
                  <p className="font-body text-xs uppercase tracking-[0.22em] text-[#9C8D73]">{section.title}</p>
                  <p className="mt-2 font-display text-[1.7rem] leading-none text-[#2E2416]">{section.value}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </AppShell>
    </PageTransition>
  )
}
