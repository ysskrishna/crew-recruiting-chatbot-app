from sqlalchemy.orm import Session
from datetime import datetime, timezone, timedelta
from src.models.models import Chat
from src.models.enums import ChatMessageType

def get_all_chats_by_user_id(db: Session, user_id: str):
    return db.query(Chat).filter(Chat.user_id == user_id).order_by(Chat.updated_at.desc()).all()

def get_chat_by_chat_id(db: Session, chat_id: str):
    return db.query(Chat).filter(Chat.chat_id == chat_id).first()

def set_chat_public(db: Session, _chat: Chat):
    _chat.is_public = True

    db.commit()
    db.refresh(_chat)
    return _chat

def fork_chat(db: Session, _chat: Chat, user_id: str):
    forked_chat = Chat(
        user_id=user_id,
        content=_chat.content,
        title=_chat.title
    )
    db.add(forked_chat)
    db.commit()
    db.refresh(forked_chat)
    return forked_chat

def get_user_message(message):
    return {
        "message": message,
        "chat_message_type": ChatMessageType.user.value,
        "created_at": datetime.now(timezone.utc).timestamp()
    }

def get_ai_message(message):
    return {
        "message":message,
        "chat_message_type": ChatMessageType.ai.value,
        "created_at": (datetime.now(timezone.utc)+ timedelta(seconds=5)).timestamp()
    }

def create_chat(db: Session, user_message, ai_response, user_id):
    _chat = Chat(
        user_id=user_id,
        content=[
            get_user_message(user_message), 
            get_ai_message(ai_response)
        ],
        title=user_message
    )
     
    db.add(_chat)
    db.commit()
    db.refresh(_chat)
    return _chat


def update_chat(db: Session, _chat, user_message, ai_response):
    newcontent = _chat.content.copy()
    newcontent.append(get_user_message(user_message))
    newcontent.append(get_ai_message(ai_response))

    _chat.content = newcontent

    db.commit()
    db.refresh(_chat)
    return _chat