from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from src.core.dbutils import get_db
from src.models import schemas
from src.models.schemas import Response
from src.repository import user_crud

router = APIRouter()


@router.post("/login")
def create_user(user_info: schemas.UserInfoSchema, db: Session = Depends(get_db)):
    user = user_crud.get_user_by_vendor_uid(db, user_info.vendor_uid)
    if not user:
        user = user_crud.create_user(db, user_info)
    

    print(user.user_id)
    return Response(message="success")
