from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__),'..')))
load_dotenv()

from src.routers.user import router as user_router
from src.routers.chat import router as chat_router

from src.core.dbutils import engine
from src.models import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix="/user", tags=["user"])
app.include_router(chat_router, prefix="/chat", tags=["chat"])