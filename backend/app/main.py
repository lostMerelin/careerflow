from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.auth import router as auth_router
from app.api.v1.jobs import router as jobs_router
from app.api.v1.companies import router as companies_router
from app.api.v1.interviews import router as interviews_router
from app.api.v1.tasks import router as tasks_router
from app.api.v1.notes import router as notes_router

app = FastAPI(title="CareerFlow API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(jobs_router)
app.include_router(companies_router)
app.include_router(interviews_router)
app.include_router(tasks_router)
app.include_router(notes_router)


@app.get("/health")
def health_check():
    return {"status": "ok"}