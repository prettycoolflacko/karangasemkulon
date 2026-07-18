from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/api/statistik", tags=["statistik"])


@router.get("", response_model=List[schemas.StatistikOut])
def list_statistik(db: Session = Depends(get_db)):
    return db.query(models.Statistik).all()


@router.post("", response_model=schemas.StatistikOut, dependencies=[Depends(auth.get_current_user)])
def create_statistik(payload: schemas.StatistikCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Statistik).filter(models.Statistik.key == payload.key).first()
    if existing:
        raise HTTPException(status_code=400, detail="Key statistik sudah ada")
    item = models.Statistik(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{stat_id}", response_model=schemas.StatistikOut, dependencies=[Depends(auth.get_current_user)])
def update_statistik(stat_id: int, payload: schemas.StatistikUpdate, db: Session = Depends(get_db)):
    item = db.query(models.Statistik).filter(models.Statistik.id == stat_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Statistik tidak ditemukan")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{stat_id}", dependencies=[Depends(auth.get_current_user)])
def delete_statistik(stat_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Statistik).filter(models.Statistik.id == stat_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Statistik tidak ditemukan")
    db.delete(item)
    db.commit()
    return {"ok": True}
