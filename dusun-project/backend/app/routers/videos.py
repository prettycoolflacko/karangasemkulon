from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/api/videos", tags=["videos"])


@router.get("", response_model=List[schemas.VideoOut])
def list_videos(db: Session = Depends(get_db)):
    return db.query(models.Video).order_by(models.Video.created_at.desc()).all()


@router.post("", response_model=schemas.VideoOut, dependencies=[Depends(auth.get_current_user)])
def create_video(payload: schemas.VideoCreate, db: Session = Depends(get_db)):
    item = models.Video(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{video_id}", dependencies=[Depends(auth.get_current_user)])
def delete_video(video_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Video).filter(models.Video.id == video_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Video tidak ditemukan")
    db.delete(item)
    db.commit()
    return {"ok": True}
