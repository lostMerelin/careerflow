from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware 

from app.api.v1.auth import router as auth_router

app = FastAPI(title="CareerFlowAPI") 

app.add_middleware( 
    CORSMiddleware, 
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
    )

app.include_router(auth_router)

@app.get("/health")
def health_check():
    return {"status":"ok"}