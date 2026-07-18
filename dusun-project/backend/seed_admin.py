"""
Run once to create the first admin account:

    python seed_admin.py

Edit the username/password below before running, then delete or
change the password after first login.
"""
from app.database import SessionLocal, engine
from app import models, auth

models.Base.metadata.create_all(bind=engine)

USERNAME = "admin"
PASSWORD = "change-me-now"  # change this before running in production

db = SessionLocal()
existing = db.query(models.User).filter(models.User.username == USERNAME).first()
if existing:
    print(f"User '{USERNAME}' already exists.")
else:
    user = models.User(
        username=USERNAME,
        password_hash=auth.hash_password(PASSWORD),
        role="admin",
    )
    db.add(user)
    db.commit()
    print(f"Created admin user '{USERNAME}'.")
db.close()
