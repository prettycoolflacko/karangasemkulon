from typing import List, Dict
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/api/settings", tags=["settings"])

# Default settings yang di-seed otomatis jika belum ada
DEFAULT_SETTINGS: Dict[str, str] = {
    "contact_email": "email.kkn@placeholder.com",
    "contact_phone": "+62 812-3456-7890",
    "instagram_url": "https://instagram.com/karangasemkulon",
    "instagram_handle": "@karangasemkulon",
    "tiktok_url": "https://tiktok.com/@kkn.karangasemkulon",
    "tiktok_handle": "@kkn.karangasemkulon",
    "address": "Sekretariat Dusun / Balai Desa, Karangasem Kulon, Kulon Progo, DIY",
}


def ensure_defaults(db: Session):
    """Buat setting default jika belum ada di database."""
    for key, value in DEFAULT_SETTINGS.items():
        existing = db.query(models.Setting).filter(models.Setting.key == key).first()
        if not existing:
            db.add(models.Setting(key=key, value=value))
    db.commit()


@router.get("", response_model=List[schemas.SettingOut])
def get_all_settings(db: Session = Depends(get_db)):
    ensure_defaults(db)
    return db.query(models.Setting).all()


@router.put("/{key}", response_model=schemas.SettingOut, dependencies=[Depends(auth.get_current_user)])
def update_setting(key: str, payload: schemas.SettingUpdate, db: Session = Depends(get_db)):
    ensure_defaults(db)
    item = db.query(models.Setting).filter(models.Setting.key == key).first()
    if not item:
        raise HTTPException(status_code=404, detail="Setting tidak ditemukan")
    item.value = payload.value
    db.commit()
    db.refresh(item)
    return item
