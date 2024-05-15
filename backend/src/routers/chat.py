import random
import string
from fastapi import APIRouter, HTTPException
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

    return Response(message="success", result=chats)

def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(length))

@router.post('')
def create_update_chat(chatinfo: schemas.CreateChatSchema, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    ai_response = generate_random_string(200)
    print(chatinfo)
    if chatinfo.chat_id is None:
        chat = chat_crud.create_chat(db, chatinfo.message, ai_response, user.user_id)
        return Response(message="success", result=schemas.ChatSchema.from_orm(chat))
    else:
        chat = chat_crud.get_chat_by_chat_id(db, chatinfo.chat_id)
        if not chat:
            raise HTTPException(status_code=404, detail="Chat not found")
        
        if chat.user_id != user.user_id:
            raise HTTPException(status_code=400, detail="Chat can only be updated by owner")
        
        update_chat = chat_crud.update_chat(db, chat, chatinfo.message, ai_response)
        return Response(message="success", result=schemas.ChatSchema.from_orm(update_chat))

@router.get("/{chat_id}")
def get_chat(chat_id:str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    chat = chat_crud.get_chat_by_chat_id(db, chat_id)

    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    if not chat.is_public or chat.user_id != user.user_id:
        raise HTTPException(status_code=400, detail="Chat permission denied")
    
    return Response(message="success", result=schemas.ChatSchema.from_orm(chat))

@router.get("/{chat_id}/share")
def share_chat(chat_id:str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    chat = chat_crud.get_chat_by_chat_id(db, chat_id)

    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    if chat.user_id != user.user_id:
        raise HTTPException(status_code=400, detail="Chat can only be shared by owner")

    update_chat = chat_crud.set_chat_public(db, chat)
    return Response(message="success", result=schemas.ChatSchema.from_orm(update_chat))


@router.get("/{chat_id}/fork")
def fork_chat(chat_id:str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    chat = chat_crud.get_chat_by_chat_id(db, chat_id)

    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    if (chat.user_id != user.user_id) and chat.is_public:
        forked_chat = chat_crud.fork_chat(db, chat, user.user_id)
        return Response(message="success", result=schemas.ChatSchema.from_orm(forked_chat))
    else: 
        raise HTTPException(status_code=400, detail="Failed to fork chat")

