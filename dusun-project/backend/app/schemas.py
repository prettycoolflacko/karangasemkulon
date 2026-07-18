from datetime import datetime
from typing import Optional, Literal
from pydantic import BaseModel, ConfigDict


# ---------- Auth ----------
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    username: str
    password: str


# ---------- News ----------
class NewsBase(BaseModel):
    title: str
    slug: str
    content: str
    cover_image: Optional[str] = None


class NewsCreate(NewsBase):
    pass


class NewsUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None


class NewsOut(NewsBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    published_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


# ---------- Gallery ----------
class GalleryBase(BaseModel):
    image_url: str
    caption: Optional[str] = None
    category: Optional[str] = None


class GalleryCreate(GalleryBase):
    pass


class GalleryOut(GalleryBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: Optional[datetime] = None


# ---------- Video ----------
class VideoBase(BaseModel):
    title: str
    youtube_id: str
    description: Optional[str] = None


class VideoCreate(VideoBase):
    pass


class VideoOut(VideoBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: Optional[datetime] = None


# ---------- Statistik ----------
class StatistikBase(BaseModel):
    key: str
    label: str
    value: str
    unit: Optional[str] = None


class StatistikCreate(StatistikBase):
    pass


class StatistikUpdate(BaseModel):
    label: Optional[str] = None
    value: Optional[str] = None
    unit: Optional[str] = None


class StatistikOut(StatistikBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    updated_at: Optional[datetime] = None


# ---------- Perangkat Desa ----------
class PerangkatBase(BaseModel):
    name: str
    position: str
    photo_url: Optional[str] = None
    order: int = 0


class PerangkatCreate(PerangkatBase):
    pass


class PerangkatOut(PerangkatBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ---------- Team Member (Tim KKN) ----------
class TeamMemberBase(BaseModel):
    name: str
    role_in_kkn: Optional[str] = None
    photo_url: Optional[str] = None
    dedication_message: Optional[str] = None
    order: int = 0


class TeamMemberCreate(TeamMemberBase):
    pass


class TeamMemberOut(TeamMemberBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ---------- Timeline (Proker) ----------
class TimelineBase(BaseModel):
    type: Literal["besar", "individu"]
    title: str
    description: Optional[str] = None
    date_or_period: Optional[str] = None
    related_team_member_id: Optional[int] = None


class TimelineCreate(TimelineBase):
    pass


class TimelineOut(TimelineBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: Optional[datetime] = None


# ---------- Location (optional map feature) ----------
class LocationBase(BaseModel):
    name: str
    category: str
    lat: str
    lng: str
    description: Optional[str] = None
    icon: Optional[str] = None


class LocationCreate(LocationBase):
    pass


class LocationOut(LocationBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
