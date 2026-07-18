from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/api/team", tags=["team"])


@router.get("", response_model=List[schemas.TeamMemberOut])
def list_team(db: Session = Depends(get_db)):
    return db.query(models.TeamMember).order_by(models.TeamMember.order).all()


@router.post("", response_model=schemas.TeamMemberOut, dependencies=[Depends(auth.get_current_user)])
def create_team_member(payload: schemas.TeamMemberCreate, db: Session = Depends(get_db)):
    item = models.TeamMember(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{member_id}", response_model=schemas.TeamMemberOut, dependencies=[Depends(auth.get_current_user)])
def update_team_member(member_id: int, payload: schemas.TeamMemberCreate, db: Session = Depends(get_db)):
    item = db.query(models.TeamMember).filter(models.TeamMember.id == member_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Anggota tidak ditemukan")
    for field, value in payload.model_dump().items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{member_id}", dependencies=[Depends(auth.get_current_user)])
def delete_team_member(member_id: int, db: Session = Depends(get_db)):
    item = db.query(models.TeamMember).filter(models.TeamMember.id == member_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Anggota tidak ditemukan")
    db.delete(item)
    db.commit()
    return {"ok": True}
