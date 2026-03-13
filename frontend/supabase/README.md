## Supabase setup

Use the Supabase SQL editor for the initial setup unless you also have the actual database password for:

`postgresql://postgres:[YOUR-PASSWORD]@db.gydjbbcqakaufdoehkqc.supabase.co:5432/postgres`

Steps:

1. Open the SQL editor in the Supabase project `gydjbbcqakaufdoehkqc`.
2. Run `frontend/supabase/schema.sql`.
3. Confirm the seed tables contain UT Dallas, event categories, and interests.
4. Keep email confirmation enabled in Supabase Auth for student signup.

## What the schema covers

- Auth and onboarding:
  - `campuses`, `campus_domains`, `profiles`, `interests`, `profile_interests`
- Explore and organizations:
  - `event_categories`, `organizations`, `organization_memberships`, `organization_follows`, `campus_places`
- Content creation workflow:
  - `event_submissions` for drafts, suggestions, and club submissions
  - `events` for approved or published events
- Saved and planning:
  - `event_bookmarks`, `event_reminders`, `event_rsvps`
- Home ranking:
  - `event_recommendations` for personalized buckets
  - `event_metrics` for bookmark and RSVP-derived trending scores
- Map and geospatial queries:
  - PostGIS-backed `campus_places`
  - geospatial event fields on `event_submissions` and `events`
  - RPCs: `get_campus_places_geojson`, `search_campus_places`, `get_explore_events`, `get_event_detail`

## Product workflow

1. A student signs up with a UT Dallas email.
2. The auth trigger creates or updates `profiles`.
3. A user creates an organization or submits an event suggestion through `event_submissions`.
4. Event locations should resolve in this order:
   - canonical `campus_places` selection
   - manual map pin
   - manual text for later admin review
5. Approved submissions are published into `events` by an admin workflow or server-side job.
6. Explore queries `get_explore_events(...)` for viewport-based map results and `get_campus_places_geojson(...)` for UTD overlays.
7. Create can use `search_campus_places(...)` for place search.
8. Explore event cards can open `/events/:eventId`, backed by `get_event_detail(...)`.
9. Saved queries `event_bookmarks`, `event_reminders`, and upcoming RSVP data.
10. Home can be assembled from:
   - `today`: published events happening today
   - `trending`: published events ordered by `event_metrics.trending_score`
   - `recommended`: rows in `event_recommendations`
   - `upcoming`: next published events ordered by `starts_at`
11. Profile reads `profiles`, `profile_interests`, `organization_follows`, and saved data.

## Important note

This schema sets up the full product data model, but it does not itself moderate submissions or generate
recommendations. Those workflows should run from an admin tool, Edge Functions, or another trusted backend
process using the service role.
