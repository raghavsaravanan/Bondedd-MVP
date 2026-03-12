import AppShell from '../components/app/AppShell'

const filters = ['Social', 'Career', 'Tech', 'Arts', 'Wellness', 'Free food']
const organizations = [
  'Student Government',
  'Comet Marketing Club',
  'Women Who Compute',
  'Outdoor Adventure',
  'ATEC Creators',
  'Pre-Law Society',
]

export default function ExplorePage() {
  return (
    <AppShell
      eyebrow="Explore"
      title="The discovery engine."
      description="This page is where users intentionally look for things to do: search, filter, browse organizations, and eventually navigate the campus map."
    >
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[36px] border border-[rgba(31,24,13,0.08)] bg-white p-8 shadow-[0_18px_60px_rgba(31,24,13,0.06)]">
          <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8D7A57]">Search and filter</p>
          <h2 className="mt-2 font-display text-3xl leading-none text-[#2D2213]">Find the right event faster</h2>
          <div className="mt-6 rounded-[26px] border border-[rgba(177,128,37,0.12)] bg-[#FFFDFC] p-4">
            <input
              type="text"
              placeholder="Search events, clubs, or topics"
              className="w-full bg-transparent font-body text-sm text-[#403421] outline-none placeholder:text-[#9C8D73]"
            />
          </div>

          <div className="mt-6">
            <p className="font-body text-xs uppercase tracking-[0.22em] text-[#9C8D73]">Categories</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className="rounded-full border border-[rgba(177,128,37,0.12)] bg-[#FFFDFC] px-4 py-2 font-body text-sm text-[#403421] transition hover:border-accent hover:text-accent"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-[rgba(177,128,37,0.12)] bg-[#FFFDFC] p-5">
              <p className="font-body text-xs uppercase tracking-[0.22em] text-[#9C8D73]">Date</p>
              <p className="mt-3 font-display text-2xl leading-none text-[#2E2416]">Today to this weekend</p>
            </div>
            <div className="rounded-[28px] border border-[rgba(177,128,37,0.12)] bg-[#FFFDFC] p-5">
              <p className="font-body text-xs uppercase tracking-[0.22em] text-[#9C8D73]">Campus map</p>
              <p className="mt-3 font-display text-2xl leading-none text-[#2E2416]">Coming later</p>
            </div>
          </div>
        </article>

        <article className="rounded-[36px] border border-[rgba(31,24,13,0.08)] bg-white p-8 shadow-[0_18px_60px_rgba(31,24,13,0.06)]">
          <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8D7A57]">Organizations</p>
          <h2 className="mt-2 font-display text-3xl leading-none text-[#2D2213]">Browse campus groups</h2>
          <div className="mt-6 space-y-4">
            {organizations.map((org) => (
              <div
                key={org}
                className="rounded-[24px] border border-[rgba(177,128,37,0.12)] bg-[#FFFDFC] px-5 py-4"
              >
                <p className="font-display text-[1.7rem] leading-none text-[#2E2416]">{org}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  )
}
