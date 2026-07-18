"""
Run once after seed_admin.py to populate real content migrated from the
old vanilla site (team roster + Rocket Stove program timeline):

    python seed_content.py

Safe to re-run — skips rows that already exist by name/title.
Photo paths assume you've replaced the placeholder files in
frontend/public/images/tim/ with the real .webp files (see
frontend/public/images/README.md for the old->new filename mapping).
"""
from app.database import SessionLocal, engine
from app import models

models.Base.metadata.create_all(bind=engine)
db = SessionLocal()

TEAM_MEMBERS = [
    {"name": "Elyuzar Fazlurahman", "role_in_kkn": "Koordinator", "photo_url": "/images/tim/koordinator.webp", "order": 1},
    {"name": "Lilih F. & Sumarah P.", "role_in_kkn": "Sekretaris", "photo_url": "/images/tim/sekretaris.webp", "order": 2},
    {"name": "Raditya Inova", "role_in_kkn": "Bendahara", "photo_url": "/images/tim/bendahara.webp", "order": 3},
    {"name": "M. Iqbal & Dwi Leni", "role_in_kkn": "Divisi Manajemen", "photo_url": "/images/tim/divisi-manajemen.webp", "order": 4},
    {"name": "Dan Anjang & Nur A.", "role_in_kkn": "Divisi Medinfo", "photo_url": "/images/tim/divisi-medinfo.webp", "order": 5},
    {"name": "RR WS Wardhani & Naila U.", "role_in_kkn": "Divisi Humas", "photo_url": "/images/tim/divisi-humas.webp", "order": 6},
    {"name": "Septi Sri Rahmwati S.Pd., M.Sc", "role_in_kkn": "Dosen Pembimbing", "photo_url": "/images/tim/dpl.webp", "order": 7},
]

TIMELINE_BESAR = [
    {
        "title": "Sosialisasi Rocket Stove",
        "date_or_period": "Minggu 1",
        "description": "Sosialisasi mengenai pemanfaatan limbah kayu dan prinsip dasar kerja Rocket Stove (kompor roket hemat energi) kepada warga.",
    },
    {
        "title": "Workshop & Perakitan",
        "date_or_period": "Minggu 2",
        "description": "Praktik dan pelatihan langsung pembuatan serta perakitan unit Rocket Stove bersama pemuda karang taruna dan warga.",
    },
    {
        "title": "Uji Coba & Distribusi",
        "date_or_period": "Minggu 3",
        "description": "Uji coba efisiensi pembakaran kompor roket dan pendistribusian unit kepada warga serta pelaku UMKM lokal.",
    },
    {
        "title": "Evaluasi & Apresiasi",
        "date_or_period": "Minggu 4",
        "description": "Evaluasi tingkat penghematan bahan bakar kayu pasca penggunaan kompor roket serta pameran hasil karya KKN.",
    },
]

created_team = 0
for data in TEAM_MEMBERS:
    exists = db.query(models.TeamMember).filter(models.TeamMember.name == data["name"]).first()
    if not exists:
        db.add(models.TeamMember(**data))
        created_team += 1

created_timeline = 0
for data in TIMELINE_BESAR:
    exists = db.query(models.TimelineEntry).filter(models.TimelineEntry.title == data["title"]).first()
    if not exists:
        db.add(models.TimelineEntry(type=models.TimelineType.besar, **data))
        created_timeline += 1

db.commit()
db.close()

print(f"Created {created_team} team members, {created_timeline} timeline entries.")
print("Note: 'Perangkat Desa' has no old-site data to migrate — add via admin dashboard.")
