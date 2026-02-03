from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# SQLAlchemy Setup
# Check if using sqlite for testing or postgres
connect_args = {}
if "sqlite" in settings.DATABASE_URL:
    connect_args = {"check_same_thread": False}

engine = create_engine(
    settings.DATABASE_URL, connect_args=connect_args
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# DuckDB Setup (for analytics)
import duckdb
duckdb_conn = duckdb.connect(settings.DUCKDB_PATH)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
