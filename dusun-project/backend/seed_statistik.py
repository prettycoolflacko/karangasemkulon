import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), 'dusun.db')

def seed_statistik():
    if not os.path.exists(DB_PATH):
        print(f"Error: DB not found at {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Data dummy yang kaya
    data = [
        # Gender
        ("gender_laki", "Laki-laki", "540", "Jiwa"),
        ("gender_perempuan", "Perempuan", "562", "Jiwa"),
        
        # Kelompok Umur
        ("umur_0_14", "Usia 0-14 Tahun", "210", "Jiwa"),
        ("umur_15_64", "Usia 15-64 Tahun", "780", "Jiwa"),
        ("umur_65_plus", "Usia 65+ Tahun", "112", "Jiwa"),
        
        # Mata Pencaharian
        ("job_petani", "Petani", "450", "Orang"),
        ("job_buruh", "Buruh Tani", "210", "Orang"),
        ("job_pedagang", "Pedagang/UMKM", "120", "Orang"),
        ("job_pns", "PNS / TNI / Polri", "45", "Orang"),
        ("job_swasta", "Karyawan Swasta", "85", "Orang"),
        ("job_lainnya", "Lainnya", "192", "Orang"),
        
        # Pendidikan
        ("edu_sd", "SD / Sederajat", "350", "Orang"),
        ("edu_smp", "SMP / Sederajat", "410", "Orang"),
        ("edu_sma", "SMA / Sederajat", "280", "Orang"),
        ("edu_pt", "Perguruan Tinggi", "62", "Orang"),
    ]

    # Cek apakah tabel statistik ada
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='statistik'")
    if not cursor.fetchone():
        print("Tabel statistik belum dibuat. Jalankan server FastAPI dulu atau pastikan model sudah dimigrasi.")
        return

    # Bersihkan tabel statistik sebelum seed ulang (opsional, tapi baik untuk testing)
    cursor.execute("DELETE FROM statistik")
    
    for item in data:
        cursor.execute(
            "INSERT INTO statistik (key, label, value, unit, updated_at) VALUES (?, ?, ?, ?, ?)",
            (item[0], item[1], item[2], item[3], datetime.utcnow().isoformat())
        )
    
    conn.commit()
    conn.close()
    print("Berhasil memasukkan data dummy statistik kependudukan ke database!")

if __name__ == "__main__":
    seed_statistik()
