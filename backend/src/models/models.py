from sqlalchemy import  Column, String, ForeignKey, DateTime, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy.orm import declarative_mixin
import uuid


from src.core.dbutils import Base

@declarative_mixin
class Timestamp:
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)


class User(Timestamp, Base):
    __tablename__ ="users"

    user_id = Column(String, primary_key=True, index=True, default=str(uuid.uuid4()))
    vendor_uid = Column(String, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    photo_url = Column(String, nullable=False)


class Chat(Timestamp, Base):
    __tablename__ = "chats"

    chat_id = Column(String, primary_key=True, index=True, default=str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.user_id"), nullable=False)
    title =  Column(String, nullable=False)
    is_public = Column(Boolean, default=False, nullable=False)
    content = Column(JSON, nullable=False)