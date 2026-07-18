from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/api/news", tags=["news"])


# ---- Public endpoints ----
@router.get("", response_model=List[schemas.NewsOut])
def list_news(db: Session = Depends(get_db)):
    return db.query(models.News).order_by(models.News.published_at.desc()).all()


@router.get("/{slug}", response_model=schemas.NewsOut)
def get_news(slug: str, db: Session = Depends(get_db)):
    item = db.query(models.News).filter(models.News.slug == slug).first()
    if not item:
        raise HTTPException(status_code=404, detail="Berita tidak ditemukan")
    return item


# ---- Admin endpoints ----
@router.post("", response_model=schemas.NewsOut, dependencies=[Depends(auth.get_current_user)])
def create_news(payload: schemas.NewsCreate, db: Session = Depends(get_db)):
    existing = db.query(models.News).filter(models.News.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Slug sudah dipakai")
    item = models.News(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{news_id}", response_model=schemas.NewsOut, dependencies=[Depends(auth.get_current_user)])
def update_news(news_id: int, payload: schemas.NewsUpdate, db: Session = Depends(get_db)):
    item = db.query(models.News).filter(models.News.id == news_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Berita tidak ditemukan")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{news_id}", dependencies=[Depends(auth.get_current_user)])
def delete_news(news_id: int, db: Session = Depends(get_db)):
    item = db.query(models.News).filter(models.News.id == news_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Berita tidak ditemukan")
    db.delete(item)
    db.commit()
    return {"ok": True}
