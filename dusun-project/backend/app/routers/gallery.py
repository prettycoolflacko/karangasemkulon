from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/api/gallery", tags=["gallery"])


@router.get("", response_model=List[schemas.GalleryOut])
def list_gallery(category: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(models.Gallery)
    if category:
        q = q.filter(models.Gallery.category == category)
    return q.order_by(models.Gallery.created_at.desc()).all()


@router.post("", response_model=schemas.GalleryOut, dependencies=[Depends(auth.get_current_user)])
def create_gallery_item(payload: schemas.GalleryCreate, db: Session = Depends(get_db)):
    item = models.Gallery(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}", dependencies=[Depends(auth.get_current_user)])
def delete_gallery_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Gallery).filter(models.Gallery.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item galeri tidak ditemukan")
    db.delete(item)
    db.commit()
    return {"ok": True}
