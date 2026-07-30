from pydantic_settings import BaseSettings, SettingsConfigDict 


class Settings(BaseSettings): 
    model_config=SettingsConfigDict(env_file=".env", extra="ignore")

    database_url:str 
    secret_key:str="change-me"
    access_token_expire_minutes:int = 1440

settings = Settings()