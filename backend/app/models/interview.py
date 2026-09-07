import enum
import uuid
from datetime import datetime

from sqlalchemy import String, Text, DateTime, ForeignKey, func
from sqlalchemy import Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class InterviewType(str, enum.Enum):
    online = "online"
    offline = "offline"


class InterviewStage(str, enum.Enum):
    hr = "hr"
    technical = "technical"
    final = "final"


class InterviewResult(str, enum.Enum):
    pending = "pending"
    passed = "passed"
    failed = "failed"


class Interview(Base):
    __tablename__ = "interviews"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True
    )

    company: Mapped[str] = mapped_column(String(255), nullable=False)
    position: Mapped[str | None] = mapped_column(String(255), nullable=True)
    scheduled_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    type: Mapped[InterviewType] = mapped_column(
        SAEnum(InterviewType, name="interview_type"), default=InterviewType.online
    )
    meeting_link: Mapped[str | None] = mapped_column(String(500), nullable=True)
    stage: Mapped[InterviewStage] = mapped_column(
        SAEnum(InterviewStage, name="interview_stage"), default=InterviewStage.hr
    )
    interviewer: Mapped[str | None] = mapped_column(String(255), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    result: Mapped[InterviewResult] = mapped_column(
        SAEnum(InterviewResult, name="interview_result"), default=InterviewResult.pending
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )