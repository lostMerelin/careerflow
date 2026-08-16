import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict

class CompanyBase(BaseModel):
    name: str
    description: str | None = None
    website: str | None = None
    hr_contact_name: str | None = None
    hr_contact_email: str | None = None
    notes: str | None = None


class CompanyCreate(CompanyBase):
    pass

class CompanyUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    website: str | None = None
    hr_contact_name: str | None = None
    hr_contact_email: str | None = None
    notes: str | None = None

class CompanyRead(CompanyBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_at: datetime
    updated_at: datetime