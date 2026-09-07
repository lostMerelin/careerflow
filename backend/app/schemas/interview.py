import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.interview import InterviewType, InterviewStage, InterviewResult


class InterviewBase(BaseModel):
    company: str
    position: str | None = None
    scheduled_at: datetime
    type: InterviewType = InterviewType.online
    meeting_link: str | None = None
    stage: InterviewStage = InterviewStage.hr
    interviewer: str | None = None
    notes: str | None = None
    result: InterviewResult = InterviewResult.pending


class InterviewCreate(InterviewBase):
    pass


class InterviewUpdate(BaseModel):
    company: str | None = None
    position: str | None = None
    scheduled_at: datetime | None = None
    type: InterviewType | None = None
    meeting_link: str | None = None
    stage: InterviewStage | None = None
    interviewer: str | None = None
    notes: str | None = None
    result: InterviewResult | None = None


class InterviewRead(InterviewBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_at: datetime
    updated_at: datetime