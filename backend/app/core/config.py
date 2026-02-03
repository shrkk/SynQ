from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    DUCKDB_PATH: str = ":memory:"
    OPENAI_API_KEY: str | None = None

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
