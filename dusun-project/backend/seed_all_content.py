"""
Script to seed all dynamic content for the new dusun website:
- Tim KKN (from old site)
- Proker Rocket Stove (from old site)
- Perangkat Desa (placeholder, to be edited via admin)

Usage:
    cd backend
    source venv/bin/activate
    python seed_all_content.py
"""
from app.database import SessionLocal, engine
from app import models

# Ensure tables exist
models.Base.metadata.create_all(bind=engine)
db = SessionLocal()

TEAM_MEMBERS = [
    {"name": "Elyuzar Fazlurahman", "role_in_kkn": "Koordinator", "photo_url": "/images/tim/koordinator.webp", "order": 1},
    {"name": "Lilih F. & Sumarah P.", "role_in_kkn": "Sekretaris", "photo_url": "/images/tim/sekretaris.webp", "order": 2},
    {"name": "Raditya Inova", "role_in_kkn": "Bendahara", "photo_url": "/images/tim/bendahara.webp", "order": 3},
    {"name": "M. Iqbal & Dwi Leni", "role_in_kkn": "Manajemen", "photo_url": "/images/tim/divisi-manajemen.webp", "order": 4},
    {"name": "Dan Anjang & Nur A.", "role_in_kkn": "Medinfo", "photo_url": "/images/tim/divisi-medinfo.webp", "order": 5},
    {"name": "RR WS Wardhani & Naila U.", "role_in_kkn": "Humas", "photo_url": "/images/tim/divisi-humas.webp", "order": 6},
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

PERANGKAT_DESA = [
    {"name": "Bapak Kepala Dukuh", "position": "Kepala Dukuh Karangasem Kulon", "photo_url": "", "order": 1},
    {"name": "Bapak RW 01", "position": "Ketua RW 01", "photo_url": "", "order": 2},
    {"name": "Bapak RT 01", "position": "Ketua RT 01", "photo_url": "", "order": 3},
    {"name": "Bapak RT 02", "position": "Ketua RT 02", "photo_url": "", "order": 4},
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
        db.add(models.TimelineEntry(type="besar", **data))
        created_timeline += 1

created_perangkat = 0
for data in PERANGKAT_DESA:
    exists = db.query(models.PerangkatDesa).filter(models.PerangkatDesa.name == data["name"]).first()
    if not exists:
        db.add(models.PerangkatDesa(**data))
        created_perangkat += 1

db.commit()
db.close()

print(f"✅ Seeding Berhasil!")
print(f"Memasukkan {created_team} anggota Tim KKN.")
print(f"Memasukkan {created_timeline} jadwal Proker Rocket Stove.")
print(f"Memasukkan {created_perangkat} perangkat desa.")
