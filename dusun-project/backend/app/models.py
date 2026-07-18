from sqlalchemy import (
    Column, Integer, String, Text, DateTime, ForeignKey, Enum
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), default="admin", nullable=False)


class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(220), unique=True, index=True, nullable=False)
    content = Column(Text, nullable=False)
    cover_image = Column(String(500), nullable=True)
    published_at = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Gallery(Base):
    __tablename__ = "gallery"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String(500), nullable=False)
    caption = Column(String(255), nullable=True)
    category = Column(String(50), nullable=True)  # e.g. kegiatan, kkn, alam
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Video(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    youtube_id = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Statistik(Base):
    __tablename__ = "statistik"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(50), unique=True, index=True, nullable=False)  # e.g. "populasi"
    label = Column(String(100), nullable=False)  # e.g. "Jumlah Penduduk"
    value = Column(String(50), nullable=False)  # stored as string, cast on display
    unit = Column(String(30), nullable=True)  # e.g. "jiwa", "KK", "Ha"
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())


class PerangkatDesa(Base):
    __tablename__ = "perangkat_desa"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    position = Column(String(100), nullable=False)  # e.g. "Kepala Dukuh"
    photo_url = Column(String(500), nullable=True)
    order = Column(Integer, default=0)


class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    role_in_kkn = Column(String(100), nullable=True)  # e.g. "Koordinator"
    photo_url = Column(String(500), nullable=True)
    dedication_message = Column(Text, nullable=True)
    order = Column(Integer, default=0)

    timeline_entries = relationship("TimelineEntry", back_populates="related_team_member")


class TimelineType(str, enum.Enum):
    besar = "besar"
    individu = "individu"


class TimelineEntry(Base):
    __tablename__ = "timeline_entries"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(TimelineType), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    date_or_period = Column(String(100), nullable=True)  # freeform, e.g. "Minggu 1-2" or "2026-07-20"
    related_team_member_id = Column(Integer, ForeignKey("team_members.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    related_team_member = relationship("TeamMember", back_populates="timeline_entries")


class Location(Base):
    """Optional interactive map feature — build only if time allows."""
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    category = Column(String(50), nullable=False)  # rt, rw, sekolah, masjid, posyandu, balai_dusun, lainnya
    lat = Column(String(30), nullable=False)
    lng = Column(String(30), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(50), nullable=True)


class Setting(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(50), unique=True, index=True, nullable=False)
    value = Column(Text, nullable=True)
