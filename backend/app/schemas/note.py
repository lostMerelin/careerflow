import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict

class NoteBase(BaseModel):
    title: str | None = "Новая заметка"
    content: str = ""

class NoteCreate(NoteBase):
    pass

class NoteUpdate(BaseModel):
    title: str | None = None
    content: str | None = None

class NoteRead(NoteBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)