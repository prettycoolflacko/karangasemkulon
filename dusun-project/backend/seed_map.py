import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'dusun.db')

def seed_locations():
    if not os.path.exists(DB_PATH):
        print(f"Error: DB not found at {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    locations = [
        ("Warung Bu Dharmi", "UMKM", "-7.8953621", "110.2297803", "Warung makan lokal", None),
        ("Warung Juminem", "UMKM", "-7.8972733", "110.2291014", "Warung kelontong dan makanan ringan", None),
        ("Warung Lotek dan Kupat Tahu Mak Arini", "UMKM", "-7.8879938", "110.2268735", "Spesial lotek dan kupat tahu lezat", None),
        ("Op_Parts", "Toko Sparepart", "-7.892150", "110.225500", "Pusat onderdil dan sparepart", None),
        ("Usus Ayam Crispy dan Basreng Candrani", "UMKM", "-7.894200", "110.227300", "Jajanan krispi khas Karangasem Kulon", None),
        ("Blumbang Kayangan", "Fasilitas Publik", "-7.896100", "110.228400", "Area kolam / fasilitas umum desa", None),
        ("Gudang Lombok Cabe Setan", "Pertanian", "-7.893500", "110.230100", "Pusat pengepulan cabai dan hasil tani", None),
    ]

    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='locations'")
    if not cursor.fetchone():
        print("Tabel locations belum dibuat.")
        return

    # Hapus data UMKM lama agar tidak duplikat (opsional)
    # cursor.execute("DELETE FROM location")

    for loc in locations:
        cursor.execute(
            "INSERT INTO locations (name, category, lat, lng, description, icon) VALUES (?, ?, ?, ?, ?, ?)",
            loc
        )
    
    conn.commit()
    conn.close()
    print("Berhasil memasukkan titik UMKM ke database Peta!")

if __name__ == "__main__":
    seed_locations()
