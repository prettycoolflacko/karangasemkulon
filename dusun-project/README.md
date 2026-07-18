# Sistem Web Dusun Karangasem Kulon

Aplikasi manajemen website untuk Dusun Karangasem Kulon. Dibangun menggunakan Next.js (Frontend) dan FastAPI (Backend) dengan integrasi SQLite dan pengelolaan gambar otomatis.

## Mode Deployment (Docker / Home Server)

Aplikasi ini sudah dipersiapkan sepenuhnya untuk dideploy ke *Home Server* menggunakan arsitektur *container* berbasis Docker.

### Persyaratan
- Docker dan Docker Compose telah terinstal di *home server* Anda.

### Cara Deploy
1. Masuk ke terminal/SSH home server Anda.
2. Clone repository ini:
   ```bash
   git clone <URL-REPO-ANDA>
   cd dusun-project
   ```
3. Buka file `docker-compose.yml` dengan editor teks (misal: `nano docker-compose.yml`).
4. Cari bagian `NEXT_PUBLIC_API_URL` pada *service* `frontend`. **Ubah `localhost` menjadi Alamat IP Home Server Anda**.
   *Contoh: `- NEXT_PUBLIC_API_URL=http://192.168.1.10:8000`*
5. Jalankan perintah ajaib ini:
   ```bash
   docker-compose up -d --build
   ```
6. Selesai! Website sudah bisa diakses oleh komputer mana pun di jaringan WiFi/LAN Anda melalui `http://<IP-SERVER>:3000`.

*Catatan: Semua data base (`dusun.db`) dan gambar unggahan akan otomatis tersimpan secara persisten di Docker Volumes, sehingga aman saat server mati atau restart.*

---

## Mode Development Lokal (Non-Docker)
Jika Anda hanya ingin menjalankan di laptop untuk *coding*:

### 1. Menjalankan Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 2. Menjalankan Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
