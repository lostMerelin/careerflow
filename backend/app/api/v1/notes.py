import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.note import Note
from app.models.user import User
from app.schemas.note import NoteCreate, NoteRead, NoteUpdate

router = APIRouter(prefix="/api/v1/notes", tags=["notes"])

@router.get("", response_model=list[NoteRead])
async def list_notes(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Note)
        .where(Note.user_id == current_user.id)
        .order_by(Note.created_at.desc())
    )
    return result.scalars().all()

@router.post("", response_model=NoteRead, status_code=status.HTTP_201_CREATED)
async def create_note(
    payload: NoteCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    note = Note(**payload.model_dump(), user_id=current_user.id)
    db.add(note)
    await db.commit()
    await db.refresh(note)
    return note

async def get_note_or_404(
        note_id: uuid.UUID, db: AsyncSession, current_user: User
) -> Note:
    result = await db.execute(
        select(Note).where(Note.id == note_id, Note.user_id == current_user.id)
    )
    note = result.scalar_one_or_none()
    if note is None:
        raise HTTPException(status_code=404, detail="Замтека не найдена")
    return note

@router.get("/{note_id}", response_model=NoteRead)
async def get_note(
    note_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await get_note_or_404(note_id, db, current_user)

@router.patch("/{note_id}", response_model=NoteRead)
async def update_note(
    note_id: uuid.UUID,
    payload: NoteUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    note = await get_note_or_404(note_id, db, current_user)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(note, field, value)
    await db.commit()
    await db.refresh(note)
    return note

@router.delete("/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_note(
    note_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    note = await get_note_or_404(note_id, db, current_user)
    await db.delete(note)
    await db.commit()