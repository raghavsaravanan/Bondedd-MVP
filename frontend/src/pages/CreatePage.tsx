import { useEffect, useMemo, useState } from 'react'
import AppShell from '../components/app/AppShell'
import LocationPickerMap from '../components/map/LocationPickerMap'
import { CampusPlace } from '../lib/mapData'
import { getCampusPlaces, searchCampusPlaces } from '../lib/mapService'

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
  const [places, setPlaces] = useState<CampusPlace[]>([])
  const [locationMode, setLocationMode] = useState<'place' | 'pin' | 'text'>('place')
  const [locationQuery, setLocationQuery] = useState('')
  const [selectedPlace, setSelectedPlace] = useState<CampusPlace | null>(null)
  const [manualPoint, setManualPoint] = useState<{ latitude: number; longitude: number } | null>(null)
  const [manualText, setManualText] = useState('')

  useEffect(() => {
    getCampusPlaces().then(setPlaces)
  }, [])

  useEffect(() => {
    if (!locationQuery.trim()) {
      getCampusPlaces().then(setPlaces)
      return
    }

    searchCampusPlaces(locationQuery).then(setPlaces)
  }, [locationQuery])

  const resolutionSummary = useMemo(() => {
    if (locationMode === 'place' && selectedPlace) {
      return `Canonical place selected: ${selectedPlace.name}`
    }

    if (locationMode === 'pin' && manualPoint) {
      return `Manual pin at ${manualPoint.latitude.toFixed(4)}, ${manualPoint.longitude.toFixed(4)}`
    }

    if (locationMode === 'text' && manualText.trim()) {
      return `Manual text entered: ${manualText.trim()}`
    }

    return 'No location chosen yet'
  }, [locationMode, manualPoint, manualText, selectedPlace])

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
          <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8D7A57]">Location workflow</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ['place', 'Choose UTD place'],
              ['pin', 'Drop a pin'],
              ['text', 'Describe manually'],
            ].map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => setLocationMode(mode as 'place' | 'pin' | 'text')}
                className={`rounded-full px-4 py-2 font-body text-sm transition ${
                  locationMode === mode
                    ? 'bg-black text-white'
                    : 'border border-[rgba(177,128,37,0.12)] bg-white text-[#403421] hover:border-accent hover:text-accent'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4">
            {['Event title', 'Organization name', 'Date and time', 'Location', 'Description'].map((field) => (
              <div key={field} className="rounded-[22px] border border-[rgba(177,128,37,0.12)] bg-white px-4 py-4">
                <p className="font-body text-sm text-[#9C8D73]">{field}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[28px] border border-[rgba(177,128,37,0.12)] bg-white p-5">
            {locationMode === 'place' ? (
              <>
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(event) => setLocationQuery(event.target.value)}
                  placeholder="Search UTD buildings, lawns, and landmarks"
                  className="w-full rounded-[20px] border border-[#D7D2C8] bg-[#FFFDFC] px-4 py-3 font-body text-sm text-black outline-none placeholder:text-[#9C8D73]"
                />
                <div className="mt-4 grid gap-3">
                  {places.slice(0, 5).map((place) => (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => setSelectedPlace(place)}
                      className={`rounded-[22px] border px-4 py-4 text-left transition ${
                        selectedPlace?.id === place.id
                          ? 'border-[rgba(177,128,37,0.32)] bg-[#FFF8ED]'
                          : 'border-[rgba(177,128,37,0.12)] bg-[#FFFDFC]'
                      }`}
                    >
                      <p className="font-display text-[1.6rem] leading-none text-[#2E2416]">{place.name}</p>
                      <p className="mt-2 font-body text-sm text-[#5C5240]">{place.addressText}</p>
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {locationMode === 'pin' ? (
              <div className="space-y-4">
                <LocationPickerMap places={places} selectedPoint={manualPoint} onSelectPoint={setManualPoint} />
                <p className="font-body text-sm text-[#5C5240]">
                  Click directly on the UTD map to drop a precise event pin.
                </p>
              </div>
            ) : null}

            {locationMode === 'text' ? (
              <textarea
                value={manualText}
                onChange={(event) => setManualText(event.target.value)}
                placeholder="Describe the location if you cannot find it yet"
                className="min-h-[120px] w-full rounded-[20px] border border-[#D7D2C8] bg-[#FFFDFC] px-4 py-3 font-body text-sm text-black outline-none placeholder:text-[#9C8D73]"
              />
            ) : null}
          </div>

          <div className="mt-6 rounded-[22px] border border-[rgba(177,128,37,0.12)] bg-white px-4 py-4">
            <p className="font-body text-xs uppercase tracking-[0.22em] text-[#9C8D73]">Current resolution state</p>
            <p className="mt-2 font-body text-sm text-[#5C5240]">{resolutionSummary}</p>
          </div>

          <button className="mt-6 rounded-full bg-black px-5 py-3 font-body text-sm text-white transition hover:bg-accent">
            Continue draft
          </button>
        </article>
      </section>
    </AppShell>
  )
}
