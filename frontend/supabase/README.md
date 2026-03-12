## Supabase setup

Use the Supabase SQL editor for the initial schema unless you also have the actual database password for:

`postgresql://postgres:[YOUR-PASSWORD]@db.gydjbbcqakaufdoehkqc.supabase.co:5432/postgres`

Steps:

1. Open the SQL editor in the Supabase project `gydjbbcqakaufdoehkqc`.
2. Run `frontend/supabase/schema.sql`.
3. Confirm the `campuses` table contains exactly one row for UT Dallas.
4. Confirm the `campus_domains` table contains `utdallas.edu`.

This pilot accepts UT Dallas addresses only. Frontend signup validates `@utdallas.edu` and UT Dallas
subdomains before calling Supabase Auth.
