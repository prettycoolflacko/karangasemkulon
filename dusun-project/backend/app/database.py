import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Gunakan env var DATABASE_URL jika ada (berguna untuk Docker), kalau tidak pakai file lokal
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dusun.db")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
