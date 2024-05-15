from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from src.core.dbutils import get_db
from src.models import schemas
from src.models.schemas import Response
from src.models.models import User
from src.core.jwtutils import get_current_user
from src.repository import chat_crud

router = APIRouter()


@router.get("/all")
def get_all_chats(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    chats = chat_crud.get_all_chats_by_user_id(db, user.user_id)
    print(chats)
    return Response(message="success", result=chats)