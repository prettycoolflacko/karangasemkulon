# Dusun Profile Website — Architecture Reference

> This document exists to brief AI coding assistants (Copilot, Claude Code, etc.) on what this project is and how it's structured. Read this before generating or editing code.

## 1. Project Summary

A digital profile & information portal for a dusun (hamlet), built as the final deliverable of a university KKN (community service) program. It replaces an older static vanilla HTML/CSS/JS single-page site. The new site has a real backend and admin dashboard so the local youth organization (**Karang Taruna**) can maintain content after the KKN team leaves.

- **Developer:** solo, ~2–4 week build window
- **Audience:** dusun residents (public-facing content) + Karang Taruna admins (content management)
- **Not in scope:** complex role/permission systems, multi-tenant support, anything beyond single-admin-role CRUD

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui |
| Map (optional feature) | React Leaflet |
| Backend | FastAPI |
| ORM | SQLAlchemy |
| Database | SQLite |
| Auth | Simple single-role admin auth (no complex RBAC) |

**Important architectural note:** an early reference site (`Website Profil Desa Sukamakmur`) used a *fully static* Next.js approach — content lived in `src/data/*.ts` files and MDX, edited directly by a developer, no backend at all. **We are NOT following that approach.** This project has a real FastAPI + SQLite backend with an admin dashboard, because content must be editable by non-technical Karang Taruna members without touching code.

## 3. Site Sections

### Static (content rarely changes; can still be admin-editable later, but no CRUD needed at launch)
- **Hero** — dusun name, cover image, tagline
- **About / Tentang Desa** — general description, history
- **Local Potential (Potensi)** — agriculture, UMKM, tourism, local products (e.g. Bawang Merah, Pertanian, Kehutanan)
- **Contact** — dusun address, contact person, embedded map, social links (IG/TikTok)

### Dynamic (full admin CRUD)
- **News / Artikel** — announcements and activity updates
- **Gallery** — photo documentation (events, KKN activities, nature)
- **YouTube Video** — separate section from Gallery; admin adds video entries (title + YouTube ID/URL)
- **Statistik Desa** — village statistics (population, KK count, RT count, area, main occupation, etc.) — admin-editable, not hardcoded
- **Perangkat Desa** — village officials profile (kepala dukuh, staff structure)
- **Tim KKN / Dedication** — KKN group member roster + dedication message, tied to the "Tribuwhana Akasa" team philosophy carried over from the old site
- **Program Kerja (Proker) Timeline** — admin can add timeline entries for:
  - **Proker Besar** (major/flagship work programs, e.g. Rocket Stove)
  - **Individual KKN programs** (per-member initiatives)
- **Interactive Map** *(optional / nice-to-have — build only if time remains after core features)* — markers for RT/RW locations, schools, masjid/mushola, posyandu, balai dusun; category filters; dynamic marker data from backend

## 4. Database Schema (draft)

```
users            (id, username, password_hash, role)
news             (id, title, slug, content, cover_image, published_at, created_at, updated_at)
gallery          (id, image_url, caption, category, created_at)
videos           (id, title, youtube_id, description, created_at)
statistik        (id, key, label, value, unit, updated_at)   -- or a fixed-column table if fields are stable
perangkat_desa   (id, name, position, photo_url, order)
team_members     (id, name, role_in_kkn, photo_url, dedication_message, order)
timeline_entries (id, type ['besar'|'individu'], title, description, date_or_period, related_team_member_id NULL, created_at)
locations        (id, name, category, lat, lng, description, icon)   -- optional feature, build if time allows
settings         (id, key, value)   -- site-wide config (contact info, social links, etc.)
```

Notes:
- `timeline_entries.related_team_member_id` links an "individu" entry to a `team_members` row; NULL for "besar" (major) entries.
- `locations` table only needed if the interactive map is built — treat as deferred/optional.

## 5. Admin Dashboard Scope

Single admin role, CRUD access to:
- News/Artikel
- Gallery
- Videos (YouTube)
- Statistik Desa
- Perangkat Desa
- Team Members (Tim KKN dedication)
- Timeline Entries (Proker Besar + Individu)
- Locations (only if map feature is built)

No public user accounts, no multi-role permissions, no approval workflows.

## 6. Build Priority (given 2–4 week solo timeline)

1. Backend skeleton: all models above + auth
2. Static pages: Hero, About, Local Potential, Contact
3. Core dynamic CRUD: News, Gallery, Videos, Statistik
4. Team/Perangkat Desa + Timeline (Proker Besar & Individu) CRUD
5. **Interactive Map — only if time remains.** This is the most complex remaining feature (frontend Leaflet integration + marker CRUD) and is explicitly de-scoped to optional given everything else added above.

## 7. Content Migration Notes

Real content to carry over from the old vanilla site (not placeholder data):
- Dusun name: Karangasem Kulon
- Program Kerja flagship: Rocket Stove (kompor roket hemat energi) — becomes a "Proker Besar" timeline entry
- Team philosophy: "Logo Tribuwhana Akasa"
- KKN Coordinator: Elyuzar Fazlurahman
- Contact: posko address, Instagram & TikTok links
