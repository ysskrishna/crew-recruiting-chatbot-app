from typing import List, Optional, Generic, TypeVar
from pydantic import BaseModel
from pydantic.generics import GenericModel

class UserInfoSchema(BaseModel):
    vendor_uid: str
    name: str
    email: str
    photo_url: str

    class Config:
        orm_mode = True

class CreateChatSchema(BaseModel):
    chat_id: Optional[str] = None
    message: str


class ChatSchema(BaseModel):
    chat_id: str
    user_id: str
    title: str
    content: List[dict]
    is_public: bool

    class Config:
        orm_mode = True

T = TypeVar('T')
class Response(GenericModel, Generic[T]):
    message: str
    result: Optional[T]
