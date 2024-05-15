from sqlalchemy.orm import Session
from src.models.models import Chat

def get_all_chats_by_user_id(db: Session, user_id: str):
    return db.query(Chat).filter(Chat.user_id == user_id).all()