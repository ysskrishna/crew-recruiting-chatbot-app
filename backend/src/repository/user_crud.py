import uuid
from sqlalchemy.orm import Session
from src.models.models import User
from src.models.schemas import UserInfoSchema

def get_user_by_vendor_uid(db: Session, vendor_uid: str):
    return db.query(User).filter(User.vendor_uid == vendor_uid).first()

def get_user_by_user_id(db: Session, user_id: str):
    return db.query(User).filter(User.user_id == user_id).first()

def create_user(db: Session, user_info: UserInfoSchema):
    _user = User(**user_info.dict())
    _user.user_id = str(uuid.uuid4())
    db.add(_user)
    db.commit()
    db.refresh(_user)
    return _user
    