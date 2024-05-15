from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from src.core.dbutils import get_db
from src.models import schemas
from src.models.schemas import Response
from src.repository import user_crud
from src.core.jwtutils import create_access_token

router = APIRouter()


@router.post("/login")
def create_user(user_info: schemas.UserInfoSchema, db: Session = Depends(get_db)):
    user = user_crud.get_user_by_vendor_uid(db, user_info.vendor_uid)
    if not user:
        user = user_crud.create_user(db, user_info)
    
    access_token = create_access_token({"user_id":user.user_id})
    result = {
        "access_token": access_token,
        "user": schemas.UserInfoSchema.from_orm(user)
    }
    return Response(message="success", result=result)