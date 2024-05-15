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

T = TypeVar('T')
class Response(GenericModel, Generic[T]):
    message: str
    result: Optional[T]
