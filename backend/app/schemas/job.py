import uuid
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict

from app.models.job import JobStatus, JobPriority


class JobBase(BaseModel):
    company: str
    position: str
    salary: str | None = None
    location: str | None = None
    remote: bool = False
    link: str | None = None
    applied_date: date | None = None
    status: JobStatus = JobStatus.wishlist
    priority: JobPriority = JobPriority.medium
    tags: list[str] = []
    notes: str | None = None


class JobCreate(JobBase):
    pass


class JobUpdate(BaseModel):
    company: str | None = None
    position: str | None = None
    salary: str | None = None
    location: str | None = None
    remote: bool | None = None
    link: str | None = None
    applied_date: date | None = None
    status: JobStatus | None = None
    priority: JobPriority | None = None
    tags: list[str] | None = None
    notes: str | None = None


class JobRead(JobBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_at: datetime
    updated_at: datetime