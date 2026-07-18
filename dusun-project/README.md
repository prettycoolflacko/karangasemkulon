# Dusun Profile Website

See `ARCHITECTURE.md` for full project context, tech stack, schema, and build priority — read that first before writing code (especially if you're an AI coding assistant).

## Quick start

### Backend
```
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python seed_admin.py     # creates the first admin user — edit credentials in the script first
python seed_content.py   # populates real team roster + Rocket Stove timeline migrated from the old site
uvicorn app.main:app --reload
```
API runs at http://localhost:8000 (docs at /docs).

### Frontend
```
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```
Site runs at http://localhost:3000.

### Migrating images from the old site
`frontend/public/images/` already has the right folder structure and filenames the
code expects — see `frontend/public/images/README.md` for the old-filename →
new-filename mapping. Just drop the real `.webp` files in, no code changes needed.
