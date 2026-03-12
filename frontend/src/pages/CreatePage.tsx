import AppShell from '../components/app/AppShell'

const submissionTypes = [
  {
    title: 'Submit an event',
    body: 'Add something happening soon so students can discover it before they miss it.',
  },
  {
    title: 'Create a club event',
    body: 'Post official organization events with enough detail to drive attendance.',
  },
  {
    title: 'Suggest something happening',
    body: 'Contribute events even if you are not the primary organizer.',
  },
]

export default function CreatePage() {
  return (
    <AppShell
      eyebrow="Create"
      title="Content supply first."
      description="This page matters early because without event creation, the rest of the product has nothing to distribute. Make publishing feel immediate and obvious."
    >
      <section className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <article className="rounded-[36px] border border-[rgba(31,24,13,0.08)] bg-white p-8 shadow-[0_18px_60px_rgba(31,24,13,0.06)]">
          <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8D7A57]">Submission flow</p>
          <h2 className="mt-2 font-display text-3xl leading-none text-[#2D2213]">Publish something students can actually attend</h2>
          <div className="mt-6 space-y-4">
            {submissionTypes.map((type, index) => (
              <div
                key={type.title}
                className="grid grid-cols-[auto_1fr] gap-4 rounded-[24px] border border-[rgba(177,128,37,0.12)] bg-[#FFFDFC] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(177,128,37,0.12)] font-body text-xs tracking-[0.2em] text-accent">
                  0{index + 1}
                </div>
                <div>
                  <p className="font-display text-[1.8rem] leading-none text-[#2E2416]">{type.title}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-[#5C5240]">{type.body}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[36px] border border-[rgba(31,24,13,0.08)] bg-[linear-gradient(180deg,rgba(255,250,243,0.94)_0%,rgba(248,241,231,0.94)_100%)] p-8 shadow-[0_18px_60px_rgba(31,24,13,0.05)]">
          <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8D7A57]">Draft form</p>
          <div className="mt-6 grid gap-4">
            {['Event title', 'Organization name', 'Date and time', 'Location', 'Description'].map((field) => (
              <div key={field} className="rounded-[22px] border border-[rgba(177,128,37,0.12)] bg-white px-4 py-4">
                <p className="font-body text-sm text-[#9C8D73]">{field}</p>
              </div>
            ))}
          </div>
          <button className="mt-6 rounded-full bg-black px-5 py-3 font-body text-sm text-white transition hover:bg-accent">
            Continue draft
          </button>
        </article>
      </section>
    </AppShell>
  )
}
