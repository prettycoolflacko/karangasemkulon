import os
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from pydantic import BaseModel
from uuid import uuid4
from PIL import Image
import io
from ..auth import get_current_user

router = APIRouter()

# Resolve path to frontend/public/images
# If running in Docker, we will mount a volume to a specific path and set IMAGE_STORAGE_PATH
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
DEFAULT_LOCAL_PATH = os.path.join(PROJECT_ROOT, "frontend", "public", "images")
FRONTEND_IMAGES_DIR = os.getenv("IMAGE_STORAGE_PATH", DEFAULT_LOCAL_PATH)

ALLOWED_FOLDERS = ["berita", "galeri", "tim", "perangkat", "logo", "lainnya"]

@router.post("/upload")
async def upload_image(
    file: UploadFile = File(...),
    folder: str = Form(...),
    current_user=Depends(get_current_user)
):
    if folder not in ALLOWED_FOLDERS:
        folder = "lainnya"
        
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File yang diunggah harus berupa gambar")

    try:
        # Baca konten file
        contents = await file.read()
        
        # Buka gambar menggunakan Pillow
        image = Image.open(io.BytesIO(contents))
        
        # Konversi ke RGB jika formatnya RGBA (kecuali PNG transparan, WebP mendukung RGBA)
        # WebP mendukung transparansi, jadi kita bisa simpan as is.
        # Jika gambar adalah P atau LA, konversi ke RGBA agar aman.
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA")
            
        # Hasilkan nama file unik dengan ekstensi .webp
        filename = f"{uuid4().hex}.webp"
        
        # Tentukan folder target
        target_folder = os.path.join(FRONTEND_IMAGES_DIR, folder)
        os.makedirs(target_folder, exist_ok=True)
        
        # Path lengkap file tujuan
        file_path = os.path.join(target_folder, filename)
        
        # Simpan sebagai webp
        # quality=80 cukup bagus untuk web dan ukuran kecil
        image.save(file_path, "webp", quality=80)
        
        # Kembalikan path relatif untuk digunakan di frontend
        public_url = f"/images/{folder}/{filename}"
        
        return {"url": public_url}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal memproses gambar: {str(e)}")

class DeleteImageRequest(BaseModel):
    url: str

@router.delete("/upload")
async def delete_image(
    payload: DeleteImageRequest,
    current_user=Depends(get_current_user)
):
    if not payload.url.startswith("/images/"):
        raise HTTPException(status_code=400, detail="URL gambar tidak valid")
        
    # Extract relative path (e.g., /images/berita/123.webp -> berita/123.webp)
    relative_path = payload.url.replace("/images/", "")
    
    # Path lengkap file yang akan dihapus
    file_path = os.path.join(FRONTEND_IMAGES_DIR, relative_path)
    
    # Prevent directory traversal
    if not os.path.abspath(file_path).startswith(os.path.abspath(FRONTEND_IMAGES_DIR)):
        raise HTTPException(status_code=400, detail="Path tidak valid")
        
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
            return {"ok": True, "detail": "Gambar berhasil dihapus"}
        else:
            return {"ok": False, "detail": "Gambar tidak ditemukan"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal menghapus gambar: {str(e)}")
