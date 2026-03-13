export type CampusPlace = {
  id: string
  slug: string
  name: string
  shortName: string
  placeKind: 'building' | 'lawn' | 'plaza' | 'student_center' | 'library' | 'athletics'
  latitude: number
  longitude: number
  addressText: string
  searchText: string
  isLandmark: boolean
  isActive: boolean
}

export type ExploreEvent = {
  id: string
  title: string
  summary: string
  description: string
  startsAt: string
  endsAt: string
  organizationName: string
  organizationSlug: string
  categoryName: string
  categorySlug: string
  placeName: string
  locationName: string
  latitude: number
  longitude: number
  trendingScore: number
  isBookmarked: boolean
  rsvpStatus: 'interested' | 'going' | null
  coverImageUrl?: string
}

export type ExploreFilters = {
  searchText: string
  categorySlugs: string[]
}

export const utdViewport = {
  center: [-96.7505, 32.9858] as [number, number],
  zoom: 15.1,
}

export const utdMapBounds = {
  southwest: [-96.7588, 32.9792] as [number, number],
  northeast: [-96.7422, 32.9918] as [number, number],
}

export const utdCampusPlaces: CampusPlace[] = [
  {
    id: 'place-student-union',
    slug: 'student-union',
    name: 'Student Union',
    shortName: 'SU',
    placeKind: 'student_center',
    latitude: 32.98655,
    longitude: -96.75015,
    addressText: '800 W Campbell Rd, Richardson, TX',
    searchText: 'student union su food court',
    isLandmark: true,
    isActive: true,
  },
  {
    id: 'place-plinth-lawn',
    slug: 'plinth-lawn',
    name: 'Plinth Lawn',
    shortName: 'Plinth',
    placeKind: 'lawn',
    latitude: 32.98695,
    longitude: -96.74935,
    addressText: 'Near the Student Union',
    searchText: 'plinth lawn outdoor central lawn',
    isLandmark: true,
    isActive: true,
  },
  {
    id: 'place-jsom-atrium',
    slug: 'jsom-atrium',
    name: 'JSOM Atrium',
    shortName: 'JSOM',
    placeKind: 'building',
    latitude: 32.9851,
    longitude: -96.74905,
    addressText: 'Naveen Jindal School of Management',
    searchText: 'jsom atrium jindal school management',
    isLandmark: true,
    isActive: true,
  },
  {
    id: 'place-ecs-south',
    slug: 'ecs-south',
    name: 'ECS South',
    shortName: 'ECS',
    placeKind: 'building',
    latitude: 32.9854,
    longitude: -96.75095,
    addressText: 'Engineering and Computer Science South',
    searchText: 'ecs south engineering computer science',
    isLandmark: true,
    isActive: true,
  },
  {
    id: 'place-mcdermott-library',
    slug: 'mcdermott-library',
    name: 'McDermott Library',
    shortName: 'Library',
    placeKind: 'library',
    latitude: 32.98595,
    longitude: -96.7482,
    addressText: 'McDermott Library, UT Dallas',
    searchText: 'mcdermott library study late night',
    isLandmark: true,
    isActive: true,
  },
  {
    id: 'place-activity-center',
    slug: 'activity-center',
    name: 'Activity Center',
    shortName: 'AC',
    placeKind: 'athletics',
    latitude: 32.98295,
    longitude: -96.7497,
    addressText: 'Activity Center, UT Dallas',
    searchText: 'activity center gym rec sports',
    isLandmark: true,
    isActive: true,
  },
]

export const mockExploreEvents: ExploreEvent[] = [
  {
    id: 'evt-night-market',
    title: 'Comet Night Market',
    summary: 'Student makers, food pop-ups, and live music around the lawn.',
    description: 'A campus-wide night market with local vendors, club booths, and performances.',
    startsAt: '2026-03-13T19:00:00-05:00',
    endsAt: '2026-03-13T22:00:00-05:00',
    organizationName: 'Student Union',
    organizationSlug: 'student-union',
    categoryName: 'Social',
    categorySlug: 'social',
    placeName: 'Plinth Lawn',
    locationName: 'Plinth Lawn',
    latitude: 32.98695,
    longitude: -96.74935,
    trendingScore: 94,
    isBookmarked: true,
    rsvpStatus: 'going',
  },
  {
    id: 'evt-founders-mixer',
    title: 'Founders Mixer',
    summary: 'Meet student builders, startup operators, and future cofounders.',
    description: 'A relaxed networking night with student founders and creators across campus.',
    startsAt: '2026-03-14T18:30:00-05:00',
    endsAt: '2026-03-14T20:30:00-05:00',
    organizationName: 'UTD Entrepreneurship Club',
    organizationSlug: 'utd-entrepreneurship-club',
    categoryName: 'Career',
    categorySlug: 'career',
    placeName: 'JSOM Atrium',
    locationName: 'JSOM Atrium',
    latitude: 32.9851,
    longitude: -96.74905,
    trendingScore: 88,
    isBookmarked: false,
    rsvpStatus: 'interested',
  },
  {
    id: 'evt-hack-night',
    title: 'Hack Night',
    summary: 'Ship something small with other builders before the weekend starts.',
    description: 'An open work session for side projects, prototypes, and technical collaborations.',
    startsAt: '2026-03-13T20:00:00-05:00',
    endsAt: '2026-03-13T23:00:00-05:00',
    organizationName: 'Women Who Compute',
    organizationSlug: 'women-who-compute',
    categoryName: 'Tech',
    categorySlug: 'tech',
    placeName: 'ECS South',
    locationName: 'ECS South',
    latitude: 32.9854,
    longitude: -96.75095,
    trendingScore: 84,
    isBookmarked: true,
    rsvpStatus: null,
  },
  {
    id: 'evt-study-social',
    title: 'Late Night Study Social',
    summary: 'Quiet zones, coffee, and a few people who will keep you accountable.',
    description: 'A late-night library session with study tables, snacks, and peer mentors.',
    startsAt: '2026-03-16T20:00:00-05:00',
    endsAt: '2026-03-16T23:30:00-05:00',
    organizationName: 'Honors College',
    organizationSlug: 'honors-college',
    categoryName: 'Academic',
    categorySlug: 'academic',
    placeName: 'McDermott Library',
    locationName: 'McDermott Library',
    latitude: 32.98595,
    longitude: -96.7482,
    trendingScore: 71,
    isBookmarked: false,
    rsvpStatus: null,
  },
  {
    id: 'evt-rec-fest',
    title: 'Rec Fest Warmup',
    summary: 'Pickup games and open courts before the full rec festival weekend.',
    description: 'An informal athletics night at the Activity Center with open sessions and quick signups.',
    startsAt: '2026-03-15T18:00:00-05:00',
    endsAt: '2026-03-15T21:00:00-05:00',
    organizationName: 'Campus Recreation',
    organizationSlug: 'campus-recreation',
    categoryName: 'Sports',
    categorySlug: 'sports',
    placeName: 'Activity Center',
    locationName: 'Activity Center',
    latitude: 32.98295,
    longitude: -96.7497,
    trendingScore: 77,
    isBookmarked: false,
    rsvpStatus: 'interested',
  },
  {
    id: 'evt-open-mic',
    title: 'Open Mic on the Lawn',
    summary: 'Music, spoken word, and a crowd that actually sticks around.',
    description: 'A casual evening performance space for artists, writers, and first-time performers.',
    startsAt: '2026-03-17T19:30:00-05:00',
    endsAt: '2026-03-17T21:30:00-05:00',
    organizationName: 'ATEC Creators',
    organizationSlug: 'atec-creators',
    categoryName: 'Arts',
    categorySlug: 'arts',
    placeName: 'Plinth Lawn',
    locationName: 'Plinth Lawn',
    latitude: 32.9871,
    longitude: -96.7495,
    trendingScore: 83,
    isBookmarked: true,
    rsvpStatus: 'going',
  },
]
