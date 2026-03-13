import { useEffect, useMemo, useState } from 'react'
import AppNav from '../components/app/AppNav'
import ExploreControls from '../components/explore/ExploreControls'
import EventListPanel from '../components/explore/EventListPanel'
import SelectedEventPanel from '../components/explore/SelectedEventPanel'
import ExploreMapCanvas from '../components/map/ExploreMapCanvas'
import { CampusPlace, ExploreEvent } from '../lib/mapData'
import { getCampusPlaces, getExploreEvents } from '../lib/mapService'

export default function ExplorePage() {
  const [places, setPlaces] = useState<CampusPlace[]>([])
  const [events, setEvents] = useState<ExploreEvent[]>([])
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null)
  const [searchText, setSearchText] = useState('')
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [showList, setShowList] = useState(true)
  const [bounds, setBounds] = useState<{ west: number; south: number; east: number; north: number }>()

  useEffect(() => {
    getCampusPlaces().then(setPlaces)
  }, [])

  useEffect(() => {
    getExploreEvents(bounds, {
      searchText,
      categorySlugs: activeCategories,
    }).then((nextEvents) => {
      setEvents(nextEvents)

      if (!selectedEventId && nextEvents[0]) setSelectedEventId(nextEvents[0].id)
      if (selectedEventId && !nextEvents.some((event) => event.id === selectedEventId)) {
        setSelectedEventId(nextEvents[0]?.id ?? null)
      }
    })
  }, [activeCategories, bounds, searchText, selectedEventId])

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId) ?? null,
    [events, selectedEventId],
  )

  return (
    <main className="relative h-screen overflow-hidden bg-[#F3EDE1]">
      {/* Map as the living canvas */}
      <div className="absolute inset-0">
        <ExploreMapCanvas
          places={places}
          events={events}
          selectedEventId={selectedEventId}
          hoveredEventId={hoveredEventId}
          onEventSelect={setSelectedEventId}
          onBoundsChange={setBounds}
        />
      </div>

      {/* Overlay stack */}
      <div className="pointer-events-none absolute inset-0 p-4 sm:p-6">
        <div className="mx-auto flex h-full max-w-7xl flex-col gap-4">
          <div className="pointer-events-auto rounded-[34px] border border-[rgba(177,128,37,0.14)] bg-[rgba(255,252,247,0.85)] p-4 shadow-[0_18px_60px_rgba(92,64,9,0.16)] backdrop-blur">
            <AppNav compact />
            <div className="mt-3">
              <ExploreControls
                searchText={searchText}
                onSearchChange={setSearchText}
                activeCategories={activeCategories}
                onToggleCategory={(category) =>
                  setActiveCategories((current) =>
                    current.includes(category) ? current.filter((item) => item !== category) : [...current, category],
                  )
                }
                listVisible={showList}
                onToggleList={() => setShowList((prev) => !prev)}
              />
            </div>
          </div>

          <div className="pointer-events-none flex flex-1 flex-col gap-4 lg:flex-row lg:items-end">
            {selectedEvent ? (
              <div className="pointer-events-auto w-full lg:max-w-sm">
                <SelectedEventPanel event={selectedEvent} />
              </div>
            ) : null}

            {showList ? (
              <div className="pointer-events-auto w-full">
                <EventListPanel
                  events={events}
                  selectedEventId={selectedEventId}
                  onSelect={setSelectedEventId}
                  onHover={setHoveredEventId}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  )
}
