from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/api/perangkat-desa", tags=["perangkat-desa"])


@router.get("", response_model=List[schemas.PerangkatOut])
def list_perangkat(db: Session = Depends(get_db)):
    return db.query(models.PerangkatDesa).order_by(models.PerangkatDesa.order).all()


@router.post("", response_model=schemas.PerangkatOut, dependencies=[Depends(auth.get_current_user)])
def create_perangkat(payload: schemas.PerangkatCreate, db: Session = Depends(get_db)):
    item = models.PerangkatDesa(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=schemas.PerangkatOut, dependencies=[Depends(auth.get_current_user)])
def update_perangkat(item_id: int, payload: schemas.PerangkatCreate, db: Session = Depends(get_db)):
    item = db.query(models.PerangkatDesa).filter(models.PerangkatDesa.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    for field, value in payload.model_dump().items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}", dependencies=[Depends(auth.get_current_user)])
def delete_perangkat(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.PerangkatDesa).filter(models.PerangkatDesa.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    db.delete(item)
    db.commit()
    return {"ok": True}
