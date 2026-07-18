from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/api/timeline", tags=["timeline"])


@router.get("", response_model=List[schemas.TimelineOut])
def list_timeline(type: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(models.TimelineEntry)
    if type:
        q = q.filter(models.TimelineEntry.type == type)
    return q.order_by(models.TimelineEntry.created_at.asc()).all()


@router.post("", response_model=schemas.TimelineOut, dependencies=[Depends(auth.get_current_user)])
def create_timeline_entry(payload: schemas.TimelineCreate, db: Session = Depends(get_db)):
    item = models.TimelineEntry(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{entry_id}", response_model=schemas.TimelineOut, dependencies=[Depends(auth.get_current_user)])
def update_timeline_entry(entry_id: int, payload: schemas.TimelineCreate, db: Session = Depends(get_db)):
    item = db.query(models.TimelineEntry).filter(models.TimelineEntry.id == entry_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Entri timeline tidak ditemukan")
    for field, value in payload.model_dump().items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{entry_id}", dependencies=[Depends(auth.get_current_user)])
def delete_timeline_entry(entry_id: int, db: Session = Depends(get_db)):
    item = db.query(models.TimelineEntry).filter(models.TimelineEntry.id == entry_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Entri timeline tidak ditemukan")
    db.delete(item)
    db.commit()
    return {"ok": True}
