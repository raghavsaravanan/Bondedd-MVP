import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AppShell from '../components/app/AppShell'
import { ExploreEvent } from '../lib/mapData'
import { getEventDetail } from '../lib/mapService'

export default function EventDetailPage() {
  const { eventId = '' } = useParams()
  const [event, setEvent] = useState<ExploreEvent | null>(null)

  useEffect(() => {
    getEventDetail(eventId).then(setEvent)
  }, [eventId])

  if (!event) {
    return (
      <AppShell
        eyebrow="Event detail"
        title="Event not found."
        description="This event could not be loaded from the current map dataset."
      >
        <Link to="/explore" className="rounded-full bg-black px-5 py-3 font-body text-sm text-white transition hover:bg-accent">
          Back to Explore
        </Link>
      </AppShell>
    )
  }

  return (
    <AppShell
      eyebrow={event.categoryName}
      title={event.title}
      description={event.summary}
      action={
        <Link to="/explore" className="rounded-full bg-black px-5 py-3 font-body text-sm text-white transition hover:bg-accent">
          Back to Explore
        </Link>
      }
    >
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[36px] border border-[rgba(31,24,13,0.08)] bg-white p-8 shadow-[0_18px_60px_rgba(31,24,13,0.06)]">
          <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8D7A57]">Event overview</p>
          <h2 className="mt-2 font-display text-3xl leading-none text-[#2D2213]">{event.title}</h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-[#5C5240]">{event.description}</p>
        </article>

        <article className="rounded-[36px] border border-[rgba(31,24,13,0.08)] bg-white p-8 shadow-[0_18px_60px_rgba(31,24,13,0.06)]">
          <div className="space-y-4">
            {[
              ['Organization', event.organizationName],
              ['When', new Date(event.startsAt).toLocaleString()],
              ['Where', event.placeName],
              ['Trending score', String(event.trendingScore)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[24px] border border-[rgba(177,128,37,0.12)] bg-[#FFFDFC] px-5 py-4"
              >
                <p className="font-body text-xs uppercase tracking-[0.22em] text-[#9C8D73]">{label}</p>
                <p className="mt-2 font-display text-[1.7rem] leading-none text-[#2E2416]">{value}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  )
}
