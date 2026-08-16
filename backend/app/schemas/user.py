import uuid

from pydantic import BaseModel, EmailStr, ConfigDict, computed_field


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    last_name: str
    first_name: str
    patronymic: str | None = None
    phone: str | None = None


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    email: EmailStr
    last_name: str | None = None
    first_name: str | None = None
    patronymic: str | None = None
    phone: str | None = None

    @computed_field
    @property
    def full_name(self) -> str:
        parts = [self.last_name, self.first_name, self.patronymic]
        return " ".join(p for p in parts if p) or self.email


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"