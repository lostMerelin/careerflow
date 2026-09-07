import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.interview import Interview
from app.models.user import User
from app.schemas.interview import InterviewCreate, InterviewRead, InterviewUpdate

router = APIRouter(prefix="/api/v1/interviews", tags=["interviews"])


@router.get("", response_model=list[InterviewRead])
async def list_interviews(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Interview)
        .where(Interview.user_id == current_user.id)
        .order_by(Interview.scheduled_at)
    )
    return result.scalars().all()


@router.post("", response_model=InterviewRead, status_code=status.HTTP_201_CREATED)
async def create_interview(
    payload: InterviewCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    interview = Interview(**payload.model_dump(), user_id=current_user.id)
    db.add(interview)
    await db.commit()
    await db.refresh(interview)
    return interview


async def get_interview_or_404(
    interview_id: uuid.UUID, db: AsyncSession, current_user: User
) -> Interview:
    result = await db.execute(
        select(Interview).where(
            Interview.id == interview_id, Interview.user_id == current_user.id
        )
    )
    interview = result.scalar_one_or_none()
    if interview is None:
        raise HTTPException(status_code=404, detail="Interview not found")
    return interview


@router.get("/{interview_id}", response_model=InterviewRead)
async def get_interview(
    interview_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await get_interview_or_404(interview_id, db, current_user)


@router.patch("/{interview_id}", response_model=InterviewRead)
async def update_interview(
    interview_id: uuid.UUID,
    payload: InterviewUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    interview = await get_interview_or_404(interview_id, db, current_user)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(interview, field, value)
    await db.commit()
    await db.refresh(interview)
    return interview


@router.delete("/{interview_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_interview(
    interview_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    interview = await get_interview_or_404(interview_id, db, current_user)
    await db.delete(interview)
    await db.commit()