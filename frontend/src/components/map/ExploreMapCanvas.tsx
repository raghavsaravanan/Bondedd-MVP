import { useEffect, useMemo, useRef } from 'react'
import mapboxgl, { GeoJSONSource } from 'mapbox-gl'
import { CampusPlace, ExploreEvent, utdViewport } from '../../lib/mapData'

type Bounds = {
  west: number
  south: number
  east: number
  north: number
}

type FeatureCollection = GeoJSON.FeatureCollection<GeoJSON.Geometry>

const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

function toPlacesGeoJSON(places: CampusPlace[]): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: places.map((place) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [place.longitude, place.latitude],
      },
      properties: {
        placeId: place.id,
        name: place.name,
        shortName: place.shortName,
        placeKind: place.placeKind,
        isLandmark: place.isLandmark,
      },
    })),
  }
}

function toEventsGeoJSON(events: ExploreEvent[], selectedEventId: string | null, hoveredEventId: string | null): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: events.map((event) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [event.longitude, event.latitude],
      },
      properties: {
        eventId: event.id,
        title: event.title,
        category: event.categoryName,
        placeName: event.placeName,
        selected: event.id === selectedEventId,
        hovered: event.id === hoveredEventId,
      },
    })),
  }
}

export default function ExploreMapCanvas({
  places,
  events,
  selectedEventId,
  hoveredEventId,
  onEventSelect,
  onBoundsChange,
}: {
  places: CampusPlace[]
  events: ExploreEvent[]
  selectedEventId: string | null
  hoveredEventId: string | null
  onEventSelect: (eventId: string) => void
  onBoundsChange: (bounds: Bounds) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const hasToken = Boolean(mapboxToken)

  const placesGeoJSON = useMemo(() => toPlacesGeoJSON(places), [places])
  const eventsGeoJSON = useMemo(() => toEventsGeoJSON(events, selectedEventId, hoveredEventId), [events, hoveredEventId, selectedEventId])

  useEffect(() => {
    if (!hasToken || !containerRef.current || mapRef.current) return

    mapboxgl.accessToken = mapboxToken

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      center: utdViewport.center,
      zoom: utdViewport.zoom,
      pitch: 42,
      bearing: -18,
      antialias: true,
    })

    mapRef.current = map

    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right')

    map.on('load', () => {
      map.addSource('campus-places', {
        type: 'geojson',
        data: placesGeoJSON,
      })

      map.addSource('explore-events', {
        type: 'geojson',
        data: eventsGeoJSON,
        cluster: true,
        clusterMaxZoom: 15,
        clusterRadius: 44,
      })

      map.addLayer({
        id: 'campus-places-circles',
        type: 'circle',
        source: 'campus-places',
        paint: {
          'circle-radius': ['case', ['boolean', ['get', 'isLandmark'], false], 8, 5],
          'circle-color': '#B18025',
          'circle-opacity': 0.16,
          'circle-stroke-width': 1,
          'circle-stroke-color': 'rgba(177,128,37,0.45)',
        },
      })

      map.addLayer({
        id: 'campus-places-labels',
        type: 'symbol',
        source: 'campus-places',
        layout: {
          'text-field': ['get', 'shortName'],
          'text-size': 11,
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 1.2],
          'text-anchor': 'top',
        },
        paint: {
          'text-color': '#6A5321',
          'text-halo-color': 'rgba(255,255,255,0.9)',
          'text-halo-width': 1.2,
        },
      })

      map.addLayer({
        id: 'event-clusters',
        type: 'circle',
        source: 'explore-events',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#111111',
          'circle-radius': ['step', ['get', 'point_count'], 18, 8, 22, 20, 28],
          'circle-opacity': 0.92,
        },
      })

      map.addLayer({
        id: 'event-cluster-count',
        type: 'symbol',
        source: 'explore-events',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': ['get', 'point_count_abbreviated'],
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
        paint: {
          'text-color': '#FFFFFF',
        },
      })

      map.addLayer({
        id: 'event-pins',
        type: 'circle',
        source: 'explore-events',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-radius': [
            'case',
            ['boolean', ['get', 'selected'], false],
            12,
            ['boolean', ['get', 'hovered'], false],
            10,
            8,
          ],
          'circle-color': [
            'case',
            ['boolean', ['get', 'selected'], false],
            '#B18025',
            ['boolean', ['get', 'hovered'], false],
            '#D3A74E',
            '#0F1010',
          ],
          'circle-stroke-width': ['case', ['boolean', ['get', 'selected'], false], 3, 2],
          'circle-stroke-color': '#F9F4EB',
          'circle-opacity': 0.96,
        },
      })

      map.addLayer({
        id: 'event-pin-labels',
        type: 'symbol',
        source: 'explore-events',
        filter: ['!', ['has', 'point_count']],
        minzoom: 15.4,
        layout: {
          'text-field': ['get', 'title'],
          'text-size': 11,
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 1.45],
          'text-anchor': 'top',
          'text-max-width': 10,
        },
        paint: {
          'text-color': '#2D2213',
          'text-halo-color': 'rgba(255,255,255,0.94)',
          'text-halo-width': 1.3,
        },
      })

      map.on('click', 'event-clusters', (event) => {
        const feature = map.queryRenderedFeatures(event.point, { layers: ['event-clusters'] })[0]
        if (!feature) return

        const clusterId = feature.properties?.cluster_id
        const source = map.getSource('explore-events') as GeoJSONSource

        source.getClusterExpansionZoom(clusterId, (error, zoom) => {
          if (error) return
          const coordinates = (feature.geometry as GeoJSON.Point).coordinates as [number, number]
          map.easeTo({ center: coordinates, zoom: zoom ?? undefined })
        })
      })

      map.on('click', 'event-pins', (event) => {
        const feature = map.queryRenderedFeatures(event.point, { layers: ['event-pins'] })[0]
        const eventId = feature?.properties?.eventId
        if (eventId) onEventSelect(eventId)
      })

      map.on('mouseenter', 'event-clusters', () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', 'event-clusters', () => {
        map.getCanvas().style.cursor = ''
      })
      map.on('mouseenter', 'event-pins', () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', 'event-pins', () => {
        map.getCanvas().style.cursor = ''
      })

      const pushBounds = () => {
        const bounds = map.getBounds()
        if (!bounds) return

        onBoundsChange({
          west: bounds.getWest(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          north: bounds.getNorth(),
        })
      }

      pushBounds()
      map.on('moveend', pushBounds)
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [hasToken, onBoundsChange, onEventSelect])

  useEffect(() => {
    const map = mapRef.current
    if (!map?.isStyleLoaded()) return

    const source = map.getSource('campus-places') as GeoJSONSource | undefined
    source?.setData(placesGeoJSON)
  }, [placesGeoJSON])

  useEffect(() => {
    const map = mapRef.current
    if (!map?.isStyleLoaded()) return

    const source = map.getSource('explore-events') as GeoJSONSource | undefined
    source?.setData(eventsGeoJSON)
  }, [eventsGeoJSON])

  useEffect(() => {
    const map = mapRef.current
    const selectedEvent = events.find((event) => event.id === selectedEventId)
    if (!map || !selectedEvent) return

    map.easeTo({
      center: [selectedEvent.longitude, selectedEvent.latitude],
      duration: 700,
      offset: [0, 0],
      zoom: Math.max(map.getZoom(), 15.6),
    })
  }, [events, selectedEventId])

  if (!hasToken) {
    return (
      <div className="flex h-full min-h-[560px] items-center justify-center rounded-[34px] border border-[rgba(177,128,37,0.16)] bg-[linear-gradient(180deg,rgba(255,252,247,0.96)_0%,rgba(245,239,230,0.96)_100%)] p-8 text-center">
        <div className="max-w-md">
          <p className="font-body text-xs uppercase tracking-[0.24em] text-[#8D7A57]">Map setup needed</p>
          <h2 className="mt-3 font-display text-3xl leading-none text-[#2D2213]">Add a Mapbox token to render the campus map.</h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-[#5C5240]">
            Set `VITE_MAPBOX_ACCESS_TOKEN` in your frontend environment to enable the full Explore map experience.
          </p>
        </div>
      </div>
    )
  }

  return <div ref={containerRef} className="h-full min-h-[640px] w-full rounded-[34px]" />
}
