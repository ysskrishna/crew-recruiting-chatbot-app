import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from src.core.config import Config
from src.core.dbutils import get_db
from src.repository import user_crud

SECRET_KEY = Config.JWT_SECRET_KEY
ALGORITHM = Config.JWT_ALGORITHM
EXPIRE_MINUTES = Config.JWT_EXPIRE_MINUTES

def create_access_token(data: dict) -> str:
    expiry = datetime.utcnow() + timedelta(minutes=EXPIRE_MINUTES)
    return jwt.encode({"sub": data, "exp": expiry}, SECRET_KEY, algorithm=ALGORITHM)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
def decode_access_token(token: str = Depends(oauth2_scheme)) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload['sub']
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_current_user(decoded_data: dict = Depends(decode_access_token), db: Session = Depends(get_db)):
    user = user_crud.get_user_by_user_id(db, decoded_data.get("user_id"))
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user