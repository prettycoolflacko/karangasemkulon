"""Optional interactive map feature — wire this up only if time remains."""
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/api/locations", tags=["locations"])


@router.get("", response_model=List[schemas.LocationOut])
def list_locations(category: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(models.Location)
    if category:
        q = q.filter(models.Location.category == category)
    return q.all()


@router.post("", response_model=schemas.LocationOut, dependencies=[Depends(auth.get_current_user)])
def create_location(payload: schemas.LocationCreate, db: Session = Depends(get_db)):
    item = models.Location(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{location_id}", dependencies=[Depends(auth.get_current_user)])
def delete_location(location_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Location).filter(models.Location.id == location_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Lokasi tidak ditemukan")
    db.delete(item)
    db.commit()
    return {"ok": True}
