from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import engine
from .routers import (
    auth_router,
    news,
    gallery,
    videos,
    statistik,
    perangkat,
    team,
    timeline,
    locations,
    upload,
)

# Creates tables if they don't exist yet. For real migrations, swap in Alembic later.
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Dusun Profile Website API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # add production frontend URL when deployed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(news.router)
app.include_router(gallery.router)
app.include_router(videos.router)
app.include_router(statistik.router)
app.include_router(perangkat.router)
app.include_router(team.router)
app.include_router(timeline.router)
app.include_router(locations.router)  # optional map feature
app.include_router(upload.router, prefix="/api", tags=["Upload"])


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
