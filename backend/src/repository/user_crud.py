from sqlalchemy.orm import Session
from src.models.models import User
from src.models.schemas import UserInfoSchema

def get_user_by_vendor_uid(db: Session, vendor_uid: str):
    return db.query(User).filter(User.vendor_uid == vendor_uid).first()

def create_user(db: Session, user_info: UserInfoSchema):
    _user = User(**user_info.dict())
    db.add(_user)
    db.commit()
    db.refresh(_user)
    return _user
    